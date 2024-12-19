/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { INITIAL_SETTINGS } from '@/data/config/DEFAULTS';
import { SITE_STORE_ID } from '@/data/config/SITE_STORE_ID';
import { STORE_IDENTIFIER } from '@/data/config/STORE_IDENTIFIER';
import { CONFIGURATION_QUERY } from '@/data/constants/configuration';
import { SAS_STORE_REL_TYPE } from '@/data/constants/environment';
import { STORE_TOKEN } from '@/data/constants/seo';
import {
	configurationByQueryFetcher,
	dataMap as configurationDataMap,
} from '@/data/Content/_ConfigurationFetcher';
import { CONFIGURATION_IDS, LanguageConfiguration } from '@/data/types/Configuration';
import { Token } from '@/data/types/Token';
import { UserContext } from '@/data/types/UserContext';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { Configuration } from 'integration/generated/transactions/Configuration';
import type {
	StoreStoreIdentifierItem,
	StoreStoreItem,
	TokenToken,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsStore from 'integration/generated/transactions/transactionsStore';
import transactionsToken from 'integration/generated/transactions/transactionsToken';
import { GetServerSidePropsContext } from 'next';

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
	[CONFIGURATION_IDS.SUPPORTED_LANGUAGES]?: LanguageConfiguration[];
	[CONFIGURATION_IDS.DEFAULT_LANGUAGE]?: LanguageConfiguration[];
	[extra: string]: any; // more specific later on based usage.
};

const currencySymbols: Record<string, string> = {
	USD: '$',
};

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
	currencySymbol: currencySymbols[supportedCurrencies?.defaultCurrency || ''],
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

const fetchAdminData = async (pub: boolean, storeIdentifier: string, params?: RequestParams) =>
	extractStoreStoreIdentifierItemFirstResult(
		await transactionsStore(pub).storeFindByStoreNameAndUsage(
			SITE_STORE_ID,
			{
				q: 'findByStoreIdentifier',
				storeIdentifier,
			},
			params
		)
	);

const fetchOnlineStoreData = async (pub: boolean, storeId: string, params?: RequestParams) =>
	dataMap(
		extractStoreItemFirstResult(
			await transactionsStore(pub).storeFindByQueryOnlineStore(
				storeId,
				{
					q: 'findOnlineStore',
					profileName: 'IBM_Admin_All',
				},
				params
			)
		)
	);

const fetchStoreIdFromToken = async (
	pub: boolean,
	storeTokenCandidate: string,
	params?: RequestParams
) =>
	extractStoreTokenFirstResult(
		await transactionsToken(pub).tokenFindByUrlKeywordNames(
			SITE_STORE_ID,
			{
				q: 'byUrlKeywordNames',
				urlKeywordName: [storeTokenCandidate],
			},
			params
		)
	);
const fetchLanguageConfig = async (storeId: string, context?: GetServerSidePropsContext) => {
	const props = {
		storeId,
		query: {
			q: CONFIGURATION_QUERY.BY_CONFIGURATION_IDS as Parameters<
				Configuration['configurationFindByQuery']
			>['1']['q'],
			configurationId: [CONFIGURATION_IDS.SUPPORTED_LANGUAGES, CONFIGURATION_IDS.DEFAULT_LANGUAGE],
		},
	};
	return configurationDataMap(await configurationByQueryFetcher(false, context)(props));
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
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
			const params = { _requestId: getRequestId(context) } as RequestParams;
			const result = {
				csrSession: !!shopAsUser,
				mapApiKey: process.env.MAP_API_KEY ?? '',
			} as Settings;
			let storeId = iStoreId;

			const storeToken = storeTokenCandidate
				? await fetchStoreIdFromToken(pub, storeTokenCandidate, params)
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
				Object.assign(result, await fetchOnlineStoreData(pub, storeId, params));
				Object.assign(result, await fetchAdminData(pub, result.identifier, params));
			} else {
				Object.assign(
					result,
					await fetchAdminData(pub, storeIdentifier ?? STORE_IDENTIFIER, params)
				);
				Object.assign(result, await fetchOnlineStoreData(pub, result.storeId, params));
			}
			Object.assign(result, await fetchLanguageConfig(result.storeId, context));
			if (result.storeId === tokenStoreId) {
				Object.assign(result, { storeToken });
			}
			result.relatedStores = result.relatedStores?.filter(
				(rel: any) => rel.relationshipType === SAS_STORE_REL_TYPE
			);
			return result;
		} catch (error) {
			errorWithId(getRequestId(context), '_Settings: fetcher: error', { error });
			return {
				error: true,
				...INITIAL_SETTINGS,
				csrSession: !!shopAsUser,
			};
		}
	};
