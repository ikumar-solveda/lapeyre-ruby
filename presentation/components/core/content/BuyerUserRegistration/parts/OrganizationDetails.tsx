/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { TextField, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { BuyerUserRegistrationUserDetails } from '@/components/content/BuyerUserRegistration/parts/UserDetails';

export const BuyerUserRegistrationOrganizationDetails: FC = () => {
	const localization = useLocalization('BuyerUserRegistration');
	const { handleInputChange, values, error } = useContext(ContentContext) as ReturnType<
		typeof useForm
	>;

	return (
		<>
			<Typography variant="pageTitle">{localization.Title.t()}</Typography>
			<TextField
				required
				inputProps={{ maxLength: 254 }}
				label={localization.OrgName.t()}
				name="orgName"
				autoFocus
				variant="outlined"
				value={values?.orgName}
				onChange={handleInputChange}
				error={error?.orgName}
			/>
			<BuyerUserRegistrationUserDetails />
		</>
	);
};
