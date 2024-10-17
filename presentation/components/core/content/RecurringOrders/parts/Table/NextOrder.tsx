/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { getSubscriptionNextDelivery } from '@/data/Content/RecurringOrderDetails';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const RecurringOrdersTableNextOrder: FC = () => {
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	const formatter = useDateTimeFormat();
	const next = useMemo(
		() => getSubscriptionNextDelivery(subscription, formatter) ?? labels.NotAvailable.t(),
		[subscription, formatter, labels.NotAvailable]
	);
	return (
		<TableCellResponsiveContent label={labels.NextOrder.t()}>
			<Typography data-testid="next-order" id="next-order">
				{next}
			</Typography>
		</TableCellResponsiveContent>
	);
};
