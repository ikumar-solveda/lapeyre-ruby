/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const wchHeroImage = (theme: Theme): SxProps => ({
	overflow: 'hidden',
	position: 'relative',
	textAlign: 'center',
	[theme.breakpoints.down('sm')]: {
		position: 'relative',
		height: '85vh',
		overflow: 'hidden',
	},
	'.section': {
		py: 0,
		display: 'flex',
	},
	'&.wch-hero-image-message-right .hero-message > div': {
		textAlign: 'right',
	},
	'&.wch-hero-image-message-left .hero-message > div': {
		textAlign: 'left',
	},
	'&.wch-hero-image-message-center .hero-message > div': {
		textAlign: 'center',
	},
	img: {
		maxWidth: '100%',
		transition: 'transform 0.3s ease-in',
		position: 'relative',
		zIndex: 1,
		[theme.breakpoints.down('sm')]: {
			transform: 'translate3d(-18%, 0, 0)',
			height: '100%',
			maxWidth: 'none',
			width: 'auto',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
		},
	},
	'.foreground-image': {
		position: 'absolute',
		zIndex: 2,
	},
});

export default wchHeroImage;
