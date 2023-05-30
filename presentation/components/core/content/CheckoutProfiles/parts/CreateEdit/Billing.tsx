/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { Linkable } from '@/components/blocks/Linkable';
import { EXPIRY } from '@/data/constants/payment';
import { useAllowablePaymentMethods } from '@/data/Content/_AllowablePaymentMethods';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import {
	Alert,
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, ChangeEventHandler, FC, useContext } from 'react';
import { ADDRESS_INIT, ADDRESS_SHIPPING_BILLING, makeEditable } from '@/utils/address';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { useForm } from '@/utils/useForm';
import { CheckoutProfilesCreateEditForm } from '@/components/content/CheckoutProfiles/parts/CreateEdit/Form';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { NON_CC_PAYMENTS_BY_CODE } from '@/data/constants/nonCreditCardPayment';
import { REG_EX_NUMBER } from '@/utils/payment';
import { createCheckoutProfilePaperSX } from '@/components/content/CheckoutProfiles/styles/CreateEdit/paper';
import { useCheckoutProfileCreateEdit } from '@/data/Content/_CheckoutProfileCreateEdit';

const EMPTY_ARRAY: any[] = [];
type InputContextType = ReturnType<typeof useCheckoutProfiles> &
	ReturnType<typeof useAllowablePaymentMethods> &
	ReturnType<typeof useCheckoutProfileCreateEdit>;

export const CheckoutProfilesCreateEditBilling: FC = () => {
	const cprofNLS = useLocalization('CheckoutProfile');
	const methodNLS = useLocalization('PaymentMethodSelection');
	const paymentNLS = useLocalization('Payment');
	type payMethodsKeys = keyof typeof cprofNLS.payMethods;
	const {
		checkoutBillingAddresses,
		goToShipping,
		submitCheckoutProfile,
		toggleEditCreateAddress,
		editableAddress,
		getBillingCardActions,
		allowablePaymentMethods = EMPTY_ARRAY,
		profile,
		modifyState,
		billingForm,
		validateCreditCard,
	} = useContext(ContentContext) as InputContextType;

	const {
		handleInputChange,
		values,
		formRef,
		error,
		handleSubmit,
		handleSelectChange,
		onNamedValueChange,
	} = useForm(billingForm);

	const onCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) =>
		onNamedValueChange(
			'billing_nickName',
			event.target.checked ? (profile.shipping_nickName as string) : ''
		);

	const onSubmitWrap = (onSubmit: Parameters<typeof handleSubmit>[0]) => {
		validateCreditCard(values, formRef.current);
		return handleSubmit(onSubmit);
	};

	const onPayment = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
		const name = event.target.name;

		if (name === 'pay_payment_method' && NON_CC_PAYMENTS_BY_CODE[name]) {
			handleSelectChange(event);
		} else {
			if (name === 'pay_account') {
				handleInputChange(event as ChangeEvent<HTMLInputElement>);
			} else {
				handleSelectChange(event);
			}
			validateCreditCard({ ...values, [name]: event.target.value }, formRef.current);
		}
	};

	return editableAddress === null ? (
		<Paper
			component="form"
			onSubmit={onSubmitWrap(submitCheckoutProfile)}
			ref={formRef}
			noValidate
			sx={createCheckoutProfilePaperSX}
		>
			<Stack spacing={2} divider={<Divider />}>
				<Stack gap={2}>
					<Typography variant="h4" component="p">
						{cprofNLS.BillingInformation.t()}
					</Typography>
					<Box>
						<LocalizationWithComponent
							text={cprofNLS.selectExisting.t()}
							components={[
								<Linkable
									type="inline"
									id="checkout-profile-create-address"
									data-testid="checkout-profile-create-address"
									onClick={toggleEditCreateAddress({ ...ADDRESS_INIT })}
									key="1"
								/>,
							]}
						/>
					</Box>
					{profile.shipping_addressType === ADDRESS_SHIPPING_BILLING ? (
						<FormControlLabel
							control={
								<Checkbox
									checked={values.billing_nickName === profile.shipping_nickName}
									id="checkout-profile-ship-same-bill"
									data-testid="checkout-profile-ship-same-bill"
									name="shipSameAsBill"
									autoFocus
									onChange={onCheckBoxChange}
								/>
							}
							label={cprofNLS.ShipSameAsBill.t()}
						/>
					) : null}
					<Input
						required
						name="billing_nickName"
						value={values.billing_nickName}
						sx={{ display: 'none' }}
					/>
					<Grid container spacing={2} alignItems="stretch">
						{(checkoutBillingAddresses as Address[]).map((address) => (
							<Grid item key={address.nickName}>
								<AddressCard
									showType={true}
									address={address}
									actions={getBillingCardActions(
										makeEditable(address),
										values.billing_nickName,
										onNamedValueChange
									)}
									selectedNickName={values.billing_nickName}
								/>
							</Grid>
						))}
					</Grid>
					{error.billing_nickName ? (
						<Alert variant="outlined" severity="error">
							{paymentNLS.Msgs.SelectBillingAddress.t()}
						</Alert>
					) : null}
					<Typography variant="h4" component="p">
						{cprofNLS.PaymentInformation.t()}
					</Typography>
					<FormControl variant="outlined" sx={{ display: 'inline' }}>
						<InputLabel
							id="checkout-profile-payment-method-label"
							required
							error={error.pay_payment_method}
						>
							{methodNLS.Title.t()}
						</InputLabel>

						<Select
							labelId="checkout-profile-payment-method-label"
							value={values.pay_payment_method}
							name="pay_payment_method"
							fullWidth
							id="checkout-profile-payment-method"
							data-testid="checkout-profile-payment-method"
							onChange={onPayment}
							error={error.pay_payment_method}
							required
							displayEmpty
						>
							<MenuItem disabled value="">
								{cprofNLS.selectPaymentMethod.t()}
							</MenuItem>
							{allowablePaymentMethods.map((p) => (
								<MenuItem key={p.policyId} value={p.policyName}>
									{cprofNLS.payMethods[p.policyName as payMethodsKeys].t()}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{values.pay_payment_method && !NON_CC_PAYMENTS_BY_CODE[values.pay_payment_method] ? (
						<Stack spacing={2}>
							<TextField
								required
								name="pay_account"
								id="checkout-profile-pay-account"
								data-testid="checkout-profile-pay-account"
								value={values.pay_account}
								label={methodNLS.Labels.CCNumber.t()}
								type="tel"
								onChange={onPayment as ChangeEventHandler}
								error={error.pay_account}
								helperText={error.pay_account ? methodNLS.Msgs.InvalidCardNumber.t() : EMPTY_STRING}
								inputProps={{ maxLength: 19, pattern: REG_EX_NUMBER.source }}
								fullWidth
							/>
							<Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="checkout-profile-pay-expire-month-label" required>
										{methodNLS.Labels.ExpiryDate.t()}
									</InputLabel>

									<Select
										displayEmpty
										labelId="checkout-profile-pay-expire-month-label"
										data-testid="checkout-profile-pay-expire-month"
										id="checkout-profile-pay-expire-month"
										name="pay_expire_month"
										value={values.pay_expire_month ?? ''}
										error={error.pay_expire_month}
										onChange={onPayment}
										fullWidth
									>
										<MenuItem disabled value="">
											{cprofNLS.selectExpMonth.t()}
										</MenuItem>
										{EXPIRY.MONTHS.map((month) => (
											<MenuItem value={month} key={month}>
												{month}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<FormControl variant="outlined" fullWidth>
									<InputLabel shrink htmlFor="expire_year">
										&nbsp;
									</InputLabel>
									<Select
										required
										displayEmpty
										id="checkout-profile-pay-expire-year"
										data-testid="checkout-profile-pay-expire-year"
										name="pay_expire_year"
										placeholder={cprofNLS.selectExpYear.t()}
										value={values.pay_expire_year ?? ''}
										onChange={onPayment}
										error={error.pay_expire_year}
										inputProps={{ 'aria-label': methodNLS.Labels.ExpiryYear.t() }}
										fullWidth
									>
										<MenuItem disabled value="">
											{cprofNLS.selectExpYear.t()}
										</MenuItem>
										{EXPIRY.YEARS.map((year) => (
											<MenuItem value={year} key={year}>
												{year}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Stack>
						</Stack>
					) : null}
				</Stack>
				<Stack direction="row" justifyContent="space-between" gap={2} flexWrap="wrap">
					<Button
						id="checkout-profile-update-create-back"
						data-testid="checkout-profile-update-create-back"
						variant="outlined"
						color="secondary"
						onClick={goToShipping}
					>
						{cprofNLS.Back.t()}
					</Button>
					<Button
						id="checkout-profile-update-create"
						data-testid="checkout-profile-update-create"
						type="submit"
						variant="contained"
					>
						{modifyState.state === 2 ? cprofNLS.UpdateProfile.t() : cprofNLS.CreateProfile.t()}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	) : (
		<CheckoutProfilesCreateEditForm />
	);
};
