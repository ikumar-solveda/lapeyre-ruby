/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderDetails } from '@/components/blocks/OrderDetails';
import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Order } from '@/data/types/Order';
import { ButtonProps } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_CART = {} as Order;
export const Review: FC = () => {
	const labels = useLocalization('OrderDetails').Actions;
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { data: cart = EMPTY_CART, orderItems, back, profileUsed } = checkoutValues;
	const actions = useMemo(
		() => [
			{
				'data-testid': 'order-details-back',
				id: 'order-details-back',
				children: profileUsed ? labels.BackCart.t() : labels.Back.t(),
				onClick: back,
				variant: 'contained',
				color: 'secondary',
			} as ButtonProps,
			{
				'data-testid': 'order-details-next',
				id: 'order-details-next',
				children: labels.Next.t(),
				type: 'submit',
				variant: 'contained',
			} as ButtonProps,
		],
		[labels, back, profileUsed]
	);
	return <OrderDetails order={cart} orderItems={orderItems} actions={actions} />;
};
