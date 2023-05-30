/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Grid, Stack, Divider } from '@mui/material';
import { FC, useContext } from 'react';
import { ContentContext } from '@/data/context/content';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ShippingAddressSelection } from '@/components/content/CheckOut/parts/Shipping/AddressSelection';
import { ShippingMethodSelection } from '@/components/content/CheckOut/parts/Shipping/MethodSelection';
import { ShippingSelectionAction } from '@/components/content/CheckOut/parts/Shipping/SelectionAction';
import { ShippingMultiShipmentSelectionHeader } from '@/components/content/CheckOut/parts/Shipping/MultiShipSelectionHeader';
import { ShippingSingleShipmentSelectionHeader } from '@/components/content/CheckOut/parts/Shipping/SingleShipSelectionHeader';
import { ShippingCreateEditAddressHeader } from '@/components/content/CheckOut/parts/Shipping/CreateEditAddressHeader';
import { ShippingCreateEditAddress } from '@/components/content/CheckOut/parts/Shipping/CreateEditAddress';
import { ShippingMultiShipmentItemTable } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable';

export const ShippingAddressAndMethodSelection: FC = () => {
	const { selectedItems, editableAddress } = useContext(ContentContext) as ReturnType<
		typeof useCheckOut
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
				<ShippingMultiShipmentSelectionHeader />
				<ShippingSingleShipmentSelectionHeader />
				<ShippingCreateEditAddressHeader />
			</Grid>
			{editableAddress === null ? (
				<Stack spacing={2} divider={<Divider />}>
					{selectedItems.length === 0 ? (
						<ShippingMultiShipmentItemTable />
					) : (
						<>
							<ShippingAddressSelection />
							<ShippingMethodSelection />
						</>
					)}
					<ShippingSelectionAction />
				</Stack>
			) : (
				<ShippingCreateEditAddress />
			)}
		</Stack>
	);
};
