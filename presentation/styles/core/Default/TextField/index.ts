/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const TextField: ThemeOptions = {
	components: {
		MuiInputLabel: {
			styleOverrides: {
				outlined: getStyleOverrides({
					styles: {
						color: 'text.secondary',
						'&.Mui-focused': {
							color: 'text.primary',
						},
					},
				}),
				required: getStyleOverrides({
					styles: {
						'.MuiInputLabel-asterisk': {
							display: 'none',
						},
					},
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: getStyleOverrides({
					styles: {
						borderWidth: '1px',
					},
				}),
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						backgroundColor: 'textField.background',
						'&:hover': {
							borderColor: 'textField.primary',
						},
						'&:focus': {
							borderColor: 'primary.main',
						},
					},
				}),
			},
		},
	},
};
