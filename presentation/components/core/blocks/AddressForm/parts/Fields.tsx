/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { addressFormFieldsSX } from '@/components/blocks/AddressForm/styles/fields';
import { ErrorState } from '@/utils/useForm';
import { useLocalization } from '@/data/Localization';
import { EditableAddress } from '@/data/types/Address';
import { Country, State } from '@/data/types/CountryState';
import {
	REG_EX,
	ADDRESS_SHIPPING,
	ADDRESS_BILLING,
	ADDRESS_SHIPPING_BILLING,
	mapCountryStateOption,
} from '@/utils/address';
import {
	Grid,
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Autocomplete,
	AutocompleteInputChangeReason,
	Stack,
} from '@mui/material';
import { ChangeEvent, FC, SyntheticEvent } from 'react';

type Props = {
	nickNameDisabled: boolean;
	address: EditableAddress;
	handleAutoCompleteInputChange: (
		name: keyof EditableAddress
	) => (
		_event: SyntheticEvent<Element, Event>,
		value: string,
		_reason: AutocompleteInputChangeReason
	) => void;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error: ErrorState<EditableAddress>;
	countries: Country[];
	states: State[];
	helperText: { [k: string]: string };
	showAddressType: boolean;
	formLabel?: JSX.Element;
};

export const AddressFormFields: FC<Props> = ({
	address,
	handleAutoCompleteInputChange,
	handleChange,
	error,
	countries,
	states,
	helperText,
	showAddressType,
	nickNameDisabled = false,
	formLabel = null,
}) => {
	const addressFormNLS = useLocalization('AddressForm');

	return (
		<Stack sx={addressFormFieldsSX}>
			{formLabel}
			<Grid item container spacing={3} sm={12} md={6}>
				<Grid item xs={12}>
					<TextField
						data-testid="nickName"
						id="address-form-nickName"
						name="nickName"
						label={addressFormNLS.Labels.NickName.t()}
						onChange={handleChange}
						value={address.nickName}
						inputProps={{
							required: true,
							maxLength: 128,
							pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
						}}
						fullWidth
						autoComplete="nickname"
						required
						autoFocus={!nickNameDisabled}
						error={error.nickName}
						disabled={nickNameDisabled}
						helperText={helperText.nickName}
					/>
				</Grid>
				{showAddressType ? (
					<Grid item xs={12}>
						<FormControl>
							<FormLabel id="address-form-address-type-label">
								{addressFormNLS.Labels.AddressType.t()}
							</FormLabel>
							<RadioGroup
								aria-labelledby="address-form-address-type-label"
								name="addressType"
								data-testid="addressType"
								id="addressType"
								value={address.addressType}
								onChange={handleChange}
							>
								<FormControlLabel
									data-testid="addressType-shipping"
									id="addressType-shipping"
									value={ADDRESS_SHIPPING}
									control={<Radio />}
									label={addressFormNLS.Labels.Shipping.t()}
								/>
								<FormControlLabel
									data-testid="addressType-billing"
									id="addressType-billing"
									value={ADDRESS_BILLING}
									control={<Radio />}
									label={addressFormNLS.Labels.Billing.t()}
								/>
								<FormControlLabel
									data-testid="addressType-shipping-billing"
									id="addressType-shipping-billing"
									value={ADDRESS_SHIPPING_BILLING}
									control={<Radio />}
									label={addressFormNLS.Labels.ShippingAndBilling.t()}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				) : null}
				<Grid item xs={12} sm={6}>
					<TextField
						id="address-form-firstName"
						data-testid="firstName"
						name="firstName"
						label={addressFormNLS.Labels.FirstName.t()}
						onChange={handleChange}
						value={address.firstName}
						inputProps={{ maxLength: 40 }}
						fullWidth
						autoFocus={nickNameDisabled}
						error={error.firstName}
						autoComplete="given-name"
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="address-form-lastName"
						data-testid="lastName"
						name="lastName"
						error={error.lastName}
						label={addressFormNLS.Labels.LastName.t()}
						onChange={handleChange}
						value={address.lastName}
						inputProps={{ maxLength: 40 }}
						fullWidth
						autoComplete="family-name"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						data-testid="address1"
						id="address-form-address-line1"
						name="addressLine1"
						label={addressFormNLS.Labels.Address1.t()}
						onChange={handleChange}
						error={error.addressLine1}
						value={address.addressLine1}
						inputProps={{ maxLength: 99 }}
						fullWidth
						autoComplete="address-line1"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						data-testid="address2"
						id="address-form-address-line2"
						name="addressLine2"
						label={addressFormNLS.Labels.Address2.t()}
						onChange={handleChange}
						value={address.addressLine2}
						inputProps={{ maxLength: 49 }}
						fullWidth
						autoComplete="address-line2"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="address-form-city"
						data-testid="city"
						name="city"
						error={error.city}
						label={addressFormNLS.Labels.City.t()}
						onChange={handleChange}
						value={address.city}
						inputProps={{ maxLength: 40 }}
						fullWidth
						autoComplete="address-level2"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Autocomplete
						id="address-form-country-combo-box"
						disableClearable
						freeSolo
						fullWidth
						onInputChange={handleAutoCompleteInputChange('country')}
						data-testid="country-autocomplete"
						options={mapCountryStateOption(countries)}
						value={address.country}
						renderInput={(params) => (
							<TextField
								required
								data-testid="country-textfield"
								name="country"
								error={error.country}
								{...params}
								label={addressFormNLS.Labels.Country.t()}
								autoComplete="country-name"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{states.length === 0 ? (
						<TextField
							required
							data-testid="state-textfield"
							id="state-textfield"
							name="state"
							error={error.state}
							label={addressFormNLS.Labels.State.t()}
							autoComplete="address-level1"
							onChange={handleChange}
							value={address.state}
							inputProps={{ maxLength: 40 }}
							fullWidth
						/>
					) : (
						<Autocomplete
							id="address-form-state-combo-box"
							freeSolo
							disableClearable
							fullWidth
							onInputChange={handleAutoCompleteInputChange('state')}
							data-testid="state-autocomplete"
							options={mapCountryStateOption(states)}
							value={address.state}
							renderInput={(params) => (
								<TextField
									required
									data-testid="state-textfield"
									name="state"
									error={error.state}
									{...params}
									label={addressFormNLS.Labels.State.t()}
									autoComplete="address-level1"
								/>
							)}
						/>
					)}
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="address-form-zipCode"
						name="zipCode"
						data-testid="zipcode"
						label={addressFormNLS.Labels.ZipCode.t()}
						onChange={handleChange}
						error={error.zipCode}
						value={address.zipCode}
						inputProps={{ maxLength: 30 }}
						fullWidth
						autoComplete="postal-code"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="address-form-phone1"
						name="phone1"
						type="tel"
						data-testid="phone"
						label={addressFormNLS.Labels.Phone.t()}
						onChange={handleChange}
						value={address.phone1}
						error={error.phone1}
						helperText={helperText.phone1}
						inputProps={{ maxLength: 32, pattern: REG_EX.PHONE.source }}
						fullWidth
						autoComplete="tel"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="address-form-email"
						data-testid="email"
						name="email1"
						type="email"
						label={addressFormNLS.Labels.Email.t()}
						onChange={handleChange}
						value={address.email1}
						error={error.email1}
						helperText={helperText.email1}
						inputProps={{ maxLength: 35, pattern: REG_EX.EMAIL.source }}
						fullWidth
						autoComplete="email"
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};
