/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const promoMedium = (theme: Theme): SxProps => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#6c6c6c',
	height: '40px',
	width: '100%',
	textAlign: 'center',
	transition: 'all 0.3s ease-in-out',

	img: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
	},

	[theme.breakpoints.up('sm')]: {
		display: 'static',
		position: 'relative',
		height: 0,
		pt: '16.6667%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},

	[theme.breakpoints.down('sm')]: {
		position: 'relative',
	},
});

export default promoMedium;
