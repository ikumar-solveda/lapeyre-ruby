/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const freeDeliveryContent = (theme: Theme): SxProps => ({
	borderRadius: '6px',
	boxShadow: '0px 1px 4px 2px rgba(0, 0, 0, 0.1), 0px 2px 1px 0px rgba(0, 0, 0, 0.25)',

	height: '200px',
	[theme.breakpoints.up('sm')]: {
		height: '240px',
	},

	img: {
		opacity: 0.4,
	},

	'.marketing-text': {
		width: '600px',
		maxWidth: '100%',
		textAlign: 'center',
		fontWeight: 500,
		color: 'black',
		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		[theme.breakpoints.up('sm')]: {
			padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
		},
	},

	'.MuiTypography-h4': {
		fontWeight: 500,
	},
});

export default freeDeliveryContent;
