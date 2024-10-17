/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ShippingAddressSelection } from '@/components/content/CheckOutV2/parts/Shipping/AddressSelection';
import { CheckOutV2ShippingCreateEditAddress } from '@/components/content/CheckOutV2/parts/Shipping/CreateEditAddress';
import { CheckOutV2ShippingCreateEditAddressHeader } from '@/components/content/CheckOutV2/parts/Shipping/CreateEditAddressHeader';
import { CheckOutV2ShippingMethodSelection } from '@/components/content/CheckOutV2/parts/Shipping/MethodSelection';
import { CheckOutV2ShippingMultiShipmentItemTable } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable';
import { CheckOutV2ShippingMultiShipmentSelectionHeader } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipSelectionHeader';
import { CheckOutV2ShippingSelectionAction } from '@/components/content/CheckOutV2/parts/Shipping/SelectionAction';
import { CheckOutV2ShippingSingleShipmentSelectionHeader } from '@/components/content/CheckOutV2/parts/Shipping/SingleShipSelectionHeader';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { Divider, Grid, Stack } from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutV2ShippingAddressAndMethodSelection: FC = () => {
	const { selectedItems, editableAddress } = useContext(ContentContext) as ReturnType<
		typeof useCheckOutV2
	> &
		ReturnType<typeof useShipping>;

	/** toggle multiple shipment, selectedItems
	 * 1. `selectedItems.length === 0` -> show order item table to select item, another component. For multiple shipments.
	 * 2. `selectedItems.length < orderItems.length`  -> show shipping selection options.
	 * 3. `selectedItems.length === orderItems.length` -> single shipment select shipping options.
	 */
	return (
		// length 0, show orderItem multiple shipment selection component.
		<Stack spacing={2} divider={<Divider />}>
			<Grid container spacing={2} m={0}>
				<CheckOutV2ShippingMultiShipmentSelectionHeader />
				<CheckOutV2ShippingSingleShipmentSelectionHeader />
				<CheckOutV2ShippingCreateEditAddressHeader />
			</Grid>
			{editableAddress === null ? (
				<Stack spacing={2} divider={<Divider />}>
					{selectedItems.length === 0 ? (
						<CheckOutV2ShippingMultiShipmentItemTable />
					) : (
						<>
							<CheckOutV2ShippingAddressSelection />
							<CheckOutV2ShippingMethodSelection />
						</>
					)}
					<CheckOutV2ShippingSelectionAction />
				</Stack>
			) : (
				<CheckOutV2ShippingCreateEditAddress />
			)}
		</Stack>
	);
};
