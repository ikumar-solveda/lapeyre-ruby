/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Radio: ThemeOptions = {
	components: {
		MuiRadio: {
			styleOverrides: {
				colorPrimary: getStyleOverrides({
					styles: {
						color: 'border.dark',
						'&.Mui-checked': {
							color: 'button.primary',
						},
					},
				}),
			},
		},
	},
};
