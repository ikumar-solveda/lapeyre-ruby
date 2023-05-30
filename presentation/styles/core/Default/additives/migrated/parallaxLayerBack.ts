/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const parallaxLayerBack = (theme: Theme): SxProps => ({
	img: {
		maxWidth: '150%',
		width: '150%',
	},

	[theme.breakpoints.up('xl')]: {
		transform: 'translateZ(-1px) translateY(-150%) translateX(-25%)',
	},
	[theme.breakpoints.down('xl')]: {
		transform: 'translateZ(-1px) translateY(-120%) translateX(-25%)',
	},
	[theme.breakpoints.down('lg')]: {
		transform: 'translateZ(-1px) translateY(-80%) translateX(-25%)',
	},
	[theme.breakpoints.down('md')]: {
		transform: 'translateZ(-1px) translateY(-80%) translateX(-30%)',
		img: {
			maxWidth: '250%',
			width: '250%',
		},
	},
});

export default parallaxLayerBack;
