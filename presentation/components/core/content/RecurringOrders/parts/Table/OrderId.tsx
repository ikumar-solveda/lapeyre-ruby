/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const RecurringOrdersTableOrderId: FC = () => {
	const routes = useLocalization('Routes');
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	return (
		<TableCellResponsiveContent label={labels.OrderId.t()}>
			<Linkable
				href={{
					pathname: routes.OrderDetails.route.t(),
					query: {
						orderId: subscription?.purchaseDetails?.parentOrderIdentifier?.parentOrderId as string,
						subscriptionId: subscription?.subscriptionIdentifier?.subscriptionId as string,
					},
				}}
			>
				{subscription?.purchaseDetails?.parentOrderIdentifier?.parentOrderId as string}
			</Linkable>
		</TableCellResponsiveContent>
	);
};
