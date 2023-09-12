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
						transform: 'none',
						position: 'relative',
						mb: 0.25,
						pointerEvents: 'unset',

						'&.Mui-focused:not(.Mui-error)': {
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
				root: getStyleOverrides({
					styles: {
						'&.Mui-focused:not(.Mui-error)': {
							fieldset: {
								'&.MuiOutlinedInput-notchedOutline': {
									borderColor: 'textField.borderHovered',
								},
							},
						},
						legend: {
							width: '0px !important',
						},
					},
				}),
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						backgroundColor: 'textField.background',
						'&:hover,&:focus': {
							borderColor: 'textField.borderHovered',
						},
					},
				}),
			},
		},
	},
};
