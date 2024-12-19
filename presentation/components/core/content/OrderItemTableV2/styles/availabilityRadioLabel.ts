/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { INVENTORY_PBC_STATUS } from '@/data/constants/inventory';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { SxProps } from '@mui/material/styles';

export const orderItemTableV2AvailabilityRadioLabelSX = (
	inventory?: Partial<ProductAvailabilityData>
): SxProps => ({
	...(inventory?.inventoryStatus === INVENTORY_PBC_STATUS.backorder && {
		alignItems: 'flex-start',
	}),
});
