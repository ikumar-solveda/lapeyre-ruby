/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ShippingAddressAndMethodSelection } from '@/components/content/CheckOutV2/parts/Shipping/Selections';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { FC, useContext, useMemo } from 'react';

export const CheckOutV2Shipping: FC = () => {
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOutV2>;
	const { mutateCart, usableShipping, mutateUsableShippingInfo, deliveryOrderItems } =
		checkoutValues;

	const useShippingValues = useShipping({
		orderItems: deliveryOrderItems,
		mutateCart,
		usableShipping,
		mutateUsableShippingInfo,
	});

	const value = useMemo(
		() => ({ ...checkoutValues, ...useShippingValues }),
		[checkoutValues, useShippingValues]
	);

	return (
		<ContentProvider value={value}>
			<CheckOutV2ShippingAddressAndMethodSelection />
		</ContentProvider>
	);
};
