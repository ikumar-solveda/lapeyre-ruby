/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { transactionsSpot } from 'integration/generated/transactions';
import { getSettings, useSettings } from '@/data/Settings';
import { ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer as ESpotContainer } from 'integration/generated/transactions/data-contracts';
import { ID } from '@/data/types/Basic';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { GetServerSidePropsContext } from 'next';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Cache } from '@/data/types/Cache';
import { EMSTYPE_LOCAL } from '@/data/constants/marketing';
import { getESpotParams } from '@/data/utils/getESpotQueryParams';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { usePreviewWidget } from '@/components/preview/PreviewWidgetFrame';
import { useEffect, useMemo } from 'react';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const DATA_KEY = 'ESpotDataFromName';

const fetcher =
	(pub: boolean) =>
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
				console.log(e);
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
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const queryBase = { catalogId, DM_ReturnCatalogGroupId: true, DM_FilterResults: false, langId };
	const props = {
		storeId,
		...getESpotParams({ pageData, query: context.query, emsName, queryBase }),
	};
	const key = unstableSerialize([props, DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)(props.storeId, props.emsName, props.query, params);
	cache.set(key, value);
	return (await value) as ESpotContainer | undefined;
};

export const useESpotDataFromName = (emsName: ID) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const { setESpotData } = usePreviewWidget();
	const { query } = useNextRouter();
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const queryBase = useMemo(
		() => ({ catalogId, DM_ReturnCatalogGroupId: true, DM_FilterResults: false, langId }),
		[catalogId, langId]
	);
	const { data, error } = useSWR(
		storeId
			? [{ storeId, ...getESpotParams({ pageData, query, emsName, queryBase }) }, DATA_KEY]
			: null,
		async ([props]) => fetcher(true)(props.storeId, props.emsName, props.query, params),
		{ keepPreviousData: true }
	);
	useEffect(() => {
		setESpotData && setESpotData(data?.MarketingSpotData);
	}, [data, setESpotData]);

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
