/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ShippingAddressAndMethodSelection } from '@/components/content/CheckOut/parts/Shipping/Selections';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { FC, useContext } from 'react';

/** @deprecated */
export const Shipping: FC = () => {
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { orderItems, mutateCart, usableShipping, mutateUsableShippingInfo } = checkoutValues;

	const useShippingValues = useShipping({
		orderItems,
		mutateCart,
		usableShipping,
		mutateUsableShippingInfo,
	});

	return (
		<ContentProvider value={{ ...checkoutValues, ...useShippingValues }}>
			<ShippingAddressAndMethodSelection />
		</ContentProvider>
	);
};
