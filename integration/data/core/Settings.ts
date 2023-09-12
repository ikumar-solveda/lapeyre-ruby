/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { extractParamsOfConcern, useNextRouter } from '@/data/Content/_NextRouter';
import { INITIAL_SETTINGS } from '@/data/config/DEFAULTS';
import { SITE_STORE_ID } from '@/data/config/SITE_STORE_ID';
import { STORE_IDENTIFIER } from '@/data/config/STORE_IDENTIFIER';
import { STORE_TOKEN } from '@/data/constants/seo';
import { SettingContext } from '@/data/context/setting';
import { Cache } from '@/data/types/Cache';
import { Token } from '@/data/types/Token';
import { UserContext } from '@/data/types/UserContext';
import { setupPreview } from '@/data/utils/setupPreview';
import { transactionsStore, transactionsToken } from 'integration/generated/transactions';
import {
	StoreStoreIdentifierItem,
	StoreStoreItem,
	TokenToken,
} from 'integration/generated/transactions/data-contracts';
import { GetServerSidePropsContext } from 'next';
import { useContext, useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

// some stepwise refinement
import { dAdd, dDiv, dFix, dMul } from '@/data/utils/floatingPoint';
import { getActiveOrganizationId } from '@/data/utils/getActiveOrganizationId';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { isB2BStore } from '@/data/utils/isB2BStore';
import { shrink } from '@/data/utils/keyUtil';
import { trace } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';
export {
	dAdd,
	dDiv,
	dFix,
	dMul,
	getActiveOrganizationId,
	getContractIdParamFromContext,
	isB2BStore,
	trace,
};

// TODO Settings logic needs to be reviewed and extended.
export type Settings = {
	supportedCurrencies: string[];
	defaultCurrency: string;
	supportedLanguages: string[];
	defaultLanguage: string;
	currencySymbol: string;
	storeId: string;
	inventorySystem: number;
	defaultCatalogId: string;
	storeName: string;
	identifier: string;
	userData: Record<string, string>;
	csrSession: boolean;
	mapApiKey?: string;
	inPreview?: boolean;
	/**
	 * StoreToken resolved from URL.
	 */
	storeToken?: Token;
	context?: UserContext;
	storeType?: string;
	[extra: string]: any; // more specific later on based usage.
};

const currencySymbols: Record<string, string> = {
	USD: '$',
};

const DATA_KEY = 'Settings';

const dataMap = ({
	supportedCurrencies,
	supportedLanguages,
	storeId,
	description,
	identifier,
	...rest
}: StoreStoreItem): Omit<Omit<Settings, 'inventorySystem'>, 'defaultCatalogId'> => ({
	supportedCurrencies: supportedCurrencies?.supportedCurrencies || [],
	defaultCurrency: supportedCurrencies?.defaultCurrency || '',
	supportedLanguages: supportedLanguages?.supportedLanguages || [],
	defaultLanguage: supportedLanguages?.defaultLanguageId || '',
	currencySymbol: currencySymbols[supportedCurrencies?.defaultCurrency || ''] || '$',
	storeId: storeId ?? '',
	storeName: (description?.at(0)?.displayName ?? identifier) as string,
	identifier,
	...rest,
});

const extractStoreItemFirstResult = (data: { resultList?: StoreStoreItem[] }) =>
	data?.resultList?.at(0) || {};

const extractStoreTokenFirstResult = (data: TokenToken): Token | undefined =>
	data?.resultList?.filter((token) => token.tokenName === STORE_TOKEN).at(0);

const extractStoreStoreIdentifierItemFirstResult = (data: {
	resultList?: StoreStoreIdentifierItem[];
}) => data?.resultList?.at(0) || {};

const fetchAdminData = async (pub: boolean, storeIdentifier: string) =>
	extractStoreStoreIdentifierItemFirstResult(
		await transactionsStore(pub).storeFindByStoreNameAndUsage(SITE_STORE_ID, {
			q: 'findByStoreIdentifier',
			storeIdentifier,
		})
	);

const fetchOnlineStoreData = async (pub: boolean, storeId: string) =>
	dataMap(
		extractStoreItemFirstResult(
			await transactionsStore(pub).storeFindByQueryOnlineStore(storeId, {
				q: 'findOnlineStore',
				profileName: 'IBM_Admin_All',
			})
		)
	);

const fetchStoreIdFromToken = async (pub: boolean, storeTokenCandidate: string) =>
	extractStoreTokenFirstResult(
		await transactionsToken(pub).tokenFindByUrlKeywordNames(SITE_STORE_ID, {
			q: 'byUrlKeywordNames',
			urlKeywordName: [storeTokenCandidate],
		})
	);

const fetcher =
	(pub: boolean) =>
	async ({
		storeIdentifier,
		storeId: iStoreId,
		shopAsUser,
		storeTokenCandidate,
	}: {
		storeIdentifier?: string;
		storeId?: string;
		shopAsUser?: string;
		storeTokenCandidate?: string;
	}): Promise<Settings> => {
		try {
			const result = {
				csrSession: !!shopAsUser,
				mapApiKey: process.env.MAP_API_KEY ?? '',
			} as Settings;
			let storeId = iStoreId;

			const storeToken = storeTokenCandidate
				? await fetchStoreIdFromToken(pub, storeTokenCandidate)
				: undefined;
			/**
			 * {
			 *   "tokenName": "StoreToken:CatalogToken",
			 *   "urlKeywordName": "ruby",
			 *   "tokenValue": "41:",
			 *   "urlKeywordId": 62501,
			 *   "status": 1
			 * }
			 */
			const tokenStoreId = storeToken?.tokenValue?.split(':').at(0);
			if (!storeId && !storeIdentifier && tokenStoreId) {
				storeId = tokenStoreId;
			}
			if (storeId) {
				Object.assign(result, await fetchOnlineStoreData(pub, storeId));
				Object.assign(result, await fetchAdminData(pub, result.identifier));
			} else {
				Object.assign(result, await fetchAdminData(pub, storeIdentifier ?? STORE_IDENTIFIER));
				Object.assign(result, await fetchOnlineStoreData(pub, result.storeId));
			}
			if (result.storeId === tokenStoreId) {
				Object.assign(result, { storeToken });
			}
			return result;
		} catch (error) {
			logger.error('Settings: fetcher: error: %o', error);
			return {
				...INITIAL_SETTINGS,
				csrSession: !!shopAsUser,
				error: true,
			};
		}
	};

export const getSettings = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<Settings> => {
	const {
		storeId: _storeId,
		storeIdentifier: _identifier,
		shopAsUser: _shopAsUser,
		path,
	} = context.query ?? {};
	const storeTokenCandidate = [path ?? ''].flat(1).at(0)?.toLowerCase();
	const storeId = Array.isArray(_storeId) ? _storeId.at(-1) : _storeId;
	const shopAsUser = Array.isArray(_shopAsUser) ? _shopAsUser.at(-1) : _shopAsUser;
	const storeIdentifier = Array.isArray(_identifier) ? _identifier.at(-1) : _identifier;
	const props = storeId
		? {
				storeId,
				shopAsUser,
				storeTokenCandidate,
		  }
		: storeIdentifier
		? {
				storeIdentifier,
				shopAsUser,
				storeTokenCandidate,
		  }
		: {
				storeTokenCandidate,
				shopAsUser,
		  };
	const key = unstableSerialize([shrink(props as any), DATA_KEY]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) || fetcher(false)(props);
	cache.set(key, value, cacheScope);
	const settings = await value;
	settings.inPreview = setupPreview(context);
	return settings;
};

export const useSettings = () => {
	const settings = useContext(SettingContext);
	return {
		settings,
	};
};

export const useStaticSettings = () => {
	const router = useNextRouter();
	// static generated error pages does not have query, need to use asPath.
	const {
		queryOfConcern: { storeId, storeIdentifier },
		storeTokenCandidate,
	} = useMemo(() => extractParamsOfConcern(router.asPath), [router]);

	const props = storeId
		? {
				storeId,
				storeTokenCandidate,
		  }
		: storeIdentifier
		? {
				storeIdentifier,
				storeTokenCandidate,
		  }
		: { storeTokenCandidate };
	const { data, error } = useSWR([props, DATA_KEY], async ([props]) => fetcher(true)(props));
	return {
		settings: data,
		loading: !error && !data,
		error,
	};
};
