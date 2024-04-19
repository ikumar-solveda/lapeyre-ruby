/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { validateAddress } from '@/utils/address';
import { Button, Stack } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

export const ShippingSelectionAction: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	const {
		selectedAddress,
		selectedShipModeId,
		next,
		setShowError,
		orderItems,
		selectedItems,
		setSelectedItems,
		validateOrderShippingSelections,
		updated,
		setUpdated,
		isLoading,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;
	const onNext = useCallback(() => {
		// next only gets call to continue to payment
		if (selectedItems.length === 0 && !validateOrderShippingSelections()) {
			// multiple shipment
			setShowError(true);
			return;
		}
		if (selectedItems.length > 0 && (!validateAddress(selectedAddress) || !selectedShipModeId)) {
			setShowError(true);
			return;
			// single shipment
		}
		next();
	}, [
		selectedAddress,
		selectedItems.length,
		selectedShipModeId,
		next,
		setShowError,
		validateOrderShippingSelections,
	]);
	const multiShipmentSelectionConfirm = useCallback(() => {
		setSelectedItems([]);
		scrollTo(0, 0);
		setUpdated(false);
	}, [setSelectedItems, setUpdated]);

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-end">
			{selectedItems.length === 0 || selectedItems.length === orderItems?.length ? (
				<Button
					variant="contained"
					data-testid="continue-to-payment-button"
					id="continue-to-payment-button"
					color="primary"
					onClick={onNext}
					disabled={isLoading}
				>
					{shippingNLS.Actions.Next.t()}
				</Button>
			) : (
				<Button
					variant="contained"
					data-testid="continue-to-payment-button"
					id="continue-to-payment-button"
					color="primary"
					onClick={multiShipmentSelectionConfirm}
					disabled={isLoading}
				>
					{updated ? shippingNLS.Actions.Done.t() : shippingNLS.Actions.Back.t()}
				</Button>
			)}
		</Stack>
	);
};
