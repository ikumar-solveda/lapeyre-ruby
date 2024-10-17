/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { getSubscriptionFrequency } from '@/data/Content/RecurringOrderDetails';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const RecurringOrdersTableOrderSchedule: FC = () => {
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	const schedule = useMemo(
		() => getSubscriptionFrequency(subscription, labels),
		[subscription, labels]
	);

	return (
		<TableCellResponsiveContent label={labels.Schedule.t()}>
			<Typography id="order-schedule" data-testid="order-schedule">
				{schedule}
			</Typography>
		</TableCellResponsiveContent>
	);
};
