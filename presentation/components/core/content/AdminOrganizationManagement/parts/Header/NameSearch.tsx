/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useAdmin_OrganizationManagement } from '@/data/Content/Admin_OrganizationManagement';
import { useLocalization } from '@/data/Localization';
import { initialSearchValues } from '@/data/constants/admin_organizationManagement';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { TextField } from '@mui/material';
import { ChangeEvent, FC, useCallback, useContext } from 'react';

export const AdminOrganizationManagementNameSearch: FC = () => {
	const { searchFormValue, useAdmin_OrganizationManagementValue } = useContext(ContentContext) as {
		useAdmin_OrganizationManagementValue: ReturnType<typeof useAdmin_OrganizationManagement>;
		searchFormValue: ReturnType<typeof useForm<typeof initialSearchValues>>;
	};
	const { onDebouncedSearch } = useAdmin_OrganizationManagementValue;
	const { values, handleInputChange } = searchFormValue;
	const localization = useLocalization('OrganizationManagement');
	const onOrg = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			handleInputChange(event);
			onDebouncedSearch({ [event.target.name]: event.target.value } as typeof values);
		},
		[handleInputChange, onDebouncedSearch]
	);

	return (
		<TextField
			data-testid="organization-name"
			id="organization-name"
			name="orgName"
			placeholder={localization.NameSearchPlaceholder.t()}
			fullWidth
			onChange={onOrg}
			value={values.orgName}
			inputProps={{ maxLength: 128 }}
		/>
	);
};
