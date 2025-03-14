/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrderDetailsV2 } from '@/components/blocks/OrderDetailsV2';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { Order } from '@/data/types/Order';
import { ButtonProps, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_CART = {} as Order;
export const CheckOutV2Review: FC = () => {
	const orderDetailsNLS = useLocalization('OrderDetails');
	const checkoutNLS = useLocalization('Checkout');
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOutV2>;
	const {
		data: cart = EMPTY_CART,
		back,
		profileUsed,
		deliveryOrderItems,
		pickupOrderItems,
	} = checkoutValues;
	const { recurringOrderInfo } = useRecurringOrderState();
	const { isRecurring } = recurringOrderInfo;

	const actions = useMemo(
		() => [
			{
				'data-testid': 'order-details-back',
				id: 'order-details-back',
				children: profileUsed
					? pickupOrderItems.length
						? checkoutNLS.Actions.Back.pickup.t()
						: orderDetailsNLS.Actions.BackCart.t()
					: orderDetailsNLS.Actions.Back.t(),
				onClick: back,
				variant: 'outlined',
				color: 'secondary',
			} as ButtonProps,
			{
				'data-testid': 'order-details-next',
				id: 'order-details-next',
				children: isRecurring
					? orderDetailsNLS.Actions.NextRecurringOrder.t()
					: orderDetailsNLS.Actions.Next.t(),
				type: 'submit',
				variant: 'contained',
			} as ButtonProps,
		],
		[profileUsed, pickupOrderItems.length, checkoutNLS, orderDetailsNLS, back, isRecurring]
	);

	return (
		<OrderDetailsV2
			order={cart}
			actions={actions}
			deliveryOrderItems={deliveryOrderItems}
			pickupOrderItems={pickupOrderItems}
			heading={<Typography variant="h5">{orderDetailsNLS.Labels.CartDetails.t()}</Typography>}
		/>
	);
};
