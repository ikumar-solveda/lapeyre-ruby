/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export default {
	'&.marketing-text-vertical-center': {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
	},
	'&.marketing-text-horizontal-center': {
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
	},
	'&.marketing-text-horizontal-center.marketing-text-vertical-center': {
		transform: 'translateX(-50%) translateY(-50%)',
	},
} as SxProps;
