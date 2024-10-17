/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersHistoryRowContextValue } from '@/components/content/RecurringOrderHistory/parts/Table';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const RecurringOrderHistoryTableOrderId: FC = () => {
	const { order } = useContext(ContentContext) as RecurringOrdersHistoryRowContextValue;
	const { orderId } = order;
	const labels = useLocalization('Order');
	return (
		<TableCellResponsiveContent label={labels.OrderId.t()}>{orderId}</TableCellResponsiveContent>
	);
};
