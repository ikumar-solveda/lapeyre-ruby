/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FlowIfDisabled, FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { hasInStock } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { formatAvailability } from '@/utils/formatAvailability';
import { Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	availability: ProductAvailabilityData | undefined;
};
const EMPTY_AVAILABILITY = {} as ProductAvailabilityData;
export const OrderItemTableV2AvailabilityLabel: FC<Props> = ({
	availability = EMPTY_AVAILABILITY,
}) => {
	const { physicalStoreId, availableQuantity } = availability;
	const { localeName: locale } = useStoreLocale();
	const count = useMemo(
		() => formatAvailability(locale, availableQuantity),
		[availableQuantity, locale]
	);
	const availabilityLocalization = useLocalization('Inventory');
	const inStock = useMemo(() => hasInStock(availability), [availability]);

	return (
		<Typography>
			{inStock ? (
				physicalStoreId ? (
					<>
						<FlowIfEnabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
							{availabilityLocalization.ByCount.ForPickup.Available.t({ count })}
						</FlowIfEnabled>
						<FlowIfDisabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
							{availabilityLocalization.ByCount.ForPickup.NoInventoryShow.t()}
						</FlowIfDisabled>
					</>
				) : (
					<>
						<FlowIfEnabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
							{availabilityLocalization.ByCount.ForDelivery.Available.t({ count })}
						</FlowIfEnabled>
						<FlowIfDisabled feature={EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT}>
							{availabilityLocalization.ByCount.ForDelivery.NoInventoryShow.t()}
						</FlowIfDisabled>
					</>
				)
			) : physicalStoreId ? (
				availabilityLocalization.ByCount.ForPickup.OOS.t()
			) : (
				availabilityLocalization.ByCount.ForDelivery.OOS.t()
			)}
		</Typography>
	);
};
