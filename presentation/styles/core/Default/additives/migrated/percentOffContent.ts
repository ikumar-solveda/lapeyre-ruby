/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export default {
	borderRadius: '6px',
	boxShadow: '2px 3px 3px #ddd',
	mt: 2,
	background: 'white',
	'.MuiGrid-item:last-child': {
		minHeight: '140px',
		position: 'relative',
		mt: 1,
	},
	'.MuiTypography-h4': {
		fontWeight: 500,
	},
} as SxProps;
