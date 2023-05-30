/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Link: ThemeOptions = {
	components: {
		MuiLink: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						textDecoration: 'none',
					},
				}),
			},
		},
	},
};
