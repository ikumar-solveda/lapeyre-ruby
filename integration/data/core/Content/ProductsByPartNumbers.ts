/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Settings } from '@/data/_Settings';
import { User } from '@/data/_User';
import { DATA_KEY_PRODUCTS_BY_PART_NUMBERS } from '@/data/constants/dataKey';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { ProductQueryResponse, ProductType, ResponseProductType } from '@/data/types/Product';
import { useUser } from '@/data/User';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { isEmpty } from 'lodash';
import { NextRouter } from 'next/router';
import useSWR from 'swr';

const EMPTY_ARRAY = [] as ProductType[];
const dataMap = (data?: ProductQueryResponse) =>
	(extractContentsArray(data) as ResponseProductType[]).map(mapProductData);

export const getProductsByPartNumbersSWRKey = ({
	partNumbers,
	settings,
	router,
	user,
}: {
	partNumbers: string[];
	settings: Settings;
	router: NextRouter;
	user?: User;
}): [ReturnType<typeof shrink>, string] | null => {
	const { storeId, defaultCatalogId: catalogId, langId } = getClientSideCommon(settings, router);
	return storeId
		? [
				shrink({
					storeId,
					partNumber: partNumbers,
					catalogId,
					langId,
					...getCurrencyParamFromContext(user?.context),
					...getContractIdParamFromContext(user?.context),
				}),
				DATA_KEY_PRODUCTS_BY_PART_NUMBERS,
		  ]
		: null;
};

/**
 * The hook returns the products by part numbers.
 * The hook uses the SWR library to fetch the data.
 * The data returned from SWR is transformed using the dataMap function to a list of `ProductType`.
 */
export const useProductsByPartNumbers = (partNumbers: string[]) => {
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const { data, error, isLoading } = useSWR(
		getProductsByPartNumbersSWRKey({ partNumbers, settings, router, user }),
		async ([props]) => {
			const expandedProps = expand<{ partNumber: string[]; [key: string]: any }>(props);
			const { partNumber } = expandedProps;
			return isEmpty(partNumber)
				? EMPTY_ARRAY
				: dataMap(await productFetcher(true)(expand(props), params));
		},
		{ keepPreviousData: true } // keepPreviousData is set to true to prevent the component from re-rendering when the data is fetched
	);

	return {
		data,
		loading: partNumbers && !error && isLoading,
		error,
	};
};
