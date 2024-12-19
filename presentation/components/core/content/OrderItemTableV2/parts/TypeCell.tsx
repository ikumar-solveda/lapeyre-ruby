/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderItemTableV2FulfillmentBackorder } from '@/components/content/OrderItemTableV2/parts/FulfillmentBackorder';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { EXP_DATE_OPTION } from '@/data/constants/dateTime';
import { BACK_ORDER_STATUSES } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import type { OrderTableData } from '@/data/types/OrderItemTableV2';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const OrderItemTableV2TypeCell: FC<
	CellContext<OrderTableData, OrderTableData['fulfillment']>
> = ({ getValue }) => {
	const localization = useLocalization('OrderItemTable');
	const { physicalStoreExternalId, type, orderItemInventoryStatus, expectedShipDate } = getValue();

	const dateFormatter = useDateTimeFormat(EXP_DATE_OPTION);
	const expectedDate = useMemo(
		() => (expectedShipDate ? dateFormatter.format(new Date(expectedShipDate)) : EMPTY_STRING),
		[expectedShipDate, dateFormatter]
	);

	return (
		<TableCellResponsiveContent
			label={localization.Labels.FulfillmentType.t()}
			sx={orderItemTableV2TableCellResponsiveContentSX}
		>
			{BACK_ORDER_STATUSES[orderItemInventoryStatus] ? (
				<OrderItemTableV2FulfillmentBackorder
					type={type}
					expectedDate={expectedDate}
					physicalStoreExternalId={physicalStoreExternalId}
				/>
			) : (
				<Typography>
					{type === 'pickup'
						? localization.Fulfillment.Pickup.t({ store: physicalStoreExternalId ?? '' })
						: localization.Fulfillment.Delivery.t()}
				</Typography>
			)}
		</TableCellResponsiveContent>
	);
};
