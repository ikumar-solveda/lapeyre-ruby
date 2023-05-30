/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
	interface TypographyVariants {
		strong: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		strong?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
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
