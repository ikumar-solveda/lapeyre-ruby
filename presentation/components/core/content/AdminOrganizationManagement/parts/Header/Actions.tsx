/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { ORGANIZATION } from '@/data/constants/admin_organizationManagement';
import { FC } from 'react';

export const AdminOrganizationManagementHeaderActions: FC = () => {
	const route = useLocalization('Routes').OrganizationManagementCreate.route;
	const localization = useLocalization('OrganizationManagement');

	return (
		<Linkable
			type="button"
			id={`${ORGANIZATION}-add-new`}
			data-testid={`${ORGANIZATION}-add-new`}
			variant="contained"
			href={route.t()}
			fullWidth
		>
			{localization.NewOrganizationButtonText.t()}
		</Linkable>
	);
};
