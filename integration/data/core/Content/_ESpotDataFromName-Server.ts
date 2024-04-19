/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail-Server';
import { getEmailSettings } from '@/data/EmailSettings-Server';
import { getLocalization } from '@/data/Localization-Server';
import { getSettings } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { getPageDataFromId } from '@/data/_PageDataFromId-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME } from '@/data/constants/dataKey';
import { SUBSTITUTION, SUBSTITUTION_MASKED } from '@/data/constants/marketing';
import { AppContextWrapper } from '@/data/types/AppRouter';
import { ID } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { eSpotSubstitutionGenerator } from '@/data/utils/eSpotSubstitutionGenerator';
import { getDMSubstitutions } from '@/data/utils/getDMSubstitutions';
import { getESpotParams } from '@/data/utils/getESpotQueryParams';
import { getRequestId } from '@/data/utils/getRequestId';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsSpot } from 'integration/generated/transactions';
import {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer as ESpotContainer,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * Data fetcher for E Marketing Spot
	 * @param storeId the store Id.
	 * @param name the eSpot name.
	 * @param query the request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched E Marketing Spot data.
	 */
	async (
		storeId: string,
		name: any,
		query: Record<string, string | boolean>,
		params: RequestParams
	) => {
		if (pub) return await transactionsSpot(pub).eSpotFindByName(name, storeId, query, params);
		else {
			try {
				return await transactionsSpot(pub).eSpotFindByName(name, storeId, query, params);
			} catch (e) {
				errorWithId(getRequestId(context), '_ESpotDataFromName: fetcher: error', { error: e });
				return undefined;
			}
		}
	};

export const getESpotDataFromName = async (
	cache: Cache,
	emsName: ID,
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const routes = await getLocalization(cache, context.locale || 'en-US', 'Routes');
	const breadcrumb = await getBreadcrumbTrail({ cache, id: emsName, context });
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const queryBase = {
		catalogId,
		DM_ReturnCatalogGroupId: true,
		DM_FilterResults: false,
		langId,
		DM_Substitution: getDMSubstitutions(emsName, { pageData, settings, langId }),
	};
	const props = {
		storeId,
		...getESpotParams({ pageData, query: context.query, emsName, queryBase, breadcrumb }),
	};

	const key = unstableSerialize([shrink(props), DATA_KEY_E_SPOT_DATA_FROM_NAME]);
	const cacheScope = getServerCacheScope(context, user.context);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value =
		cache.get(key, cacheScope) ||
		fetcher(false, context)(props.storeId, props.emsName, props.query, params);
	const eSpot: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer = await value;
	if (eSpot?.MarketingSpotData.at(0)?.behavior !== '1') {
		// only cache and set fallback non-dynamic eSpot
		cache.set(key, value, cacheScope);
		return (await value) as ESpotContainer | undefined;
	}
	return undefined;
};

export const getESpotDataFromNameForEmails = async (
	emsName: ID,
	substitutionMap: Record<string, string>,
	maskedMap: Record<string, string>,
	cache: Cache,
	context: AppContextWrapper
) => {
	const settings = await getEmailSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId } = getServerSideCommon(settings, context);
	const query = {
		...context.query,
		...eSpotSubstitutionGenerator(substitutionMap, SUBSTITUTION),
		...eSpotSubstitutionGenerator(maskedMap, SUBSTITUTION_MASKED),
	};
	const props = { storeId, emsName, query } as Parameters<typeof shrink>[0];
	const key = unstableSerialize([shrink(props as any), DATA_KEY_E_SPOT_DATA_FROM_NAME]);
	const cacheScope = getServerCacheScope(context, user.context);
	const params = constructRequestParamsWithPreviewToken({ context, settings });
	const value =
		cache.get(key, cacheScope) ||
		fetcher(false, context)(props.storeId as string, props.emsName, props.query as any, params);
	const eSpot: ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer = await value;
	if (eSpot?.MarketingSpotData.at(0)?.behavior !== '1') {
		// only cache and set fallback non-dynamic eSpot
		cache.set(key, value, cacheScope);
	}
	return (await value) as ESpotContainer | undefined;
};
