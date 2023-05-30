/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions = {
	typography: {
		htmlFontSize: 15,
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
		h1: {
			fontSize: 36,
			fontWeight: 600,
		},
		h2: {
			fontSize: 32,
			fontWeight: 600,
		},
		h3: {
			fontSize: 24,
			fontWeight: 600,
		},
		h4: {
			fontSize: 24,
			fontWeight: 500,
		},
		h5: {
			fontSize: 18,
			fontWeight: 600,
		},
		h6: {
			fontSize: 18,
			fontWeight: 500,
		},
		subtitle1: {
			fontSize: 18,
			fontWeight: 600,
		},
		subtitle2: {
			fontSize: 18,
			fontWeight: 400,
		},
		body1: {
			fontSize: 15,
			fontWeight: 400,
		},
		body2: {
			fontSize: 15,
			fontWeight: 600,
		},
		button: {
			fontSize: 15,
			textTransform: 'none',
		},
		caption: {
			fontSize: 13,
			fontWeight: 400,
		},
		strong: {
			fontWeight: 600,
		},
		overline: {
			fontSize: 13,
			textTransform: 'uppercase',
			fontWeight: 600,
			letterSpacing: 1,
		},
	},
};

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		inline: true;
	}
}
