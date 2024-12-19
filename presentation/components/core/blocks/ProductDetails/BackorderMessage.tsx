/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { productDetailsBackorderTypographySX } from '@/components/blocks/ProductDetails/styles/backorderTypography';
import type { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import type { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const ProductDetailsBackorderMessage: FC = () => {
	const { isBackorderSKUAvailable } = useContext(ContentContext) as ReturnType<
		typeof useSkuListTable | typeof useBundleDetailsTable
	>;

	const localization = useLocalization('productDetail');
	return isBackorderSKUAvailable ? (
		<Stack direction="row">
			<Typography sx={productDetailsBackorderTypographySX}>
				{localization.eligibleBackordered.t()}
			</Typography>
		</Stack>
	) : null;
};
