/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Paper: ThemeOptions = {
	components: {
		MuiPaper: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						overflow: 'hidden',
					},
				}),
			},
		},
	},
};
