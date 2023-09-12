/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { TextField, Grid } from '@mui/material';
import { FC, useContext } from 'react';
import { b2bRegistrationGridLeftSX } from '@/components/blocks/B2BRegistration/styles/gridLeft';
import { b2bRegistrationGridRightSX } from '@/components/blocks/B2BRegistration/styles/gridRight';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REG_EX } from '@/utils/address';

type Props = {
	prefix?: string;
};
export const B2BRegistrationUserDetails: FC<Props> = ({ prefix = EMPTY_STRING }) => {
	const localization = useLocalization('BuyerUserRegistration');
	const { handleInputChange, values, error } = useContext(ContentContext) as ReturnType<
		typeof useForm
	>;
	const logonKey = `${prefix}logonId`;
	const firstNameKey = `${prefix}firstName`;
	const lastNameKey = `${prefix}lastName`;
	const logonPasswordKey = `${prefix}logonPassword`;
	const logonPasswordVerifyKey = `${prefix}logonPasswordVerify`;
	const email1Key = `${prefix}email1`;
	const phone1Key = `${prefix}phone1`;

	return (
		<>
			<TextField
				required
				inputProps={{ maxLength: 128 }}
				label={localization.LogonId.t()}
				name={logonKey}
				onChange={handleInputChange}
				value={values?.[logonKey]}
				error={error?.[logonKey]}
			/>
			<Grid container>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridLeftSX}>
					<TextField
						required
						inputProps={{ maxLength: 40 }}
						label={localization.FirstName.t()}
						name={firstNameKey}
						fullWidth
						onChange={handleInputChange}
						value={values?.[firstNameKey]}
						error={error?.[firstNameKey]}
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridRightSX}>
					<TextField
						required
						inputProps={{ maxLength: 40 }}
						label={localization.LastName.t()}
						name={lastNameKey}
						fullWidth
						onChange={handleInputChange}
						value={values?.[lastNameKey]}
						error={error?.[lastNameKey]}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridLeftSX}>
					<PasswordInput
						required
						inputProps={{ maxLength: 100 }}
						label={localization.Password.t()}
						name={logonPasswordKey}
						onChange={handleInputChange}
						value={values?.[logonPasswordKey] as string}
						error={error?.[logonPasswordKey]}
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridRightSX}>
					<PasswordInput
						required
						inputProps={{ maxLength: 100 }}
						label={localization.Password2.t()}
						name={logonPasswordVerifyKey}
						onChange={handleInputChange}
						value={values?.[logonPasswordVerifyKey] as string}
						error={error?.[logonPasswordVerifyKey]}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridLeftSX}>
					<TextField
						required
						label={localization.Email.t()}
						inputProps={{ maxLength: 100, type: 'email', pattern: REG_EX.EMAIL.source }}
						name={email1Key}
						fullWidth
						onChange={handleInputChange}
						value={values?.[email1Key]}
						error={error?.[email1Key]}
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridRightSX}>
					<TextField
						inputProps={{
							maxLength: 32,
							type: 'tel',
							pattern: REG_EX.PHONE.source,
						}}
						label={localization.Phone.t()}
						name={phone1Key}
						fullWidth
						onChange={handleInputChange}
						value={values?.[phone1Key]}
						error={error?.[phone1Key]}
					/>
				</Grid>
			</Grid>
		</>
	);
};
