/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { usePreviewWidget } from '@/components/preview/PreviewWidgetFrame';
import { getBreadcrumbTrail, useBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser } from '@/data/User';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { EMSTYPE_LOCAL, MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { ESpotActivityContainer } from '@/data/types/Marketing';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getESpotBaseData } from '@/data/utils/getESpotBaseData';
import { getESpotParams } from '@/data/utils/getESpotQueryParams';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsSpot } from 'integration/generated/transactions';
import { ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer as ESpotContainer } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useContext, useEffect, useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = 'ESpotDataFromName';

const fetcher =
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
				logError(context?.req, '_ESpotDataFromName: fetcher: error: %o', e);
				return undefined;
			}
		}
	};

export type ESpotContainerType = ESpotContainer;

export const getESpotDataFromName = async (
	cache: Cache,
	emsName: ID,
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const breadcrumb = await getBreadcrumbTrail({ cache, id: emsName, context });
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const queryBase = { catalogId, DM_ReturnCatalogGroupId: true, DM_FilterResults: false, langId };
	const props = {
		storeId,
		...getESpotParams({
			pageData,
			query: context.query,
			emsName,
			queryBase,
			breadcrumb,
		}),
	};
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const cacheScope = getServerCacheScope(context, user.context);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value =
		cache.get(key, cacheScope) ||
		fetcher(false, context)(props.storeId, props.emsName, props.query, params);
	cache.set(key, value, cacheScope);
	return (await value) as ESpotContainer | undefined;
};

export const useESpotDataFromName = (emsName: ID, trackEvents = true) => {
	const { onPromotionView } = useContext(EventsContext);
	const router = useNextRouter();
	const { settings } = useSettings();
	const { breadcrumb } = useBreadcrumbTrail();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const { setESpotData } = usePreviewWidget();
	const { query } = router;
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const queryBase = useMemo(
		() => ({ catalogId, DM_ReturnCatalogGroupId: true, DM_FilterResults: false, langId }),
		[catalogId, langId]
	);
	const { data, error } = useSWR(
		storeId
			? [
					shrink({
						storeId,
						...getESpotParams({ pageData, query, emsName, queryBase, breadcrumb }),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			return fetcher(true)(expanded.storeId, expanded.emsName, expanded.query, params);
		},
		{ use: [laggyMiddleWare] }
	);

	useEffect(() => {
		setESpotData && setESpotData(data?.MarketingSpotData);
	}, [data, setESpotData]);

	useEffect(() => {
		if (trackEvents) {
			const all = getESpotBaseData(data);
			all?.forEach((spot) => {
				if (MARKETING_SPOT_DATA_TYPE.CONTENT === spot?.baseMarketingSpotDataType) {
					const activity = spot as Required<ESpotActivityContainer>;
					onPromotionView({ gtm: { activity, settings } });
				}
			});
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		data,
		loading: !error && !data,
		error,
	};
};

/**
 * @deprecated to be removed
 */
export const getEMarketingSpotName = (properties: any, tokenExternalValue?: ID) => {
	if (properties?.emsName) {
		return properties?.emsType === EMSTYPE_LOCAL && tokenExternalValue
			? tokenExternalValue + properties?.emsName
			: properties?.emsName;
	} else {
		return tokenExternalValue;
	}
};
