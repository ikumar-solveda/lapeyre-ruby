/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationManagementStepperContextValue } from '@/components/content/AdminOrganizationManagement/parts/Stepper';
import { adminOrganizationManagementStepperApprovalsHeaderSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/approvalsHeader';
import { adminOrganizationManagementStepperApprovalsSelectionStack } from '@/components/content/AdminOrganizationManagement/styles/Stepper/approvalsSelectionStack';
import { adminOrganizationManagementStepperApprovalsStack } from '@/components/content/AdminOrganizationManagement/styles/Stepper/approvalsStack';
import { adminOrganizationManagementStepperRolesAndApprovalsChipSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/rolesAndApprovalsChip';
import { updateApproval } from '@/data/Content/EditOrganizationMemberGroup';
import { useLocalization } from '@/data/Localization';
import { APPROVAL_GROUP_VALUE_GROUPING } from '@/data/constants/admin_approvalGroupTypeName';
import { ContentContext } from '@/data/context/content';
import {
	Box,
	Checkbox,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { FC, Fragment, useContext, useMemo } from 'react';

export const AdminOrganizationManagementStepperApprovals: FC = () => {
	const labels = useLocalization('OrganizationManagement');
	const { stepperFormValue } = useContext(
		ContentContext
	) as AdminOrganizationManagementStepperContextValue;
	const { values, onNamedValueChange } = stepperFormValue;
	const { approvalTypes, selectedApprovals } = values;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const orientation = useMemo(() => (isMobile ? 'horizontal' : 'vertical'), [isMobile]);
	const onApproval = (name: string) => () => {
		const newValue = updateApproval(name, values.selectedApprovals);
		onNamedValueChange('selectedApprovals', newValue as Record<string, true>);
	};

	return (
		<Stack
			{...adminOrganizationManagementStepperApprovalsStack}
			divider={<Divider orientation={orientation} flexItem />}
		>
			<Stack {...adminOrganizationManagementStepperApprovalsSelectionStack}>
				<Typography sx={adminOrganizationManagementStepperApprovalsHeaderSX}>
					{labels.SelectApprovalTypesHeader.t()}
				</Typography>
				<FormControl component="fieldset" variant="standard">
					<FormGroup>
						{approvalTypes?.map(({ name = '' }) => (
							<FormControlLabel
								key={name}
								control={
									<Checkbox
										checked={!!selectedApprovals?.[name]}
										onChange={onApproval(name)}
										name={name}
									/>
								}
								label={labels[`Approval_${name}` as keyof typeof labels]?.t()}
							/>
						))}
					</FormGroup>
				</FormControl>
			</Stack>
			<Stack {...adminOrganizationManagementStepperApprovalsSelectionStack}>
				<Typography sx={adminOrganizationManagementStepperApprovalsHeaderSX}>
					{labels.SelectedApprovalTypesHeader.t()}
				</Typography>
				{APPROVAL_GROUP_VALUE_GROUPING.map(({ name, values }) => (
					<Fragment key={name}>
						{isEmpty(values.filter((value) => selectedApprovals?.[value])) ? (
							<Box key={name}>
								<Chip
									label={labels[`Approval_Inherited_${name}` as keyof typeof labels]?.t()}
									sx={adminOrganizationManagementStepperRolesAndApprovalsChipSX}
								/>
							</Box>
						) : (
							values
								.filter((value) => selectedApprovals?.[value])
								.map((value) => (
									<Box key={value}>
										<Chip
											label={labels[`Approval_${value}` as keyof typeof labels]?.t()}
											sx={adminOrganizationManagementStepperRolesAndApprovalsChipSX}
											onDelete={onApproval(value as string)}
										/>
									</Box>
								))
						)}
					</Fragment>
				))}
			</Stack>
		</Stack>
	);
};
