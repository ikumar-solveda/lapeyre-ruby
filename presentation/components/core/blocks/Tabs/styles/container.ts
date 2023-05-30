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

	'.MuiButtonBase-root': {
		fontSize: '0.9rem',
		fontWeight: '500',
		color: 'text.primary',
		minWidth: 'auto',
		px: 2,
		'&:first-of-type': {
			ml: -2,
		},
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
