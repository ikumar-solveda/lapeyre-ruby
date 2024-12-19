/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { Cache } from '@/data/types/Cache';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getRequestId } from '@/data/utils/getRequestId';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { errorWithId } from '@/data/utils/loggerUtil';
import type { ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsAssociatedPromotion from 'integration/generated/transactions/transactionsAssociatedPromotion';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useMemo, useState } from 'react';
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
			ceId?: string;
			qCode?: string;
			langId: string;
		},
		params: RequestParams
	) => {
		const { storeId, ceId, qCode, langId } = props;
		const query: any = qCode
			? { q: 'byName', qCalculationUsageId: '-1', qIncludePromotionCode: 'true', qCode, langId }
			: { q: 'byProduct', qProductId: ceId, langId };
		try {
			return await transactionsAssociatedPromotion(
				pub
			).associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName(
				storeId,
				query,
				params
			);
		} catch (error) {
			if (pub) {
				errorWithId(getRequestId(context), '_Promos: fetcher: error', { error });
				throw error;
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
	const qCode = context.query?.code as string;
	const { storeId, langId } = getServerSideCommon(settings, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const props: any = { storeId, ceId, qCode, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const cacheScope = getServerCacheScope(context, user.context);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value =
		cache.get(key, cacheScope) ||
		fetcher(false, context)(
			{
				storeId,
				ceId,
				qCode,
				langId,
			},
			params
		);
	cache.set(key, value, cacheScope);
	return await value;
};

export const usePromo = (ceId = '') => {
	const [value, setValue] = useState<StateCache>({} as StateCache);
	const { catentryId, promos } = value;
	const router = useNextRouter();
	const { settings } = useSettings();
	const qCode = router.query?.code as string;
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const query = {
		storeId,
		ceId,
		qCode,
		langId,
	};
	const { data, error } = useSWR(
		settings?.storeId && (qCode || (ceId && ceId !== catentryId))
			? [shrink(query), DATA_KEY]
			: null,
		async ([query]) => fetcher(true)(expand(query), params)
	);

	const isInvalidAssociatedPromotions = useMemo(
		() => data?.associatedPromotions === null,
		[data?.associatedPromotions]
	);
	const longDescription = useMemo(
		() => data?.associatedPromotions?.at(0)?.description?.longDescription ?? '',
		[data]
	);
	const shortDescription = useMemo(
		() => data?.associatedPromotions?.at(0)?.description?.shortDescription ?? '',
		[data]
	);
	const hasNoDescription = useMemo(
		() =>
			data?.associatedPromotions?.at(0)?.description === null ||
			(!shortDescription && !longDescription),
		[data?.associatedPromotions, longDescription, shortDescription]
	);
	useEffect(() => {
		setValue((value) =>
			value.catentryId === ceId ? value : { catentryId: ceId, promos: dataMap(data) }
		);
	}, [ceId, data]);

	return {
		promos,
		isInvalidAssociatedPromotions,
		shortDescription,
		longDescription,
		hasNoDescription,
		loading: !error && !data,
		error,
	};
};
