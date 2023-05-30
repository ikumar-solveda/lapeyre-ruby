/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutSwitch } from '@/components/content/CheckOut/parts/Switch';
import { CheckOutTitle } from '@/components/content/CheckOut/parts/Title';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderItem } from '@/data/types/Order';
import { Grid } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_ORDER_ITEMS: OrderItem[] = [];
export const ShippingSingleShipmentSelectionHeader: FC = () => {
	const {
		selectedItems,
		orderItems = EMPTY_ORDER_ITEMS,
		editableAddress,
		setSelectedItems,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');
	const switchToMultiShipping = () => setSelectedItems([]);
	return editableAddress === null && selectedItems && selectedItems.length === orderItems.length ? (
		<>
			<Grid item>
				<CheckOutTitle title={shippingNLS.Title.t()} />
			</Grid>
			<Grid item>
				<CheckOutSwitch
					checked={selectedItems.length < orderItems.length}
					onChange={switchToMultiShipping}
					label={shippingNLS.Labels.UseMultiple.t()}
					disabled={!orderItems || orderItems.length === 1}
				/>
			</Grid>
		</>
	) : null;
};
