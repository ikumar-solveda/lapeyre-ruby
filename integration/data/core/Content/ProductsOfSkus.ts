/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { getProduct, getProductByKeyType } from '@/data/Content/Product-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productOfSkuFetcher } from '@/data/Content/_Product';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_PRODUCTS } from '@/data/constants/dataKey';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';
export { getProduct, getProductByKeyType };

const DATA_KEY = DATA_KEY_PRODUCTS;

type Props = {
	partNumber: string[];
	contractId?: string | string[];
};
export const useProductsOfSkus = ({ partNumber, contractId }: Props) => {
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const currentContract = getContractIdParamFromContext(user?.context);
	const contract = contractId ? { contractId } : currentContract;
	const { storeId, defaultCatalogId: catalogId, langId } = getClientSideCommon(settings, router);

	const { data, error, isLoading } = useSWR(
		storeId && !isEmpty(partNumber)
			? [
					shrink({
						storeId,
						partNumber,
						catalogId,
						langId,
						...contract,
						...getCurrencyParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => productOfSkuFetcher(true)(expand(props), params)
	);
	const products = useMemo(() => data?.map(mapProductData), [data]);

	return {
		products,
		loading: partNumber && !error && isLoading,
		error,
	};
};
