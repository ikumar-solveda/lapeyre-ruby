/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ChipAd } from '@/components/blocks/ChipAd';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsRibbonChips: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type ?? 'unknown'];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const { ribbons } = sku ?? product ?? {};

	return ribbons?.length ? (
		<Box>
			{ribbons.map((ribbon, i) => (
				<ChipAd key={i} {...ribbon} />
			))}
		</Box>
	) : null;
};
