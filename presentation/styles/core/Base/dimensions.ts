/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { GridSpacing } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import { ThemeOptions } from '@mui/material/styles';

type Dimensions = {
	header: {
		height: {
			desktop: number;
			mobile: number;
		};
	};
	menu: {
		height: {
			desktop: number;
		};
	};
	searchBar: {
		width: number;
		height: number;
	};
	productCard: {
		swatch: number;
		thumbnail: number;
	};
	pagination: {
		button: number;
	};
	inputFields: {
		height: number;
	};
	contentSpacing: ResponsiveStyleValue<GridSpacing>;
};

declare module '@mui/material/styles' {
	interface Theme {
		dimensions: Dimensions;
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		dimensions?: Partial<Dimensions>;
	}
}

export const dimensions: ThemeOptions = {
	dimensions: {
		header: {
			height: {
				desktop: 88,
				mobile: 64,
			},
		},
		menu: {
			height: {
				desktop: 40,
			},
		},
		searchBar: {
			width: 340,
			height: 40,
		},
		productCard: {
			swatch: 20,
			thumbnail: 140,
		},
		pagination: {
			button: 40,
		},
		inputFields: {
			height: 45,
		},
		contentSpacing: {
			xs: 2,
			sm: 2,
			md: 6,
			lg: 8,
		},
	},
};
