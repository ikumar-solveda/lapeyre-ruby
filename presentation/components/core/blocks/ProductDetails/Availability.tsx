/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Availability } from '@/components/blocks/Availability';
import { productDetailsAvailabilityStackSX } from '@/components/blocks/ProductDetails/styles/availabilityStack';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_AVAILABILITY: ProductAvailabilityData[] = [];

/**
 * @deprecated in favour of `<PickupDeliveryOption>`
 */
export const ProductDetailsAvailability: FC = () => {
	const localization = useLocalization('CommerceEnvironment');
	const prodLoc = useLocalization('productDetail');
	const { availability = EMPTY_AVAILABILITY, isInventoryLoading = false } = useContext(
		ContentContext
	) as ReturnType<typeof useProductDetails>;

	return (
		<Stack gap={0.5}>
			<Typography variant="body2">{prodLoc.Availability.t()}</Typography>
			<Stack spacing={0.5} sx={productDetailsAvailabilityStackSX}>
				{isInventoryLoading ? (
					<CircularProgress size={30} />
				) : availability.length === 0 ? (
					<Typography data-testid="not-available" id="not-available">
						{localization.inventoryStatus.NA.t()}
					</Typography>
				) : (
					availability.map((inventory, key) => <Availability key={key} availability={inventory} />)
				)}
			</Stack>
		</Stack>
	);
};
