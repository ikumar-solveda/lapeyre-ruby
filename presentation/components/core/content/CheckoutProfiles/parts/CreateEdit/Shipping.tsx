/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { Linkable } from '@/components/blocks/Linkable';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import {
	Grid,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Select,
	Button,
	Typography,
	Divider,
	Input,
	Box,
	Stack,
	Alert,
	MenuItem,
} from '@mui/material';
import { FC, useContext } from 'react';
import { ADDRESS_INIT, makeEditable } from '@/utils/address';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { createCheckoutProfilePaperSX } from '@/components/content/CheckoutProfiles/styles/CreateEdit/paper';
import { CheckoutProfilesCreateEditForm } from '@/components/content/CheckoutProfiles/parts/CreateEdit/Form';
import { useForm } from '@/utils/useForm';
import { useCheckoutProfileCreateEdit } from '@/data/Content/_CheckoutProfileCreateEdit';

const EMPTY_MODES: ReturnType<typeof useAllowableShippingModes>['allowableShippingModes'] = {};
type InputContextType = ReturnType<typeof useCheckoutProfiles> &
	ReturnType<typeof useAllowableShippingModes> &
	ReturnType<typeof useCheckoutProfileCreateEdit>;

export const CheckoutProfilesCreateEditShipping: FC = () => {
	const localization = useLocalization('CheckoutProfile');
	const paymentNLS = useLocalization('Payment');
	const {
		checkoutShippingAddresses,
		allowableShippingModes = EMPTY_MODES,
		getShippingCardActions,
		goToBilling,
		onCancel,
		toggleEditCreateAddress,
		editableAddress,
		shippingForm,
		modifyState,
	} = useContext(ContentContext) as InputContextType;
	const {
		handleInputChange,
		values,
		formRef,
		error,
		handleSubmit,
		onNamedValueChange,
		handleSelectChange,
	} = useForm(shippingForm);

	return editableAddress === null ? (
		<Paper
			sx={createCheckoutProfilePaperSX}
			component="form"
			onSubmit={handleSubmit(goToBilling)}
			ref={formRef}
			noValidate
		>
			<Stack spacing={2} divider={<Divider />}>
				<Stack gap={2}>
					{modifyState.state === 1 ? (
						<Typography variant="h4" component="p">
							{localization.CreateMessage.t()}
						</Typography>
					) : null}
					<TextField
						required
						label={localization.Name.t()}
						inputProps={{ maxLength: 99 }}
						fullWidth
						autoComplete="profileName"
						id="checkout-profile-name"
						data-testid="checkout-profile-name"
						name="profileName"
						autoFocus={modifyState.state === 1}
						disabled={modifyState.state === 2}
						value={values.profileName}
						onChange={handleInputChange}
						error={error.profileName}
					/>
					<Typography variant="h4" component="p">
						{localization.ShippingInformation.t()}
					</Typography>
					<FormControl variant="outlined" sx={{ display: 'inline' }}>
						<InputLabel shrink id="ship-methods-label" required error={error.shipping_modeId}>
							{localization.ShippingMethod.t()}
						</InputLabel>
						<Select
							labelId="ship-methods-label"
							fullWidth
							required
							name="shipping_modeId"
							id="checkout-profile-shipping-method"
							data-testid="checkout-profile-shipping-method"
							value={values.shipping_modeId}
							onChange={handleSelectChange}
							error={error.shipping_modeId}
							displayEmpty
						>
							<MenuItem disabled value="">
								{localization.selectShippingMethod.t()}
							</MenuItem>
							{Object.entries(allowableShippingModes).map(([key, value]) => (
								<MenuItem key={key} value={key}>
									{value.shipModeDescription}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Box>
						<LocalizationWithComponent
							text={localization.selectExisting.t()}
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
					<Input
						// hidden element to satisfy form
						required
						name="shipping_nickName"
						value={values.shipping_nickName}
						sx={{ display: 'none' }}
					/>
					<Grid container spacing={2} alignItems="stretch">
						{(checkoutShippingAddresses as Address[]).map((address) => (
							<Grid item key={address.nickName}>
								<AddressCard
									showType={true}
									address={address}
									actions={getShippingCardActions(
										makeEditable(address),
										values.shipping_nickName as string,
										onNamedValueChange
									)}
									selectedNickName={values.shipping_nickName}
								/>
							</Grid>
						))}
					</Grid>
					{error.shipping_nickName ? (
						<Alert variant="outlined" severity="error">
							{paymentNLS.Msgs.SelectShippingAddress.t()}
						</Alert>
					) : null}
				</Stack>
				<Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
					<Button
						id="checkout-profile-ship-cancel"
						data-testid="checkout-profile-ship-cancel"
						variant="outlined"
						color="secondary"
						onClick={onCancel}
					>
						{localization.Cancel.t()}
					</Button>
					<Button
						id="checkout-profile-ship-continue"
						data-testid="checkout-profile-ship-continue"
						variant="contained"
						type="submit"
					>
						{localization.Next.t()}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	) : (
		<CheckoutProfilesCreateEditForm />
	);
};
