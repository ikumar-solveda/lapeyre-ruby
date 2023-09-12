/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { buyerOrganizationRegistrationAutocompleteSX } from '@/components/content/BuyerOrganizationRegistration/styles/autocomplete';
import { buyerOrganizationRegistrationGridLeftSX } from '@/components/content/BuyerOrganizationRegistration/styles/gridLeft';
import { buyerOrganizationRegistrationGridRightSX } from '@/components/content/BuyerOrganizationRegistration/styles/gridRight';
import { useBuyerOrganizationRegistration } from '@/data/Content/BuyerOrganizationRegistration';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { mapCountryStateOption } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, FC, useContext, useMemo } from 'react';

type Props = {
	isAdminReg?: boolean;
};

export const BuyerOrganizationRegistrationAddressDetails: FC<Props> = ({ isAdminReg = false }) => {
	const localization = useLocalization('BuyerOrganizationRegistration');
	const addressFormNLS = useLocalization('AddressForm');
	const { handleAutoCompleteInputChange, handleInputChange, values, error } = useContext(
		ContentContext
	) as ReturnType<typeof useForm>;
	const { countries } = useCountry();
	const org_states = useMemo(
		() => countries.find((c) => c.displayName === values.org_country)?.states ?? [],
		[values.org_country, countries]
	);

	const usr_states = useMemo(
		() => countries.find((c) => c.displayName === values.usr_country)?.states ?? [],
		[values.usr_country, countries]
	);

	const { checked, setChecked } = useContext(ContentContext) as ReturnType<
		typeof useBuyerOrganizationRegistration
	>;
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

	return (
		<>
			{isAdminReg ? (
				<>
					<Grid container justifyContent="space-between" alignItems="center">
						<Typography variant="h5">{localization.AddressDetails.t()}</Typography>
						<FormControlLabel
							label={localization.UseOrganizationAddress.t()}
							control={<Checkbox checked={checked} onChange={handleChange} />}
						/>
					</Grid>
					{!checked ? (
						<>
							<TextField
								required
								inputProps={{ maxLength: 99 }}
								label={localization.Address1.t()}
								name="usr_address1"
								fullWidth
								value={values.usr_address1}
								onChange={handleInputChange}
								error={error.usr_address1}
							/>
							<TextField
								inputProps={{ maxLength: 49 }}
								name="usr_address2"
								fullWidth
								label={localization.Address2.t()}
								value={values.usr_address2}
								error={error.usr_address2}
								onChange={handleInputChange}
							/>
							<Grid container>
								<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridLeftSX}>
									<TextField
										required
										inputProps={{ maxLength: 30 }}
										name="usr_zipCode"
										fullWidth
										label={localization.ZipCodePostalCode.t()}
										value={values.usr_zipCode}
										onChange={handleInputChange}
										error={error.usr_zipCode}
									/>
								</Grid>
								<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridRightSX}>
									<Autocomplete
										id="address-form-country-combo-box"
										disableClearable
										freeSolo
										fullWidth
										onInputChange={handleAutoCompleteInputChange('usr_country')}
										options={mapCountryStateOption(countries)}
										value={values?.usr_country as string}
										disablePortal
										sx={buyerOrganizationRegistrationAutocompleteSX}
										renderInput={({ inputProps, ...params }) => (
											<TextField
												required
												name="usr_country"
												error={error.usr_country}
												inputProps={{
													...inputProps,
													'data-testid': 'address-form-country-combo-box',
												}}
												{...params}
												label={addressFormNLS.Labels.Country.t()}
												autoComplete="country-name"
											/>
										)}
									/>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridLeftSX}>
									{usr_states.length === 0 ? (
										<TextField
											required
											data-testid="state-textfield"
											id="state-textfield"
											name="usr_state"
											error={error.usr_state}
											label={addressFormNLS.Labels.State.t()}
											autoComplete="address-level1"
											onChange={handleInputChange}
											value={values?.usr_state}
											inputProps={{ maxLength: 40 }}
											fullWidth
										/>
									) : (
										<Autocomplete
											id="address-form-state-combo-box"
											freeSolo
											disableClearable
											fullWidth
											onInputChange={handleAutoCompleteInputChange('usr_state')}
											options={mapCountryStateOption(usr_states)}
											value={values?.usr_state as string}
											disablePortal
											sx={buyerOrganizationRegistrationAutocompleteSX}
											renderInput={({ inputProps, ...params }) => (
												<TextField
													required
													name="usr_state"
													error={error.usr_state}
													inputProps={{
														...inputProps,
														'data-testid': 'address-form-state-combo-box',
													}}
													{...params}
													label={addressFormNLS.Labels.State.t()}
													autoComplete="address-level1"
												/>
											)}
										/>
									)}
								</Grid>
								<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridRightSX}>
									<TextField
										required
										inputProps={{ maxLength: 40 }}
										name="usr_city"
										fullWidth
										label={localization.City.t()}
										value={values?.usr_city}
										error={error.usr_city}
										onChange={handleInputChange}
									/>
								</Grid>
							</Grid>
						</>
					) : null}
				</>
			) : (
				<>
					<Typography variant="h5">{localization.AddressDetails.t()}</Typography>
					<TextField
						required
						inputProps={{ maxLength: 99 }}
						label={localization.Address1.t()}
						name="org_address1"
						fullWidth
						value={values.org_address1}
						onChange={handleInputChange}
						error={error.org_address1}
					/>
					<TextField
						inputProps={{ maxLength: 49 }}
						name="org_address2"
						fullWidth
						label={localization.Address2.t()}
						value={values.org_address2}
						error={error.org_address2}
						onChange={handleInputChange}
					/>
					<Grid container>
						<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridLeftSX}>
							<TextField
								required
								inputProps={{ maxLength: 30 }}
								name="org_zipCode"
								fullWidth
								label={localization.ZipCodePostalCode.t()}
								value={values.org_zipCode}
								onChange={handleInputChange}
								error={error.org_zipCode}
							/>
						</Grid>
						<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridRightSX}>
							<Autocomplete
								id="address-form-country-combo-box"
								disableClearable
								freeSolo
								fullWidth
								onInputChange={handleAutoCompleteInputChange('org_country')}
								options={mapCountryStateOption(countries)}
								value={values?.org_country as string}
								disablePortal
								sx={buyerOrganizationRegistrationAutocompleteSX}
								renderInput={({ inputProps, ...params }) => (
									<TextField
										required
										name="org_country"
										error={error.org_country}
										inputProps={{
											...inputProps,
											'data-testid': 'address-form-country-combo-box',
										}}
										{...params}
										label={addressFormNLS.Labels.Country.t()}
										autoComplete="country-name"
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridLeftSX}>
							{org_states.length === 0 ? (
								<TextField
									required
									data-testid="state-textfield"
									id="state-textfield"
									name="org_state"
									error={error.org_state}
									label={addressFormNLS.Labels.State.t()}
									autoComplete="address-level1"
									onChange={handleInputChange}
									value={values?.org_state}
									inputProps={{ maxLength: 40 }}
									fullWidth
								/>
							) : (
								<Autocomplete
									id="address-form-state-combo-box"
									freeSolo
									disableClearable
									fullWidth
									onInputChange={handleAutoCompleteInputChange('org_state')}
									options={mapCountryStateOption(org_states)}
									value={values?.org_state as string}
									disablePortal
									sx={buyerOrganizationRegistrationAutocompleteSX}
									renderInput={({ inputProps, ...params }) => (
										<TextField
											required
											name="org_state"
											error={error.org_state}
											inputProps={{
												...inputProps,
												'data-testid': 'address-form-state-combo-box',
											}}
											{...params}
											label={addressFormNLS.Labels.State.t()}
											autoComplete="address-level1"
										/>
									)}
								/>
							)}
						</Grid>
						<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridRightSX}>
							<TextField
								required
								inputProps={{ maxLength: 40 }}
								name="org_city"
								fullWidth
								label={localization.City.t()}
								value={values?.org_city}
								error={error.org_city}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};
