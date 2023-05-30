/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PaymentCardsDisplay } from '@/components/content/CheckOut/parts/Payment/CardsDisplay';
import { PaymentHeader } from '@/components/content/CheckOut/parts/Payment/Header';
import { PaymentSelection } from '@/components/content/CheckOut/parts/Payment/Selection';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { Stack, Divider } from '@mui/material';
import { FC, useContext } from 'react';
import { KeyedMutator } from 'swr';

const EMPTY_CART = {} as Order;
export const Payment: FC = () => {
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { multiplePayment, data: cart = EMPTY_CART as Order, mutateCart } = checkoutValues;
	const usePaymentValues = usePayment(cart, mutateCart as KeyedMutator<Order>);
	const { paymentNumberToEdit } = usePaymentValues;

	return (
		<ContentProvider value={{ ...checkoutValues, ...usePaymentValues }}>
			<Stack spacing={2} divider={<Divider />}>
				<PaymentHeader />
				{multiplePayment && paymentNumberToEdit === null ? (
					<PaymentCardsDisplay />
				) : (
					<PaymentSelection />
				)}
			</Stack>
		</ContentProvider>
	);
};
