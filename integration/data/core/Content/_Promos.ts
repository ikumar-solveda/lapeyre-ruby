/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { Cache } from '@/data/types/Cache';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsAssociatedPromotion } from 'integration/generated/transactions';
import { ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = 'ProductPromos';
type StateCache = {
	catentryId: string;
	promos: string[];
};

const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		props: {
			storeId: string;
			ceId: string;
		},
		params: RequestParams
	) => {
		const { storeId, ceId } = props;
		const query: any = { q: 'byProduct', qProductId: ceId };
		try {
			return await transactionsAssociatedPromotion(
				pub
			).associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName(
				storeId,
				query,
				params
			);
		} catch (e) {
			if (pub) {
				logError(context?.req, '_Promos: fetcher: error: %o', e);
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

const dataMap = (
	data?: ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary
) =>
	data?.associatedPromotions
		?.filter((p) => p.description?.shortDescription)
		.map((p) => p.description?.shortDescription as string) ?? [];

export const getPromo = async (cache: Cache, ceId: string, context: GetServerSidePropsContext) => {
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const user = await getUser(cache, context);
	const routes = await getLocalization(cache, context.locale || 'en-US', 'Routes');
	const props = { storeId, ceId, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const cacheScope = getServerCacheScope(context, user.context);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value = cache.get(key, cacheScope) || fetcher(false, context)({ storeId, ceId }, params);
	cache.set(key, value, cacheScope);
	return await value;
};

export const usePromo = (ceId = '') => {
	const [value, setValue] = useState<StateCache>({} as StateCache);
	const { catentryId, promos } = value;
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		ceId && ceId !== catentryId && settings?.storeId
			? [shrink({ storeId, ceId, langId }), DATA_KEY]
			: null,
		async ([query]) => fetcher(true)(expand(query), params)
	);

	useEffect(() => {
		setValue((value) =>
			value.catentryId === ceId ? value : { catentryId: ceId, promos: dataMap(data) }
		);
	}, [ceId, data]);

	return {
		promos,
		loading: !error && !data,
		error,
	};
};
