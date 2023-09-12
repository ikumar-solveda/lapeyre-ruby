/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const buyerOrganizationRegistrationStepLabelSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		py: 1,
		px: 0,
	},
});
