/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductCard } from '@/components/blocks/ProductCard';
import { useProduct } from '@/data/Content/Product';
import { FC } from 'react';

export const Product: FC<{ partNumber: string; clickAction?: () => void }> = ({
	partNumber,
	clickAction,
}) => {
	const { product, loading } = useProduct({ id: partNumber });
	return loading || !product ? null : (
		<ProductCard product={product} clickAction={clickAction}></ProductCard>
	);
};
