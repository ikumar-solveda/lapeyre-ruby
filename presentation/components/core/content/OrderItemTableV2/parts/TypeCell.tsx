/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const OrderItemTableV2TypeCell: FC<
	CellContext<OrderTableData, OrderTableData['fulfillment']>
> = ({ getValue }) => {
	const localization = useLocalization('OrderItemTable');
	const { physicalStoreExternalId, type } = getValue();
	return (
		<TableCellResponsiveContent
			label={localization.Labels.FulfillmentType.t()}
			sx={orderItemTableV2TableCellResponsiveContentSX}
		>
			<Typography>
				{type === 'pickup'
					? localization.Fulfillment.Pickup.t({ store: physicalStoreExternalId ?? '' })
					: localization.Fulfillment.Delivery.t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
