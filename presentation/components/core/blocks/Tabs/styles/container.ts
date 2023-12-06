/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

// TODO Move tab styling to global
export const tabContainerSX: SxProps<Theme> = {
	'.MuiAppBar-root': {
		boxShadow: 'none',
		backgroundColor: 'transparent',
	},

	'.MuiTabs-indicator': {
		backgroundColor: 'primary',
	},

	'.MuiTabs-flexContainer': {
		background: 'white',
		color: 'primary.main',
		borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
	},
};
