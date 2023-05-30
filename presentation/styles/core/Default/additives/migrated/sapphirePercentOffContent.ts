/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const sapphirePercentOffContent = (theme: Theme): SxProps => ({
	color: 'white',
	height: '200px',
	borderRadius: '6px',
	fontWeight: 500,
	'.marketing-text': {
		maxWidth: '350px',
	},
	[theme.breakpoints.up('sm')]: {
		height: '400px',
	},
});

export default sapphirePercentOffContent;
