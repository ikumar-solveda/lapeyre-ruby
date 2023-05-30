/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getSettings, useSettings } from '@/data/Settings';
import { Cache } from '@/data/types/Cache';
import { transactionsAssociatedPromotion } from 'integration/generated/transactions';
import { ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const DATA_KEY = 'ProductPromos';
type StateCache = {
	catentryId: string;
	promos: string[];
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const fetcher =
	(pub: boolean) =>
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
				console.log(e);
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
	const props = { storeId, ceId, langId };
	const key = unstableSerialize([props, DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)({ storeId, ceId }, params);
	cache.set(key, value);
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
		ceId && ceId !== catentryId && settings?.storeId ? [{ storeId, ceId, langId }, DATA_KEY] : null,
		async ([query]) => fetcher(true)(query, params)
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
