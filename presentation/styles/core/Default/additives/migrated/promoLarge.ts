/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const promoLarge = (theme: Theme): SxProps => ({
	position: 'relative',
	overflow: 'hidden',
	height: '85vh',
	backgroundPosition: '34% 0',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',

	[theme.breakpoints.up('sm')]: {
		height: 0,
		paddingTop: '41.6667%',
	},

	img: {
		className: 'promo-img',
		position: 'absolute',
		top: 0,
		height: '100%',

		[theme.breakpoints.down('sm')]: {
			height: '100%',
			maxWidth: 'none',
		},
	},

	'.promo-border': {
		outline: '3px solid white',
		outlineOffset: '-20px',
	},
});

export default promoLarge;
