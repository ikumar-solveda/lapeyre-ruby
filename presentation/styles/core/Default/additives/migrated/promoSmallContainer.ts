/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const promoSmallContainer = (theme: Theme): SxProps => ({
	position: 'relative',
	width: '100%',

	maxWidth: '285px',
	maxHeight: '297px',

	'.promo-small': {
		position: 'relative',
		height: 0,
		pt: '75.1%',
		width: '100%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		img: {
			position: 'absolute',
			top: 0,
			display: 'block',
			height: 'auto',
			overflow: 'hidden',
		},

		'.promo-border': {
			outline: '3px solid black',
			outlineOffset: '-27px',
		},

		'.promo-small-message': {
			position: 'absolute',
			padding: '6px 10px',
			width: '100%',
			fontSize: '1.625rem',
			textAlign: 'center',
			top: '50%',
			transform: 'translateY(-50%)',
			left: 0,
			'> p': {
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-50%)',
			},
		},
	},

	'.promo-text-small': {
		fontSize: '1.375rem',
		fontWeight: 700,
		lineHeight: 1.2,
		textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
		color: 'black',

		[theme.breakpoints.up('md')]: {
			fontSize: '1.625rem',
		},
	},
});

export default promoSmallContainer;
