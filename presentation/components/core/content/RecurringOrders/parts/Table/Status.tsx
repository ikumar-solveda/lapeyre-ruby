/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const RecurringOrdersTableStatus: FC = () => {
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	const status = useMemo(() => {
		const key = `State${subscription?.state}` as keyof typeof labels;
		return labels[key].t({} as any);
	}, [subscription, labels]);

	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.Status.t()}</Typography>}
		>
			<Typography id="order-status" data-testid="order-status">
				{status}
			</Typography>
		</TableCellResponsiveContent>
	);
};
