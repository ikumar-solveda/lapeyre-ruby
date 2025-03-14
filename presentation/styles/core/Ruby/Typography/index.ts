/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const Typography: ThemeOptions = {
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					// Map the new variant to render a <h1> by default
					body1AsH1: 'h1',
					body1AsH2: 'h2',
					body2AsH2: 'h2',
					h3AsH1: 'h1',
					h4AsH1: 'h1',
					h6AsH2: 'h2',
					pageTitle: 'h1',
				},
			},
		},
	},
};
