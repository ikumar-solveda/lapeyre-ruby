/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions = {
	typography: {
		htmlFontSize: 16,
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
		h1: {
			fontSize: 72,
			fontWeight: 700,
		},
		h2: {
			fontSize: 52,
			fontWeight: 400,
		},
		h3: {
			fontSize: 32,
			fontWeight: 400,
		},
		h4: {
			fontSize: 26,
			fontWeight: 400,
		},
		h5: {
			fontSize: 20,
			fontWeight: 400,
		},
		h6: {
			fontSize: 18,
			fontWeight: 500,
		},
		subtitle1: {
			fontSize: 18,
			fontWeight: 500,
		},
		subtitle2: {
			fontSize: 18,
			fontWeight: 400,
		},
		body1: {
			fontSize: 14,
			fontWeight: 400,
		},
		body2: {
			fontSize: 14,
			fontWeight: 500,
		},
		button: {
			fontSize: 15,
			fontWeight: 400,
			textTransform: 'none',
		},
		caption: {
			fontSize: 12,
			fontWeight: 400,
		},
		strong: {
			fontWeight: 600,
		},
		overline: {
			fontSize: 12,
			textTransform: 'uppercase',
			fontWeight: 600,
			letterSpacing: 1,
		},
		body1AsH1: {
			fontSize: 14,
			fontWeight: 400,
		},
		body1AsH2: {
			fontSize: 14,
			fontWeight: 400,
		},
		body2AsH2: {
			fontSize: 14,
			fontWeight: 500,
		},
		h3AsH1: {
			fontSize: 32,
			fontWeight: 400,
		},
		h4AsH1: {
			fontSize: 26,
			fontWeight: 400,
		},
		h6AsH2: {
			fontSize: 18,
			fontWeight: 500,
		},
	},
};

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		inline: true;
	}
}
