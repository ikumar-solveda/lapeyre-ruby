/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useLocalization } from '@/data/Localization';
import { Button } from '@mui/material';
import { FC } from 'react';

export const AdminOrganizationManagementHeaderClear: FC = () => {
	const { ClearResults } = useLocalization('OrganizationManagement');
	return (
		<Button
			id="organization-management-clear-results"
			data-testid="organization-management-clear-results"
			variant="contained"
			type="reset"
			fullWidth
		>
			{ClearResults.t()}
		</Button>
	);
};
