/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const tabsButtonSX: SxProps = {
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
};
