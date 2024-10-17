/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { FC, useContext } from 'react';

export const OrderHistoryTableOrderId: FC = () => {
	const routes = useLocalization('Routes');
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	return (
		<TableCellResponsiveContent label={labels.OrderId.t()}>
			<Linkable
				href={{ pathname: routes.OrderDetails.route.t(), query: { orderId: order?.orderId } }}
			>
				{order?.orderId}
			</Linkable>
		</TableCellResponsiveContent>
	);
};
