/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { CheckOutV2InvalidAddressAlert } from '@/components/content/CheckOutV2/parts/Payment/InvalidAddressAlert';
import type { Props } from '@/components/content/CheckOutV2/parts/Payment/Selection';
import { checkOutV2PaymentErrorSX } from '@/components/content/CheckOutV2/styles/Payment/error';
import { checkOutV2MethodSelectionCheckboxSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionCheckbox';
import { useAddressBook } from '@/data/Content/AddressBook';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { usePayment } from '@/data/Content/Payment';
import { usePersonalAddressAllowedForBilling } from '@/data/Content/PersonalAddressAllowedForBilling';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import {
	ADDRESS_INIT,
	ADDRESS_SHIPPING_BILLING,
	makeEditable,
	SHIPPING_AND_BILLING_SHORT,
} from '@/utils/address';
import { Contacts } from '@mui/icons-material';
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Input,
	Stack,
	Typography,
} from '@mui/material';
import { ChangeEvent, FC, useContext, useMemo } from 'react';

export const CheckOutV2PaymentAddressSelection: FC<Props> = ({
	values,
	error,
	onNamedValueChange,
}) => {
	const paymentNLS = useLocalization('Payment');
	const shippingNLS = useLocalization('Shipping');
	const checkoutAddressNLS = useLocalization('CheckoutAddress');
	const addrBook = useAddressBook();
	const { primaryBillingAddress } = addrBook;
	const {
		toggleEditCreateAddress,
		getBillingAddressCardActionsV2,
		billingAddressMap,
		usablePayments,
		data: order,
		selectedAddress,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment> &
		ReturnType<typeof useShipping>;
	const orderId = order?.orderId;
	const availableAddress = useMemo(
		() =>
			(
				usablePayments?.find((p) => p.xumet_policyId === values.policyId)?.usableBillingAddress ??
				[]
			)
				.map((usable) => {
					const address = billingAddressMap[usable.nickName ?? ''];
					return (address ? { ...usable, ...address } : undefined) as typeof address;
				})
				.filter(Boolean),
		[billingAddressMap, usablePayments, values.policyId]
	);
	const addressSelectedForShipping = availableAddress.find(
		(address) => address.nickName === selectedAddress?.nickName
	);
	const canUsePersonal = usePersonalAddressAllowedForBilling(orderId);

	const onCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) =>
		onNamedValueChange(
			'billing_address_id',
			event.target.checked ? (selectedAddress?.addressId as string) : ''
		);

	return (
		<Stack spacing={2} pb={2}>
			<IconLabel
				icon={<Contacts color="primary" />}
				label={<Typography variant="h5">{paymentNLS.Labels.BillingAddress.t()}</Typography>}
			/>
			{(selectedAddress?.addressType === ADDRESS_SHIPPING_BILLING ||
				selectedAddress?.addressType === SHIPPING_AND_BILLING_SHORT) &&
			addressSelectedForShipping ? (
				<FormControlLabel
					control={
						<Checkbox
							checked={values.billing_address_id === selectedAddress.addressId}
							id="checkout-ship-same-bill"
							data-testid="checkout-ship-same-bill"
							name="shipSameAsBill"
							autoFocus
							onChange={onCheckBoxChange}
							sx={checkOutV2MethodSelectionCheckboxSX}
						/>
					}
					label={checkoutAddressNLS.Payment.SameAsShipping.t()}
				/>
			) : null}
			{canUsePersonal ? (
				<Box>
					{values.policyId ? (
						<Button
							data-testid="checkout-new-address-button"
							id="checkout-new-address-button"
							color="secondary"
							variant="contained"
							onClick={toggleEditCreateAddress({ ...ADDRESS_INIT })}
						>
							{shippingNLS.Actions.CreateNew.t()}
						</Button>
					) : (
						checkoutAddressNLS.Payment.ChooseFirst.t()
					)}
				</Box>
			) : null}
			{availableAddress.length > 0 ? (
				<Box>
					<Typography mb={2}>
						{canUsePersonal
							? shippingNLS.Msgs.UseSavedAddress.t()
							: shippingNLS.Msgs.SelectExisting.t()}
					</Typography>
					<Grid container spacing={2} alignItems="stretch">
						<ContentProvider value={addrBook}>
							{(availableAddress as Address[]).map((address) => (
								<Grid item xs={12} sm={6} md={4} key={address.nickName}>
									<AddressCard
										address={address}
										selectedAddressId={values.billing_address_id}
										actions={getBillingAddressCardActionsV2(
											makeEditable(address),
											values.billing_address_id,
											onNamedValueChange
										)}
										shouldShowPrimary={address.nickName === primaryBillingAddress?.nickName}
									/>
								</Grid>
							))}
						</ContentProvider>
					</Grid>
					<CheckOutV2InvalidAddressAlert availableAddress={availableAddress} values={values} />
				</Box>
			) : null}
			<Input
				required
				name="billing_address_id"
				value={values.billing_address_id}
				sx={{ display: 'none' }}
			/>
			{error.billing_address_id ? (
				<Alert variant="outlined" severity="error" sx={checkOutV2PaymentErrorSX}>
					{paymentNLS.Msgs.SelectBillingAddress.t()}
				</Alert>
			) : null}
		</Stack>
	);
};
