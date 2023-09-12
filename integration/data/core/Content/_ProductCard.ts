/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ProductAttributeValue, ProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

const DATA_KEY = 'FullProductLookup';

const findSkuBySwatch = (
	root: ProductType | undefined,
	swatch: ProductAttributeValue | undefined
) => {
	const found =
		swatch && root
			? root.items?.find(({ attributes }) =>
					attributes.find(({ values }) => values.find(({ id }) => id === swatch.id))
			  )
			: undefined;
	return found;
};

export const useProductCard = (product: ProductType) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const {
		langId,
		storeId,
		defaultCurrency: currency,
		defaultCatalogId: catalogId,
	} = getClientSideCommon(settings, router);
	const { user } = useUser();
	const requestParams = useExtraRequestParameters();
	const [swatch, setSwatch] = useState<ProductAttributeValue>();
	const [root, setRoot] = useState<ProductType>();
	const { data } = useSWR(
		!root?.items && swatch && storeId && product.partNumber
			? [
					shrink({
						storeId,
						currency,
						catalogId,
						langId,
						...getContractIdParamFromContext(user?.context),
						partNumber: product.partNumber,
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => productFetcher(true)(expand(props), requestParams)
	);
	const sku = useMemo(() => findSkuBySwatch(root, swatch), [root, swatch]);

	const onSwatch = useCallback(
		async (event: MouseEvent<HTMLElement>, _swatch: ProductAttributeValue) => {
			event.stopPropagation();
			setSwatch(_swatch);
		},
		[]
	);

	useEffect(() => {
		// we will cache the parent product once it's fetched so ignore any null-ish responses
		if (data) {
			const parent = extractContentsArray(data)[0];
			setRoot(parent);
		}
	}, [data]);

	return { onSwatch, sku };
};
