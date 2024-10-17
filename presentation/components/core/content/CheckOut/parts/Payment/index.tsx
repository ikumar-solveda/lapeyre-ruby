/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PurchaseOrderNumber } from '@/components/blocks/PurchaseOrderNumber';
import { PaymentCardsDisplay } from '@/components/content/CheckOut/parts/Payment/CardsDisplay';
import { PaymentHeader } from '@/components/content/CheckOut/parts/Payment/Header';
import { PaymentSelection } from '@/components/content/CheckOut/parts/Payment/Selection';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { Divider, Stack } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_CART = {} as Order;
/** @deprecated */
export const Payment: FC = () => {
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { multiplePayment, data: cart = EMPTY_CART, poRequired } = checkoutValues;
	const usePaymentValues = usePayment(cart);
	const { paymentNumberToEdit } = usePaymentValues;
	return (
		<ContentProvider value={{ ...checkoutValues, ...usePaymentValues }}>
			<Stack spacing={2} divider={<Divider />}>
				<PaymentHeader />
				{poRequired ? <PurchaseOrderNumber /> : null}
				{multiplePayment && paymentNumberToEdit === null ? (
					<PaymentCardsDisplay />
				) : (
					<PaymentSelection />
				)}
			</Stack>
		</ContentProvider>
	);
};
