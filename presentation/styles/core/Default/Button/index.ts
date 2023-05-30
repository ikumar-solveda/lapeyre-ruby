/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { buttonVariantsStyles } from '@/styles/Default/Button/variantsStyles';
import { buttonVariants } from '@/styles/Default/Button/variants';
import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material/styles';

export const Button: ThemeOptions = {
	components: {
		MuiButtonBase: {
			defaultProps: {
				// The props to change the default for.
				disableRipple: true, // No more ripple, on the whole application 💣!
			},
		},
		MuiButton: {
			variants: buttonVariants,
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						py: 1.25,
						px: 2.5,
						minWidth: 'auto',
						fontWeight: 700,
						boxShadow: 'none',
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
						borderColor: 'button.secondaryHover',
						borderWidth: '2px',
						'&:hover': {
							backgroundColor: 'button.secondaryHover',
							color: 'button.primary',
							borderColor: 'button.primary',
							borderWidth: '2px',
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
