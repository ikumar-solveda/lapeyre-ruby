/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { Props } from '@/components/content/CheckOutV2/parts/Payment/Selection';
import { checkOutV2PaymentErrorSX } from '@/components/content/CheckOutV2/styles/Payment/error';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { usePayment } from '@/data/Content/Payment';
import { usePersonalAddressAllowedForBilling } from '@/data/Content/PersonalAddressAllowedForBilling';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import { ADDRESS_INIT, makeEditable, validateAddress } from '@/utils/address';
import { Contacts } from '@mui/icons-material';
import { Alert, Box, Button, Grid, Input, Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CheckOutV2PaymentAddressSelection: FC<Props> = ({
	values,
	error,
	onNamedValueChange,
}) => {
	const paymentNLS = useLocalization('Payment');
	const shippingNLS = useLocalization('Shipping');
	const checkoutAddressNLS = useLocalization('CheckoutAddress');
	const {
		toggleEditCreateAddress,
		getBillingAddressCardActions,
		billingAddressMap,
		usablePayments,
		data: order,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment>;
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
	const canUsePersonal = usePersonalAddressAllowedForBilling(orderId);

	return (
		<Stack spacing={2} pb={2}>
			<IconLabel
				icon={<Contacts color="primary" />}
				label={<Typography variant="h5">{paymentNLS.Labels.BillingAddress.t()}</Typography>}
			/>
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
						{(availableAddress as Address[]).map((address) => (
							<Grid item xs={12} sm={6} md={4} key={address.nickName}>
								<AddressCard
									address={address}
									selectedAddressId={values.billing_address_id}
									actions={getBillingAddressCardActions(
										makeEditable(address),
										values.billing_address_id,
										validateAddress(address),
										onNamedValueChange
									)}
								/>
							</Grid>
						))}
					</Grid>
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
