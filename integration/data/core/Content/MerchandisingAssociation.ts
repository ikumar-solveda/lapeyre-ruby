/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getProduct, useProduct } from '@/data/Content/Product';
import { ID } from '@/data/types/Basic';
import { ProductType, ResponseProductType } from '@/data/types/Product';
import { mapProductData } from '@/data/utils/mapProductData';
import { ContentProps } from '@/data/types/ContentProps';
import { useMemo } from 'react';

const dataMap = (product?: ResponseProductType): ProductType[] =>
	(product?.merchandisingAssociations ?? []).map(mapProductData);

export const getMerchandisingAssociation = async ({
	cache,
	id: partNumber,
	context,
}: ContentProps) => getProduct(cache, partNumber.toString(), context);

export const useMerchandisingAssociation = (partNumber: ID) => {
	const { product, loading, error } = useProduct({ id: partNumber.toString() });
	const merchAssocs = useMemo(() => dataMap(product), [product]);
	return { merchAssocs, loading, error };
};
