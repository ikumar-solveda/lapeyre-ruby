/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { RecurringOrderHistoryTable } from '@/components/content/RecurringOrderHistory/parts/Table';
import { ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { FC } from 'react';

type Props = {
	order: Order;
};
export const RecurringOrderHistory: FC<Props> = ({ order }) => (
	<ContentProvider value={{ order }}>
		<RecurringOrderHistoryTable />
	</ContentProvider>
);
