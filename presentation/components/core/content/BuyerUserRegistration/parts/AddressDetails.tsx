/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { buyerUserRegistrationAutocompleteSX } from '@/components/content/BuyerUserRegistration/styles/autocomplete';
import { buyerUserRegistrationGridLeftSX } from '@/components/content/BuyerUserRegistration/styles/gridLeft';
import { buyerUserRegistrationGridRightSX } from '@/components/content/BuyerUserRegistration/styles/gridRight';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { mapCountryStateOption } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useContext, useMemo, useState } from 'react';

export const BuyerUserRegistrationAddressDetails: FC = () => {
	const localization = useLocalization('BuyerUserRegistration');
	const { handleAutoCompleteInputChange, handleInputChange, values, error } = useContext(
		ContentContext
	) as ReturnType<typeof useForm>;
	const addressFormNLS = useLocalization('AddressForm');
	const { countries } = useCountry();
	const states = useMemo(
		() => countries.find((c) => c.displayName === values.country)?.states ?? [],
		[values.country, countries]
	);
	const [showAddress2, setShowAddress2] = useState<boolean>(false);
	const showAddress = () => setShowAddress2(true);

	return (
		<>
			<Typography variant="h5">{localization.AddressDetails.t()}</Typography>
			<TextField
				required
				inputProps={{ maxLength: 99 }}
				label={localization.Address1.t()}
				name="address1"
				fullWidth
				value={values.address1}
				onChange={handleInputChange}
				error={error.address1}
			/>
			{showAddress2 ? (
				<TextField
					inputProps={{ maxLength: 49 }}
					name="address2"
					fullWidth
					label={localization.Address2.t()}
					value={values.address2}
					error={error.address2}
					onChange={handleInputChange}
				/>
			) : (
				<Button
					onClick={showAddress}
					variant="inline"
					id="add-address-line"
					data-testid="add-address-line"
				>
					{localization.AddressLineAdd.t()}
				</Button>
			)}

			<Grid container>
				<Grid item xs={12} sm={6} sx={buyerUserRegistrationGridLeftSX}>
					<TextField
						required
						inputProps={{ maxLength: 30 }}
						name="zipCode"
						fullWidth
						label={localization.ZipCode.t()}
						value={values.zipCode}
						onChange={handleInputChange}
						error={error.zipCode}
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={buyerUserRegistrationGridRightSX}>
					<Autocomplete
						id="address-form-country-combo-box"
						disableClearable
						freeSolo
						fullWidth
						onInputChange={handleAutoCompleteInputChange('country')}
						options={mapCountryStateOption(countries)}
						value={values?.country as string}
						disablePortal
						sx={buyerUserRegistrationAutocompleteSX}
						renderInput={({ inputProps, ...params }) => (
							<TextField
								required
								name="country"
								error={error.country}
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
				<Grid item xs={12} sm={6} sx={buyerUserRegistrationGridLeftSX}>
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
							value={values?.state}
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
							value={values?.state as string}
							disablePortal
							sx={buyerUserRegistrationAutocompleteSX}
							renderInput={({ inputProps, ...params }) => (
								<TextField
									required
									name="state"
									error={error.state}
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
				<Grid item xs={12} sm={6} sx={buyerUserRegistrationGridRightSX}>
					<TextField
						required
						inputProps={{ maxLength: 40 }}
						name="city"
						fullWidth
						label={localization.City.t()}
						value={values?.city}
						error={error.city}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
		</>
	);
};
