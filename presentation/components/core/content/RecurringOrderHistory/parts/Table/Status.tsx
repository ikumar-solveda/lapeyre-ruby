/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersHistoryRowContextValue } from '@/components/content/RecurringOrderHistory/parts/Table';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const RecurringOrderHistoryTableStatus: FC = () => {
	const { order } = useContext(ContentContext) as RecurringOrdersHistoryRowContextValue;
	const { orderStatus } = order;
	const labels = useLocalization('Order');
	const statusText = `Status_${orderStatus}` as keyof typeof labels;
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.Status.t()}</Typography>}
		>
			<Typography id="order-status" data-testid="order-status">
				{labels[statusText].t(undefined as any)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
