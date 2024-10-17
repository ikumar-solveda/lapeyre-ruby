/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PurchaseOrderNumber } from '@/components/blocks/PurchaseOrderNumber';
import { CheckOutV2PaymentCardsDisplay } from '@/components/content/CheckOutV2/parts/Payment/CardsDisplay';
import { CheckOutV2PaymentHeader } from '@/components/content/CheckOutV2/parts/Payment/Header';
import { CheckOutV2PaymentSelection } from '@/components/content/CheckOutV2/parts/Payment/Selection';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { Divider, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_CART = {} as Order;
export const CheckOutV2Payment: FC = () => {
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOutV2>;
	const { multiplePayment, data: cart = EMPTY_CART, poRequired } = checkoutValues;
	const usePaymentValues = usePayment(cart);
	const { paymentNumberToEdit } = usePaymentValues;
	const value = useMemo(
		() => ({ ...checkoutValues, ...usePaymentValues }),
		[checkoutValues, usePaymentValues]
	);
	return (
		<ContentProvider value={value}>
			<Stack spacing={2} divider={<Divider />}>
				<CheckOutV2PaymentHeader />
				{poRequired ? <PurchaseOrderNumber /> : null}
				{multiplePayment && paymentNumberToEdit === null ? (
					<CheckOutV2PaymentCardsDisplay />
				) : (
					<CheckOutV2PaymentSelection />
				)}
			</Stack>
		</ContentProvider>
	);
};
