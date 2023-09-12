/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SellerLink } from '@/components/blocks/SellerLink';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsSeller: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type ?? 'unknown'];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const { seller } = getProductDisplayInfo(sku, product);
	return seller ? (
		<Box>
			<SellerLink sellerInfo={seller} />
		</Box>
	) : null;
};
