/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { adminOrganizationManagementAutocompleteSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/autocomplete';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { ORGANIZATION } from '@/data/constants/admin_organizationManagement';
import { ContentContext } from '@/data/context/content';
import { AdminOrganizationRegistration } from '@/data/types/Admin_OrganizationManagement';
import { REG_EX, mapCountryStateOption } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const AdminOrganizationManagementStepperContactInformation: FC = () => {
	const localization = useLocalization('OrganizationManagement');
	const { countries } = useCountry();
	const { stepperFormValue } = useContext(ContentContext) as {
		stepperFormValue: ReturnType<typeof useForm<AdminOrganizationRegistration>>;
	};
	const { handleInputChange, handleAutoCompleteInputChange, values, error } = stepperFormValue;
	const states = useMemo(
		() => countries.find((c) => c.displayName === values?.country)?.states ?? [],
		[values?.country, countries]
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.firstName }}
					label={localization.ContactFirstName.t()}
					name="administratorFirstName"
					autoComplete="given-name"
					value={values?.administratorFirstName}
					onChange={handleInputChange}
					error={error?.administratorFirstName}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.lastName }}
					label={localization.ContactLastName.t()}
					name="administratorLastName"
					autoComplete="family-name"
					value={values?.administratorLastName}
					onChange={handleInputChange}
					error={error?.administratorLastName}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					required
					id={`${ORGANIZATION}-contact-email`}
					data-testid={`${ORGANIZATION}-contact-email`}
					name="email1"
					label={localization.ContactEmail.t()}
					type="email"
					fullWidth
					autoComplete="email"
					value={values?.email1}
					onChange={handleInputChange}
					error={error?.email1}
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.email1, pattern: REG_EX.EMAIL.source }}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.address1 }}
					label={localization.StreetAddressLine1.t()}
					name="address1"
					id={`${ORGANIZATION}-address1`}
					data-testid={`${ORGANIZATION}-address1`}
					value={values?.address1}
					onChange={handleInputChange}
					error={error?.address1}
					autoComplete="address-line1"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.address2 }}
					label={localization.StreetAddressLine2.t()}
					name="address2"
					id={`${ORGANIZATION}-address2`}
					data-testid={`${ORGANIZATION}-address2`}
					value={values?.address2}
					onChange={handleInputChange}
					error={error?.address2}
					autoComplete="address-line2"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Autocomplete
					id={`${ORGANIZATION}-address-form-country-combo-box`}
					data-testid={`${ORGANIZATION}-address-form-country-combo-box`}
					disableClearable
					freeSolo
					fullWidth
					options={mapCountryStateOption(countries)}
					disablePortal
					sx={adminOrganizationManagementAutocompleteSX}
					value={values?.country as string}
					onInputChange={handleAutoCompleteInputChange('country')}
					renderInput={({ inputProps, ...params }) => (
						<TextField
							required
							name="country"
							error={error?.country}
							inputProps={{
								...inputProps,
								'data-testid': `${ORGANIZATION}-address-form-country-combo-box`,
								maxLength: ADDRESS_FIELD_LENGTH.country,
							}}
							{...params}
							label={localization.Country.t()}
							autoComplete="country"
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				{states.length === 0 ? (
					<TextField
						fullWidth
						inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.state }}
						label={localization.StateProvinceRegion.t()}
						name="state"
						required
						id={`${ORGANIZATION}-state`}
						data-testid={`${ORGANIZATION}-state`}
						value={values?.state}
						onChange={handleInputChange}
						error={error?.state}
						autoComplete="address-level1"
					/>
				) : (
					<Autocomplete
						data-testid={`${ORGANIZATION}-address-form-state-combo-box`}
						id={`${ORGANIZATION}-address-form-state-combo-box`}
						freeSolo
						disableClearable
						fullWidth
						onInputChange={handleAutoCompleteInputChange('state')}
						options={mapCountryStateOption(states)}
						value={values?.state as string}
						disablePortal
						sx={adminOrganizationManagementAutocompleteSX}
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
								label={localization.StateProvinceRegion.t()}
							/>
						)}
					/>
				)}
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.city }}
					label={localization.City.t()}
					name="city"
					id={`${ORGANIZATION}-city`}
					data-testid={`${ORGANIZATION}-city`}
					value={values?.city}
					onChange={handleInputChange}
					error={error?.city}
					autoComplete="address-level2"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.zipCode }}
					label={localization.ZipCode.t()}
					name="zipCode"
					id={`${ORGANIZATION}-zipcode`}
					data-testid={`${ORGANIZATION}-zipcode`}
					value={values?.zipCode}
					onChange={handleInputChange}
					error={error?.zipCode}
					autoComplete="postal-code"
				/>
			</Grid>
		</Grid>
	);
};
