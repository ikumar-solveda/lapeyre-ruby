/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const marketingHeroImage = (theme: Theme) =>
	({
		overflow: 'hidden',
		height: '400px',
		backgroundSize: 'cover',

		[theme.breakpoints.up('md')]: {
			height: '500px',
		},
		[theme.breakpoints.up('lg')]: {
			height: '600px',
		},
		[theme.breakpoints.up('xl')]: {
			height: '700px',
		},

		img: {
			opacity: 0.75,
			[theme.breakpoints.up('sm')]: {
				opacity: 0.8,
			},
			[theme.breakpoints.up('md')]: {
				opacity: 0.85,
			},
			[theme.breakpoints.up('lg')]: {
				opacity: 0.9,
			},
		},

		'.MuiTypography-h2': {
			fontWeight: 400,
		},

		'.marketing-text': {
			left: '20px',
			right: '20px',
			[theme.breakpoints.up('sm')]: {
				left: '40px',
				right: '40px',
			},
			[theme.breakpoints.up('lg')]: {
				left: '60px',
				right: '60px',
			},
		},
	} as SxProps);

export default marketingHeroImage;
