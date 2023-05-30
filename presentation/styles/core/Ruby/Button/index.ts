/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { buttonVariantsStyles } from '@/styles/Ruby/Button/variantsStyles';
import { buttonVariants } from '@/styles/Ruby/Button/variants';
import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Button: ThemeOptions = {
	components: {
		MuiButtonBase: {
			defaultProps: {
				// The props to change the default for.
				disableRipple: false,
			},
		},
		MuiButton: {
			variants: buttonVariants,
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						py: 1.5,
						px: 2,
						borderRadius: 2,
						minWidth: 'auto',
						fontWeight: 600,
						boxShadow: 'none',
						'&.Mui-disabled': {
							color: 'button.disabledText',
						},
					},
					variants: buttonVariantsStyles,
				}),
				contained: getStyleOverrides({
					styles: {
						backgroundColor: 'button.primary',
						color: 'button.contrastText',
						'&:hover': {
							backgroundColor: 'button.primaryHover',
							boxShadow: 'none',
						},
					},
				}),
				outlined: getStyleOverrides({
					styles: {
						backgroundColor: 'button.secondary',
						color: 'button.primary',
						borderColor: 'button.primary',
						'&:hover': {
							backgroundColor: 'button.secondaryHover',
							color: 'button.primary',
							borderColor: 'button.primary',
						},
					},
				}),
				text: getStyleOverrides({
					styles: {
						boxShadow: 'none',
						minWidth: 'unset',
						color: 'primary.main',
						'&:hover': {
							color: 'primary.dark',
						},
					},
				}),
			},
		},
	},
};
