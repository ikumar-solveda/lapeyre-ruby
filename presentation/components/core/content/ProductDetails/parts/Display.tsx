/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { productDetailsNameSX } from '@/components/content/ProductDetails/styles/name';
import { productDetailsShortDescSX } from '@/components/content/ProductDetails/styles/shortDesc';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { Typography, Stack } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsDisplay: FC = () => {
	const {
		selection: { sku },
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { name, short, partNumber } = getProductDisplayInfo(sku, product);
	const localization = useLocalization('productDetail');

	return (
		<Stack>
			{name ? (
				<Typography variant="h4" sx={productDetailsNameSX}>
					{name}
				</Typography>
			) : null}
			{partNumber ? (
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
