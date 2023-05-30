/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const marketingButton = (theme: Theme): SxProps => ({
	fontWeight: 600,

	backgroundColor: 'button.secondary',
	color: 'button.primary',
	border: `1px solid ${(theme.palette as any).button.primary}`,

	'&:hover': {
		backgroundColor: 'button.secondaryHover',
		color: 'button.primary',
	},
});

export default marketingButton;
