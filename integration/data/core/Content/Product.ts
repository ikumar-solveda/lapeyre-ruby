/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { fetcher, getProduct, getProductByKeyType } from '@/data/Content/Product-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PRODUCT_DATA_KEY } from '@/data/Content/_Product';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { currencyFallbackMiddleWare } from '@/data/utils/swr/currencyFallbackMiddleWare';
import useSWR from 'swr';
export { getProduct, getProductByKeyType };

const DATA_KEY = PRODUCT_DATA_KEY;

// Maybe need to revisit and use id instead for consistency of cache and fallback
type Props = {
	id?: string;
	isCEId?: boolean;
	condition?: boolean;
	contractId?: string | string[];
};
export const useProduct = ({ id = '', isCEId = false, condition = true, contractId }: Props) => {
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const currentContract = getContractIdParamFromContext(user?.context);
	const contract = contractId ? { contractId } : currentContract;
	const {
		storeId,
		defaultCatalogId: catalogId,
		langId,
		defaultCurrency,
	} = getClientSideCommon(settings, router);
	const idObj = { [isCEId ? 'id' : 'partNumber']: [id] };
	const { data, error, isLoading, isValidating } = useSWR(
		storeId && id && condition
			? [
					shrink({
						storeId,
						...idObj,
						catalogId,
						langId,
						...contract,
						...getCurrencyParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [currencyFallbackMiddleWare({ defaultCurrency })] }
	);
	return {
		rawData: data,
		product: data?.product ?? undefined,
		loading: id && !error && isLoading && condition,
		isValidating, // This is used to determine whether to show the spinner when the product is being fetched
		error,
	};
};
