/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2Switch } from '@/components/content/CheckOutV2/parts/Switch';
import { CheckOutV2Title } from '@/components/content/CheckOutV2/parts/Title';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderItem } from '@/data/types/Order';
import { CircularProgress, Grid } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_ORDER_ITEMS: OrderItem[] = [];
export const CheckOutV2ShippingSingleShipmentSelectionHeader: FC = () => {
	const {
		selectedItems,
		deliveryOrderItems = EMPTY_ORDER_ITEMS,
		editableAddress,
		setSelectedItems,
		isLoading,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');
	const switchToMultiShipping = () => setSelectedItems([]);
	return editableAddress === null &&
		selectedItems &&
		selectedItems.length === deliveryOrderItems.length ? (
		<>
			<Grid item>
				<CheckOutV2Title title={shippingNLS.Title.t()} />
			</Grid>
			<Grid item>
				<CheckOutV2Switch
					checked={selectedItems.length < deliveryOrderItems.length}
					onChange={switchToMultiShipping}
					label={shippingNLS.Labels.UseMultiple.t()}
					disabled={!deliveryOrderItems || deliveryOrderItems.length === 1}
				/>
			</Grid>
			{isLoading ? (
				<Grid item>
					<CircularProgress size={30} />
				</Grid>
			) : null}
		</>
	) : null;
};
