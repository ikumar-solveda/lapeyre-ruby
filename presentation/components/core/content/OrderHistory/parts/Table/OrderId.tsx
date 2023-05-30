/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { ContentContext } from '@/data/context/content';
import { OrderHistoryTableRowValueType } from '@/components/content/OrderHistory/parts/Table';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';

export const OrderHistoryTableOrderId: FC = () => {
	const routes = useLocalization('Routes');
	const { order } = useContext(ContentContext) as OrderHistoryTableRowValueType;
	return (
		<Linkable
			href={{ pathname: routes.OrderDetails.route.t(), query: { orderId: order?.orderId } }}
		>
			{order?.orderId}
		</Linkable>
	);
};
