/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export default {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	opacity: 0,
	overflow: 'hidden',
	'@media (hover: hover)': {
		display: 'none',
	},
} as SxProps;
