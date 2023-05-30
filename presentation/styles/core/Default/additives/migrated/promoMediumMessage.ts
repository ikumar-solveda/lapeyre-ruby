/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const promoMediumMessage = (theme: Theme): SxProps => ({
	color: 'white',
	[theme.breakpoints.up('sm')]: {
		width: '100%',
		position: 'absolute',
		top: '40%',
		left: 0,
		fontSize: '1.5rem',
		fontWeight: '700',
		textAlign: 'center',
		color: 'white',
		textShadow: '0 1px 0 rgba(0, 0, 0, 0.5)',
	},
	[`${theme.breakpoints.between('sm', 'md')} and (orientation: landscape)`]: {
		top: '35%',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '1.875rem',
	},
	'> p': {
		margin: 0,
	},
});

export default promoMediumMessage;
