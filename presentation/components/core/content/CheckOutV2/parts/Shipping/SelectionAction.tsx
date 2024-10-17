/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { validateAddress } from '@/utils/address';
import { Button, Stack } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

export const CheckOutV2ShippingSelectionAction: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	const checkoutNLS = useLocalization('Checkout');
	const {
		selectedAddress,
		selectedShipModeId,
		next,
		setShowError,
		deliveryOrderItems,
		selectedItems,
		setSelectedItems,
		validateOrderShippingSelections,
		updated,
		setUpdated,
		isLoading,
		steps,
		activeStep,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;
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

	const nextStep = steps[activeStep + 1] as 'pickup' | 'payment';

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-end">
			{selectedItems.length === 0 || selectedItems.length === deliveryOrderItems?.length ? (
				<Button
					variant="contained"
					data-testid="continue-button"
					id="continue-button"
					color="primary"
					onClick={onNext}
					disabled={isLoading}
				>
					{checkoutNLS.Actions.Continue[nextStep].t()}
				</Button>
			) : (
				<Button
					variant="contained"
					data-testid="continue-button"
					id="continue-button"
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
