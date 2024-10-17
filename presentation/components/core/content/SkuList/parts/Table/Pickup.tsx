/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { skuListAvailabilityIcon } from '@/components/content/SkuList/styles/availabilityIcon';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { ContentContext } from '@/data/context/content';
import { SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { getInventoryStatusV2 } from '@/utils/getInventoryStatusV2';
import { Check, RemoveCircleOutline } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SkuListTablePickup: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const { original: _row } = row;
	const { isInventoryLoading, availability, partNumber } = _row;
	const { physicalStore } = useContext(ContentContext) as SkuListTableAuxiliaryContextValue;
	const { localeName: locale } = useStoreLocale();
	const nls = useLocalization('StoreInventoryDialog');
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = data.featureEnabled;
	const { offlineStatus: inStock, offlineCount: count } = useMemo(
		() => getInventoryStatusV2(partNumber, availability, physicalStore, showCount, locale),
		[availability, locale, partNumber, physicalStore, showCount]
	);
	const Icon = inStock ? Check : RemoveCircleOutline;

	return (
		<TableCellResponsiveContent label={nls.Labels.Pickup.t()}>
			<Stack direction="row" spacing={0.5}>
				{isInventoryLoading ? (
					<CircularProgress size={30} />
				) : (
					<LocalizationWithComponent
						text={
							!inStock
								? nls.Availability.OOS.t()
								: showCount
								? nls.Availability.Available.t({ count })
								: nls.Availability.NoInventoryShow.t()
						}
						components={[
							<Icon key="0" fontSize="small" sx={skuListAvailabilityIcon(inStock)} />,
							<Typography key="1" />,
						]}
					/>
				)}
			</Stack>
		</TableCellResponsiveContent>
	);
};
