/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { TextField, Typography, Grid } from '@mui/material';
import { FC, useContext } from 'react';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { buyerOrganizationRegistrationGridLeftSX } from '@/components/content/BuyerOrganizationRegistration/styles/gridLeft';
import { buyerOrganizationRegistrationGridRightSX } from '@/components/content/BuyerOrganizationRegistration/styles/gridRight';
import { REG_EX } from '@/utils/address';

export const BuyerOrganizationRegistrationOrganizationDetails: FC = () => {
	const localization = useLocalization('BuyerOrganizationRegistration');
	const { handleInputChange, values, error } = useContext(ContentContext) as ReturnType<
		typeof useForm
	>;

	return (
		<>
			<Typography variant="h4">{localization.Title.t()}</Typography>
			<TextField
				required
				inputProps={{ maxLength: 254 }}
				label={localization.OrganizationName.t()}
				name="org_orgEntityName"
				autoFocus
				variant="outlined"
				value={values?.org_orgEntityName}
				onChange={handleInputChange}
				error={error?.org_orgEntityName}
			/>
			<Grid container>
				<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridLeftSX}>
					<TextField
						required
						label={localization.Email.t()}
						inputProps={{ maxLength: 100, type: 'email', pattern: REG_EX.EMAIL.source }}
						name="org_email1"
						fullWidth
						onChange={handleInputChange}
						value={values?.org_email1}
						error={error?.org_email1}
					/>
				</Grid>
				<Grid item xs={12} sm={6} sx={buyerOrganizationRegistrationGridRightSX}>
					<TextField
						inputProps={{ maxLength: 32, type: 'tel', pattern: REG_EX.PHONE.source }}
						label={localization.Phone.t()}
						name="org_phone1"
						fullWidth
						onChange={handleInputChange}
						value={values?.org_phone1}
						error={error?.org_phone1}
					/>
				</Grid>
			</Grid>
		</>
	);
};
