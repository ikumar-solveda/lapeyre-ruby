/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { checkOutV2ShippingSelectionActionStack } from '@/components/content/CheckOutV2/styles/Shipping/selectionActionStack';
import { useNextRouter } from '@/data/Content/_NextRouter';
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
		updateMultiPaymentStatusIfBillingInfoIsStale,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;
	const onNext = useCallback(async () => {
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
		await updateMultiPaymentStatusIfBillingInfoIsStale();
		next();
	}, [
		selectedItems.length,
		validateOrderShippingSelections,
		selectedAddress,
		selectedShipModeId,
		updateMultiPaymentStatusIfBillingInfoIsStale,
		next,
		setShowError,
	]);
	const multiShipmentSelectionConfirm = useCallback(() => {
		setSelectedItems([]);
		scrollTo(0, 0);
		setUpdated(false);
	}, [setSelectedItems, setUpdated]);
	const nextStep = steps[activeStep + 1] as 'pickup' | 'payment';
	const routes = useLocalization('Routes');
	const router = useNextRouter();
	const onCart = useCallback(async () => router.push(routes.Cart.route.t()), [router, routes]);

	return (
		<Stack {...checkOutV2ShippingSelectionActionStack}>
			{selectedItems.length === 0 || selectedItems.length === deliveryOrderItems?.length ? (
				<>
					<Button
						variant="outlined"
						data-testid="back-to-cart-button"
						id="back-to-cart-button"
						onClick={onCart}
					>
						{checkoutNLS.Actions.Back.shoppingCart.t()}
					</Button>
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
				</>
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
