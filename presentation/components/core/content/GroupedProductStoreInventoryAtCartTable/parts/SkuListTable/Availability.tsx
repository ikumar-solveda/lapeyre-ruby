/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { gpsiacTableSkuListTableAvailabilityIcon } from '@/components/content/GroupedProductStoreInventoryAtCartTable/styles/skuListTable/availabilityIcon';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { UNIFIED_STATUSES } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { ProductType } from '@/data/types/Product';
import { GPSIACNestedSkuListTableContextValue } from '@/data/types/SkuListTable';
import { Check, RemoveCircleOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const GPSIACTableSkuListTableAvailability: FC<CellContext<ProductType, unknown>> = ({
	row,
}) => {
	const { availabilities } = useContext(ContentContext) as GPSIACNestedSkuListTableContextValue;
	const partNumber = row.original.partNumber;
	const availability = availabilities[partNumber];
	const nls = useLocalization('StoreInventoryDialog');
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = data.featureEnabled;
	const inStock = useMemo(
		() => availability?.status === UNIFIED_STATUSES.AVAILABLE,
		[availability]
	);
	const count = useMemo(() => availability?.quantity ?? EMPTY_STRING, [availability]);
	const Icon = inStock ? Check : RemoveCircleOutline;

	return (
		<TableCellResponsiveContent label={nls.Labels.Pickup.t()}>
			<Stack direction="row" spacing={0.5}>
				<LocalizationWithComponent
					text={
						!inStock
							? nls.Availability.OOS.t()
							: showCount
							? nls.Availability.Available.t({ count })
							: nls.Availability.NoInventoryShow.t()
					}
					components={[
						<Icon key="0" fontSize="small" sx={gpsiacTableSkuListTableAvailabilityIcon(inStock)} />,
						<Typography key="1" />,
					]}
				/>
			</Stack>
		</TableCellResponsiveContent>
	);
};
