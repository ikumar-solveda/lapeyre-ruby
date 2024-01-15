/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
	interface TypographyVariants {
		body1AsH1: React.CSSProperties;
		body1AsH2: React.CSSProperties;
		body2AsH2: React.CSSProperties;
		h3AsH1: React.CSSProperties;
		h4AsH1: React.CSSProperties;
		h6AsH2: React.CSSProperties;
		strong: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		body1AsH1?: React.CSSProperties;
		body1AsH2?: React.CSSProperties;
		body2AsH2?: React.CSSProperties;
		h3AsH1?: React.CSSProperties;
		h4AsH1?: React.CSSProperties;
		h6AsH2?: React.CSSProperties;
		strong?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		body1AsH1: true;
		body1AsH2: true;
		body2AsH2: true;
		h3AsH1: true;
		h4AsH1: true;
		h6AsH2: true;
		strong: true;
	}
}

export const typography: ThemeOptions = {
	typography: {
		htmlFontSize: 16,
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
		strong: {
			fontWeight: 600,
		},
	},
};
