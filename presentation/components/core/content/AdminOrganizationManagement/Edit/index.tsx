/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrganizationManagementStepper } from '@/components/content/AdminOrganizationManagement/parts/Stepper';
import { adminOrganizationManagementPaperSX } from '@/components/content/AdminOrganizationManagement/styles/paper';
import { useAdmin_OrganizationManagementDetails } from '@/data/Content/Admin_OrganizationManagementDetails';
import { useEditOrganizationMemberGroup } from '@/data/Content/EditOrganizationMemberGroup';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ORGANIZATION_MANAGEMENT_EDIT_STEPS } from '@/data/constants/admin_organizationManagement';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';

export const AdminOrganizationManagementEdit: FC<{ id: ID }> = () => {
	const localization = useLocalization('OrganizationManagement');
	const actionTitle = localization.EditOrganization.t();
	const parentPath = useLocalization('Routes').OrganizationManagement.route.t();
	const { query, replace } = useNextRouter();
	const { organizationId: _organizationId } = query;
	const organizationId = useMemo(() => [_organizationId].flat(1).at(-1) ?? '', [_organizationId]);
	const useAdmin_EditOrganizationMemberGroup = useEditOrganizationMemberGroup({ organizationId });
	const { assignedApprovals, approvalTypes } = useAdmin_EditOrganizationMemberGroup;

	const useAdmin_OrganizationManagementCreateOrDetailsValue =
		useAdmin_OrganizationManagementDetails({ organizationId });
	const { initialFieldValues: _initial } = useAdmin_OrganizationManagementCreateOrDetailsValue;
	const initialFieldValues = useMemo(
		() => ({
			..._initial,
			approvalTypes,
			approvals: assignedApprovals,
			selectedApprovals: { ...assignedApprovals },
		}),
		[_initial, assignedApprovals, approvalTypes]
	);
	const contextValue = useMemo(
		() => ({
			useAdmin_OrganizationManagementCreateOrDetailsValue,
			initialFieldValues,
			steps: ORGANIZATION_MANAGEMENT_EDIT_STEPS,
			actionTitle,
			preValidated: true,
		}),
		[actionTitle, initialFieldValues, useAdmin_OrganizationManagementCreateOrDetailsValue]
	);

	useEffect(() => {
		if (!organizationId) {
			replace({ pathname: parentPath }, undefined, { shallow: true });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ContentProvider value={contextValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.OrganizationManagement.t()}</Typography>
				<Paper sx={adminOrganizationManagementPaperSX}>
					<OrganizationManagementStepper />
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
