/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { productDetailsNameSX } from '@/components/blocks/ProductDetails/styles/name';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsDisplay: FC = () => {
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type ?? 'unknown'];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const { name, short, partNumber } = getProductDisplayInfo(sku, product);
	const localization = useLocalization('productDetail');
	return (
		<Stack>
			{name ? (
				<Typography variant="h4" sx={productDetailsNameSX}>
					{name}
				</Typography>
			) : null}
			{!isKitOrBundle && partNumber ? (
				<Typography variant="overline">{localization.skuLabel.t({ value: partNumber })}</Typography>
			) : null}
			{short ? <Typography variant="body1">{short}</Typography> : null}
		</Stack>
	);
};
