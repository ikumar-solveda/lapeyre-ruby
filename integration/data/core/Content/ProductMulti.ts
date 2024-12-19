/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher as fetcher } from '@/data/Content/_Product';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_PRODUCT_MULTI } from '@/data/constants/dataKey';
import { ProductType, ResponseProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { currencyFallbackMiddleWare } from '@/data/utils/swr/currencyFallbackMiddleWare';
import { laggyMiddleWare } from '@/data/utils/swr/laggyMiddleWare';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';

const EMPTY_ARRAY = [] as ProductType[];

export const useProductMulti = (products: string[]) => {
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const {
		storeId,
		langId,
		defaultCatalogId: catalogId,
		defaultCurrency,
	} = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data, error, isLoading } = useSWR(
		storeId && products.length
			? [
					shrink({
						storeId,
						partNumber: products,
						catalogId,
						langId,
						...getCurrencyParamFromContext(user?.context),
						...getContractIdParamFromContext(user?.context),
					}),
					DATA_KEY_PRODUCT_MULTI,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [laggyMiddleWare, currencyFallbackMiddleWare({ defaultCurrency })] }
	);
	const detail = useMemo(
		() =>
			isEmpty(products)
				? EMPTY_ARRAY
				: (extractContentsArray(data) as ResponseProductType[]).map(mapProductData),
		[data, products]
	);

	return {
		data: detail,
		error,
		params,
		isLoading,
	};
};
