/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

export const adminOrganizationManagementStepperRolesSelectionSX: SxProps<Theme> = (
	theme: Theme
) => ({
	width: '50%',
	[theme.breakpoints.down('md')]: {
		width: '100%',
	},
});
