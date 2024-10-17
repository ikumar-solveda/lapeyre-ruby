/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { shippingMultiShipmentTableAlertSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/alert';
import { shippingMultiShipmentTableToolbarSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/toolbar';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Alert, Button, Toolbar, Typography } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

/** @deprecated */
export const ShippingMultiShipmentTableToolbar: FC<{
	selectedItemIds: string[];
}> = ({ selectedItemIds }) => {
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { setSelectedItems, orderItems, showError, setShowError, canSelectTogether, isGuest } =
		useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;

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
			sx={shippingMultiShipmentTableToolbarSX(selectedItemIds.length > 0 && !showError)}
			id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar`}
			data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-toolbar`}
		>
			{showError ? (
				<Alert variant="outlined" severity="error" sx={shippingMultiShipmentTableAlertSX}>
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
					{multipleShipmentTableNLS.Labels.OrderItems.t({ n: orderItems.length })}
				</Typography>
			)}
		</Toolbar>
	);
};
