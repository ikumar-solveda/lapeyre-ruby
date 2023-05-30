/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export default {
	borderRadius: '0',
	position: 'relative',
	overflow: 'hidden',
	width: '100vw',
	left: '50%',
	right: '50%',
	mx: '-50vw',
	'> img': {
		position: 'absolute',
		width: '100%',
		height: '100%',
		left: '0',
		top: '0',
		bottom: '0',
		right: '0',
		objectFit: 'cover',
		zIndex: 1,
	},
	'> :not(img)': {
		position: 'relative',
		zIndex: 2,
	},
} as SxProps;
