/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { adminOrganizationManagementStepperActionsStack } from '@/components/content/AdminOrganizationManagement/styles/Stepper/actionsStack';
import { adminOrganizationManagementStepperActionsTitleSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/actionsTitle';
import { useLocalization } from '@/data/Localization';
import { ORGANIZATION } from '@/data/constants/admin_organizationManagement';
import { ContentContext } from '@/data/context/content';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminOrganizationManagementStepperActions: FC = () => {
	const localization = useLocalization('OrganizationManagement');
	const { actionTitle } = useContext(ContentContext) as { actionTitle: string };
	const parentPath = useLocalization('Routes').OrganizationManagement.route.t();
	return (
		<Stack {...adminOrganizationManagementStepperActionsStack}>
			<Typography variant="h4" sx={adminOrganizationManagementStepperActionsTitleSX}>
				{actionTitle}
			</Typography>
			<Stack direction="row" spacing={1}>
				<Linkable
					type="button"
					id={`${ORGANIZATION}-cancel`}
					data-testid={`${ORGANIZATION}-cancel`}
					variant="outlined"
					href={parentPath}
					fullWidth
				>
					{localization.CancelButton.t()}
				</Linkable>
				<Button
					type="submit"
					variant="contained"
					data-testid={`${ORGANIZATION}-finish-button`}
					id={`${ORGANIZATION}-finish-button`}
				>
					{localization.FinishButton.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
