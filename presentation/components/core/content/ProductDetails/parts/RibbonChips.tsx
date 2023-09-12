/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ChipAd } from '@/components/blocks/ChipAd';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { TYPES } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { productIsA } from '@/utils/productIsA';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsRibbonChips: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const { ribbons } = sku ?? product ?? {};

	return ribbons?.length ? (
		<Box>
			{ribbons.map((ribbon, i) => (
				<ChipAd key={i} {...ribbon} />
			))}
		</Box>
	) : null;
};
