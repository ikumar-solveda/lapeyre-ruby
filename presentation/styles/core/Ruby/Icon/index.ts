/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Icon: ThemeOptions = {
	components: {
		MuiSvgIcon: {
			styleOverrides: {
				colorPrimary: getStyleOverrides({
					styles: {
						color: 'button.primary',
					},
				}),
			},
		},
	},
};
