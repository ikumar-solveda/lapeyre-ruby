/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { productCardInventoryTextSX } from '@/components/blocks/ProductCard/styles/inventoryText';
import { AVAILABLE_STATUS_ONLY, INVENTORY_PBC_STATUS } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useLocalization } from '@/data/Localization';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { Typography } from '@mui/material';
import type { FC } from 'react';

type Props = {
	showCount: boolean;
	onlineCount: string;
	online: ProductAvailabilityData;
};

export const ProductCardDeliveryStatus: FC<Props> = ({ showCount, onlineCount, online }) => {
	const nls = useLocalization('Inventory');
	const status = `${online?.inventoryStatus}`;
	return (
		<Typography sx={productCardInventoryTextSX}>
			{status === INVENTORY_PBC_STATUS.backorder
				? nls.ByWay.Delivery.AvailableForBackorder.t()
				: AVAILABLE_STATUS_ONLY[status]
				? showCount
					? nls.ByWay.Delivery.Available.t({ count: onlineCount ?? EMPTY_STRING })
					: nls.ByWay.Delivery.NoInventoryShow.t()
				: status === INVENTORY_PBC_STATUS.out_of_stock
				? nls.ByWay.Delivery.OOS.t()
				: null}
		</Typography>
	);
};
