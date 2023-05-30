/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const heroMessage = (theme: Theme): SxProps => ({
	top: 0,
	right: 'auto',
	left: 'auto',
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignContent: 'center',
	maxWidth: 1200,
	textShadow:
		'0 1px 0 rgba(255, 255, 255, 0.5), 0 -1px 0 rgba(255, 255, 255, 0.5), 1px 0 0 rgba(255, 255, 255, 0.5), -1px 0 0 rgba(255, 255, 255, 0.5)',

	position: 'absolute',
	zIndex: 2,
	mx: 2,

	[theme.breakpoints.down('sm')]: {
		justifyContent: 'flex-start',
		pt: '22vh',
	},

	'> div': {
		padding: `0 ${theme.spacing(2)}`,
		[theme.breakpoints.up('md')]: {
			padding: `0 ${theme.spacing(4)}`,
		},
		[theme.breakpoints.up('lg')]: {
			padding: `0 ${theme.spacing(6)}`,
		},
	},

	'.text-hero-left': {
		textAlign: 'left',
	},

	'.text-hero-right': {
		textAlign: 'right',
	},

	'.text-hero-center': {
		textAlign: 'center',
	},
});

export default heroMessage;
