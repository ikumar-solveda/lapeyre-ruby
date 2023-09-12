/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';

export const OrderHistoryTablePurchaseOrder: FC = () => {
	const { purchaseOrder } = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{purchaseOrder.t()}</Typography>}
		>
			<Typography id="order-status" data-testid="order-status">
				{order.buyerPONumber ?? ''}
			</Typography>
		</TableCellResponsiveContent>
	);
};
