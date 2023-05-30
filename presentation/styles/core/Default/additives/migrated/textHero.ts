/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const textHero = (theme: Theme): SxProps => ({
	fontSize: '2rem',
	lineHeight: 1,
	color: 'black',
	fontWeight: 600,

	[theme.breakpoints.up('sm')]: {
		fontSize: '2.5rem',
		lineHeight: 1.26,
	},

	[theme.breakpoints.up('lg')]: {
		fontSize: '4rem',

		h1: {
			maxWidth: '1200px',
		},
		'> .button': {
			mt: '64px',
		},
	},
});

export default textHero;
