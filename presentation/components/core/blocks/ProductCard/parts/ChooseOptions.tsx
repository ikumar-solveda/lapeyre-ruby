/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { productCardActionButtonProps } from '@/components/blocks/ProductCard/styles/actionButtonProps';
import { productCardInventoryStack } from '@/components/blocks/ProductCard/styles/inventoryStack';
import { productCardInventorySvgIconProps } from '@/components/blocks/ProductCard/styles/inventorySvgIconProps';
import { productCardInventoryTitleSX } from '@/components/blocks/ProductCard/styles/inventoryTitle';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductCardContextValue } from '@/data/types/ProductCard';
import { MenuOpen } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductCardChooseOptions: FC = () => {
	const nls = useLocalization('Inventory');
	const { routeUrl } = useContext(ContentContext) as ProductCardContextValue;

	return (
		<Stack {...productCardInventoryStack}>
			<Linkable {...productCardActionButtonProps} type="button" href={routeUrl}>
				{nls.ChooseOptions.t()}
			</Linkable>

			<Stack direction="row">
				<MenuOpen {...productCardInventorySvgIconProps} />
				<Typography sx={productCardInventoryTitleSX}>{nls.ChooseOptionsText.t()}</Typography>
			</Stack>
		</Stack>
	);
};
