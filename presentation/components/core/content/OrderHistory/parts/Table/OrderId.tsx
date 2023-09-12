/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { ContentContext } from '@/data/context/content';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { Typography } from '@mui/material';

export const OrderHistoryTableOrderId: FC = () => {
	const routes = useLocalization('Routes');
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.OrderId.t()}</Typography>}
		>
			<Linkable
				href={{ pathname: routes.OrderDetails.route.t(), query: { orderId: order?.orderId } }}
			>
				{order?.orderId}
			</Linkable>
		</TableCellResponsiveContent>
	);
};
