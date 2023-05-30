/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Checkbox: ThemeOptions = {
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						p: 0.75,
						ml: 0.25,
						color: 'text.main',
					},
				}),
			},
		},
	},
};
