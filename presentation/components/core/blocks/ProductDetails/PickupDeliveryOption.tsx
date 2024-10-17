/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductDetailsInventory } from '@/components/blocks/ProductDetails/parts/Inventory';
import { productDetailsPickupDeliveryOptionStack } from '@/components/blocks/ProductDetails/styles/pickupDeliveryOptionStack';
import { StoreInventory } from '@/components/content/StoreInventory';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { FULFILLMENT_METHOD } from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { Stack } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsPickupDeliveryOption: FC = () => {
	const { selection } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;

	return (
		<>
			<Stack {...productDetailsPickupDeliveryOptionStack}>
				{Object.entries(FULFILLMENT_METHOD).map(([key, value]) => (
					<ProductDetailsInventory key={key} name={value} />
				))}
			</Stack>
			<StoreInventory partNumber={selection.sku?.partNumber as string} />
		</>
	);
};
