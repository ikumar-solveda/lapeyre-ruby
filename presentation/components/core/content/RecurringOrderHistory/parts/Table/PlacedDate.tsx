/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersHistoryRowContextValue } from '@/components/content/RecurringOrderHistory/parts/Table';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';

import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const RecurringOrderHistoryTablePlacedDate: FC = () => {
	const { order } = useContext(ContentContext) as RecurringOrdersHistoryRowContextValue;
	const { placedDate } = order;
	const labels = useLocalization('Order');
	const formatter = useDateTimeFormat();
	const display = useMemo(
		() => (placedDate ? formatter.format(new Date(placedDate)) : labels.NotAvailable.t()),
		[placedDate, formatter, labels.NotAvailable]
	);

	return (
		<TableCellResponsiveContent label={labels.PlacedDate.t()}>
			<Typography id="order-status" data-testid="order-status">
				{display}
			</Typography>
		</TableCellResponsiveContent>
	);
};
