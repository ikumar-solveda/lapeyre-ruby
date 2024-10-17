/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { checkOutV2ShippingMultiShipmentTableAlertSX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/alert';
import { checkOutV2ShippingMultiShipmentTableToolbarSX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/toolbar';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Alert, Button, Toolbar, Typography } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

export const CheckOutV2ShippingMultiShipmentTableToolbar: FC<{
	selectedItemIds: string[];
}> = ({ selectedItemIds }) => {
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const {
		setSelectedItems,
		deliveryOrderItems,
		showError,
		setShowError,
		canSelectTogether,
		isGuest,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;

	const onClick = useCallback(() => {
		const { can, items } = canSelectTogether(selectedItemIds, isGuest);
		if (can) {
			setSelectedItems(items);
		} else {
			setShowError(multipleShipmentTableNLS.Labels.SelInvalid.t());
		}
	}, [
		canSelectTogether,
		multipleShipmentTableNLS,
		selectedItemIds,
		setSelectedItems,
		setShowError,
		isGuest,
	]);

	return (
		<Toolbar
			sx={checkOutV2ShippingMultiShipmentTableToolbarSX(selectedItemIds.length > 0 && !showError)}
			id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar`}
			data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar`}
		>
			{showError ? (
				<Alert variant="outlined" severity="error" sx={checkOutV2ShippingMultiShipmentTableAlertSX}>
					{typeof showError === 'string'
						? showError
						: multipleShipmentTableNLS.Msgs.MissingSelection.t()}
				</Alert>
			) : selectedItemIds.length > 0 ? (
				<>
					<Typography variant="subtitle1" component="div" m={1}>
						{multipleShipmentTableNLS.Labels.nItemsSel.t({ n: selectedItemIds.length })}
					</Typography>
					<Button
						id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar-group-select-shipping-address`}
						data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar-group-select-shipping-address`}
						variant="contained"
						onClick={onClick}
					>
						{multipleShipmentTableNLS.Labels.SelectShippingAddressAndMethod.t()}
					</Button>
				</>
			) : (
				<Typography variant="h6" component="div">
					{multipleShipmentTableNLS.Labels.OrderItems.t({ n: deliveryOrderItems.length })}
				</Typography>
			)}
		</Toolbar>
	);
};
