/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ShippingAddressAndMethodSelection } from '@/components/content/CheckOutV2/parts/Shipping/Selections';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { FC, useContext } from 'react';

export const CheckOutV2Shipping: FC = () => {
	const checkoutAndShippingValues = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;

	return (
		<ContentProvider value={checkoutAndShippingValues}>
			<CheckOutV2ShippingAddressAndMethodSelection />
		</ContentProvider>
	);
};
