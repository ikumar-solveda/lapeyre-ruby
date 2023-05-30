/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const homeHeroContent = (theme: Theme): SxProps => ({
	'.marketing-text': {
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		border: '2px solid white',
		borderRadius: '6px',

		[theme.breakpoints.up('md')]: {
			padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
		},
		[theme.breakpoints.down('md')]: {
			padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
			maxWidth: '100%',
		},
	},

	'.MuiTypography-root': {
		display: 'inline',
	},
	'.MuiTypography-h2': {
		fontWeight: 700,
	},
});

export default homeHeroContent;
