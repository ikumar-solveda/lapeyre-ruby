/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ChipAd } from '@/components/blocks/ChipAd';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { Box } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsRibbonChips: FC = () => {
	const {
		selection: { sku },
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { ribbons } = sku ?? product ?? {};

	return ribbons?.length ? (
		<Box>
			{ribbons.map((ribbon, i) => (
				<ChipAd key={i} {...ribbon} />
			))}
		</Box>
	) : null;
};
