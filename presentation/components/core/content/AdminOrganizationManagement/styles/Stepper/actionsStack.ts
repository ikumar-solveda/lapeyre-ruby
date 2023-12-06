/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const adminOrganizationManagementStepperActionsStack: StackProps = {
	m: 1,
	direction: { xs: 'column', sm: 'row' },
	spacing: resBreak({ mobile: 1, desktop: 2 }),
	justifyContent: 'space-between',
	alignItems: 'center',
};
