/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SellerLink } from '@/components/blocks/SellerLink';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { TYPES } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsSeller: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const { seller } = getProductDisplayInfo(sku, product);
	return seller ? (
		<Box>
			<SellerLink sellerInfo={seller} />
		</Box>
	) : null;
};
