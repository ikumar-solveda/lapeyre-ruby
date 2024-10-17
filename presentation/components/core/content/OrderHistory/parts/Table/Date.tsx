/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { ORDER_STATUS } from '@/data/constants/order';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryTableDate: FC = () => {
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	const formatter = useDateTimeFormat();

	return (
		<TableCellResponsiveContent label={labels.OrderDate.t()}>
			<Typography data-testid="order-date" id="order-date">
				{order?.placedDate
					? formatter.format(new Date(order?.placedDate))
					: order?.orderStatus === ORDER_STATUS.ApprovalDenied
					? labels.NotAvailable.t()
					: labels.Pending.t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
