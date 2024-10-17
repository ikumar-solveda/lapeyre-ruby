/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { accountAutocompleteSX } from '@/components/content/Account/styles/autocomplete';
import { EditablePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { Country, State } from '@/data/types/CountryState';
import { mapCountryStateOption } from '@/utils/address';
import { ErrorState } from '@/utils/useForm';
import {
	Autocomplete,
	AutocompleteInputChangeReason,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, FC, SyntheticEvent } from 'react';

type Props = {
	values: EditablePersonInfo;
	handleAutoCompleteInputChange: (
		name: keyof EditablePersonInfo
	) => (
		_event: SyntheticEvent<Element, Event>,
		value: string,
		_reason: AutocompleteInputChangeReason
	) => void;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error: ErrorState<EditablePersonInfo>;
	countries: Country[];
	states: State[];
};

export const AccountAddressFields: FC<Props> = ({
	values,
	handleAutoCompleteInputChange,
	handleInputChange,
	error,
	countries,
	states,
}) => {
	const MyAccountLabels = useLocalization('MyAccount');
	const addressFormNLS = useLocalization('AddressForm');
	return (
		<Stack spacing={2}>
			<Typography variant="subtitle1" component="h4">
				{MyAccountLabels.AccountAddress.t()}
			</Typography>
			<TextField
				required
				data-testid="address-form-address-line1"
				id="address-form-address-line1"
				name="addressLine1"
				label={addressFormNLS.Labels.Address1.t()}
				onChange={handleInputChange}
				error={error.addressLine1}
				value={values.addressLine1}
				inputProps={{ maxLength: 99 }}
				fullWidth
				autoComplete="address-line1"
			/>
			<TextField
				data-testid="address-form-address-line2"
				id="address-form-address-line2"
				name="addressLine2"
				label={addressFormNLS.Labels.Address2.t()}
				onChange={handleInputChange}
				value={values.addressLine2}
				inputProps={{ maxLength: 49 }}
				fullWidth
				autoComplete="address-line2"
			/>
			<TextField
				required
				id="address-form-city"
				data-testid="address-form-city"
				name="city"
				error={error.city}
				label={addressFormNLS.Labels.City.t()}
				onChange={handleInputChange}
				value={values.city}
				inputProps={{ maxLength: 40 }}
				fullWidth
				autoComplete="address-level2"
			/>
			<Autocomplete
				id="address-form-country-combo-box"
				disableClearable
				freeSolo
				fullWidth
				onInputChange={handleAutoCompleteInputChange('country')}
				options={mapCountryStateOption(countries)}
				value={values.country}
				disablePortal
				sx={accountAutocompleteSX}
				renderInput={({ inputProps, ...params }) => (
					<TextField
						required
						name="country"
						error={error.country}
						inputProps={{ ...inputProps, 'data-testid': 'address-form-country-combo-box' }}
						{...params}
						label={addressFormNLS.Labels.Country.t()}
						autoComplete="country-name"
					/>
				)}
			/>
			{states.length === 0 ? (
				<TextField
					required
					data-testid="state-textfield"
					id="state-textfield"
					name="state"
					error={error.state}
					label={addressFormNLS.Labels.State.t()}
					autoComplete="address-level1"
					onChange={handleInputChange}
					value={values.state}
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
					options={mapCountryStateOption(states)}
					value={values.state}
					disablePortal
					sx={accountAutocompleteSX}
					renderInput={({ inputProps, ...params }) => (
						<TextField
							required
							name="state"
							error={error.state}
							inputProps={{ ...inputProps, 'data-testid': 'address-form-state-combo-box' }}
							{...params}
							label={addressFormNLS.Labels.State.t()}
							autoComplete="address-level1"
						/>
					)}
				/>
			)}
			<TextField
				required
				id="address-form-zipCode"
				name="zipCode"
				data-testid="address-form-zipCode"
				label={addressFormNLS.Labels.ZipCode.t()}
				onChange={handleInputChange}
				error={error.zipCode}
				value={values.zipCode}
				inputProps={{ maxLength: 30 }}
				fullWidth
				autoComplete="postal-code"
			/>
		</Stack>
	);
};
