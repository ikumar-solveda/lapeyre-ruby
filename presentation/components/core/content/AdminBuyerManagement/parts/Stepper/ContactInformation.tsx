/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { adminBuyerManagementAutocompleteSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/autocomplete';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { mapCountryStateOption } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const AdminBuyerManagementStepperContactInformation: FC = () => {
	const localization = useLocalization('BuyerManagement').ContactLabels;
	const { stepperFormValue } = useContext(ContentContext) as unknown as {
		stepperFormValue: ReturnType<typeof useForm<AdminBuyerRegistrationValueType>>;
	};
	const { handleAutoCompleteInputChange, handleInputChange, values, error } = stepperFormValue;
	const { countries } = useCountry();
	const states = useMemo(
		() => countries.find((c) => c.displayName === values?.country)?.states ?? [],
		[values?.country, countries]
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-address1`}
					id={`${BUYER_MANAGEMENT}-address1`}
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.address1 }}
					label={localization.AddressLine1.t()}
					name="address1"
					fullWidth
					value={values?.address1}
					onChange={handleInputChange}
					error={error?.address1}
					autoComplete="address-line1"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-address2`}
					id={`${BUYER_MANAGEMENT}-address2`}
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.address2 }}
					name="address2"
					fullWidth
					label={localization.AddressLine2.t()}
					value={values?.address2}
					error={error?.address2}
					onChange={handleInputChange}
					autoComplete="address-line2"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Autocomplete
					data-testid={`${BUYER_MANAGEMENT}-address-form-country-combo-box`}
					id={`${BUYER_MANAGEMENT}-address-form-country-combo-box`}
					disableClearable
					freeSolo
					fullWidth
					onInputChange={handleAutoCompleteInputChange('country')}
					options={mapCountryStateOption(countries)}
					value={values?.country as string}
					disablePortal
					sx={adminBuyerManagementAutocompleteSX}
					renderInput={({ inputProps, ...params }) => (
						<TextField
							required
							name="country"
							autoComplete="country"
							error={error?.country}
							inputProps={{
								...inputProps,
								'data-testid': 'address-form-country-combo-box',
								maxLength: ADDRESS_FIELD_LENGTH.country,
							}}
							{...params}
							label={localization.Country.t()}
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				{states.length === 0 ? (
					<TextField
						required
						data-testid={`${BUYER_MANAGEMENT}-state-textfield`}
						id={`${BUYER_MANAGEMENT}-state-textfield`}
						name="state"
						error={error?.state}
						label={localization.State.t()}
						autoComplete="address-level1"
						onChange={handleInputChange}
						value={values?.state}
						inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.state }}
						fullWidth
					/>
				) : (
					<Autocomplete
						data-testid={`${BUYER_MANAGEMENT}-address-form-state-combo-box`}
						id={`${BUYER_MANAGEMENT}-address-form-state-combo-box`}
						freeSolo
						disableClearable
						fullWidth
						onInputChange={handleAutoCompleteInputChange('state')}
						options={mapCountryStateOption(states)}
						value={values?.state as string}
						disablePortal
						sx={adminBuyerManagementAutocompleteSX}
						renderInput={({ inputProps, ...params }) => (
							<TextField
								required
								name="state"
								autoComplete="address-level1"
								error={error?.state}
								inputProps={{
									...inputProps,
									'data-testid': 'address-form-state-combo-box',
									maxLength: ADDRESS_FIELD_LENGTH.state,
								}}
								{...params}
								label={localization.State.t()}
							/>
						)}
					/>
				)}
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-city`}
					id={`${BUYER_MANAGEMENT}-city`}
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.city }}
					name="city"
					fullWidth
					label={localization.City.t()}
					value={values?.city}
					error={error?.city}
					onChange={handleInputChange}
					autoComplete="address-level2"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-zipCode`}
					id={`${BUYER_MANAGEMENT}-zipCode`}
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.zipCode }}
					name="zipCode"
					fullWidth
					label={localization.ZipCode.t()}
					value={values?.zipCode}
					onChange={handleInputChange}
					error={error?.zipCode}
					autoComplete="postal-code"
				/>
			</Grid>
		</Grid>
	);
};
