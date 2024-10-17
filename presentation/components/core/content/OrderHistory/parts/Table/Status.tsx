/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryTableStatus: FC = () => {
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	const statusText = `Status_${order?.orderStatus}` as keyof typeof labels;
	return (
		<TableCellResponsiveContent label={labels.Status.t()}>
			<Typography id="order-status" data-testid="order-status">
				{labels[statusText].t(undefined as any)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
