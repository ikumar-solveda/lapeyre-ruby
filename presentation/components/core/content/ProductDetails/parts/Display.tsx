/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { productDetailsNameSX } from '@/components/content/ProductDetails/styles/name';
import { productDetailsShortDescSX } from '@/components/content/ProductDetails/styles/shortDesc';
import { TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { Typography, Stack } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsDisplay: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const { name, short, partNumber } = getProductDisplayInfo(sku, product);
	const localization = useLocalization('productDetail');
	return (
		<Stack>
			{name ? (
				<Typography variant="h4" sx={productDetailsNameSX}>
					{name}
				</Typography>
			) : null}
			{!isBundle && partNumber ? (
				<Typography variant="overline">{localization.skuLabel.t({ value: partNumber })}</Typography>
			) : null}
			{short ? (
				<Typography sx={productDetailsShortDescSX} variant="body1">
					{short}
				</Typography>
			) : null}
		</Stack>
	);
};
