/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SellerLink } from '@/components/blocks/SellerLink';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsSeller: FC = () => {
	const {
		selection: { sku },
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { seller } = getProductDisplayInfo(sku, product);
	return seller ? (
		<Box>
			<SellerLink sellerInfo={seller} />
		</Box>
	) : null;
};
