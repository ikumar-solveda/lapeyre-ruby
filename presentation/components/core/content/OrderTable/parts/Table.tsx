/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { OrderItemTableV2 } from '@/components/content/OrderItemTableV2';
import { useOrderItemTableV2 } from '@/data/Content/OrderItemTableV2';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { OrderItem } from '@/data/types/Order';
import { TableContainer } from '@mui/material';
import { ComponentPropsWithRef, FC } from 'react';

export const OrderTableItemTable: FC<
	ComponentPropsWithRef<typeof TableContainer> & {
		orderItems: OrderItem[];
		orderId: string;
		readonly?: boolean;
		isShippingGroup?: boolean;
		orderStatus?: string;
	}
> = ({ orderItems, id, readonly = false, isShippingGroup = false, orderId, ...otherProps }) => {
	const {
		storeLocator: { selectedStore },
	} = useStoreLocatorState();
	const { data } = useOrderItemTableV2(orderItems, orderId, selectedStore);
	return (
		<OrderItemTableV2
			data={data}
			id={id}
			readonly={readonly}
			isShippingGroup={isShippingGroup}
			{...otherProps}
		/>
	);
};
