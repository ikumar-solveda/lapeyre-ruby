/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AVAILABLE_STATUSES } from '@/data/constants/inventory';
import { ShippingMode } from '@/data/types/AllowedShipMode';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

type Props = {
	availability: ProductAvailabilityData;
	pickupInStoreShipMode?: ShippingMode;
	deliveryShipMode?: ShippingMode;
};

export const isFulfillmentAllowed = ({
	availability,
	pickupInStoreShipMode,
	deliveryShipMode,
}: Props) => {
	const isPickup = availability?.physicalStoreId !== undefined;
	return (
		AVAILABLE_STATUSES[`${availability?.inventoryStatus}`] &&
		((isPickup && !!pickupInStoreShipMode) || (!isPickup && !!deliveryShipMode))
	);
};
