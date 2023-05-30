/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

const paletteColors = {
	white: '#fffffe',
	ghostWhite: '#f9fbfb',
	azure: '#3da9fc',
	lightBlue: '#d8eefe',
	paleBlue: '#90b4ce',
	midnightBlue: '#094067',
	gray: '#5f6c7b',
	red: '#ef4565',
};

export const palette: ThemeOptions = {
	palette: {
		primary: {
			main: paletteColors.azure,
			dark: paletteColors.midnightBlue,
			light: paletteColors.paleBlue,
			contrastText: paletteColors.white,
		},
		secondary: {
			main: paletteColors.paleBlue,
			light: paletteColors.ghostWhite,
			dark: paletteColors.azure,
			contrastText: paletteColors.white,
		},
		text: {
			main: paletteColors.gray,
			primary: paletteColors.gray,
			secondary: paletteColors.midnightBlue,
			disabled: paletteColors.paleBlue,
			highlight: paletteColors.azure,
			alert: paletteColors.red,
			expandedMenu: paletteColors.white,
		},
		base: {
			main: paletteColors.gray,
			contrastText: paletteColors.white,
		},
		action: {
			active: '#cccccc',
			hover: '#f0f4f7',
			disabled: paletteColors.paleBlue,
			disabledBackground: paletteColors.ghostWhite,
		},
		background: {
			main: paletteColors.white,
			default: paletteColors.ghostWhite,
			paper: paletteColors.white,
			transparency: 'cc',
			contrastText: paletteColors.gray,
		},
		divider: paletteColors.lightBlue,
		border: {
			dark: paletteColors.midnightBlue,
			alert: paletteColors.red,
			footer: paletteColors.lightBlue,
		},
		textField: {
			border: paletteColors.midnightBlue,
			borderHovered: paletteColors.azure,
			background: paletteColors.white,
			disabledBackground: paletteColors.lightBlue,
		},
		button: {
			primary: paletteColors.azure,
			primaryHover: paletteColors.midnightBlue,
			secondary: paletteColors.white,
			secondaryHover: paletteColors.lightBlue,
			contrastText: paletteColors.white,
			disabled: paletteColors.lightBlue,
			disabledText: paletteColors.white,
		},
		info: {
			main: '#0288d1',
			light: '#99c2e1',
			dark: '#01579b',
			contrastText: '#ffffff',
		},
	},
} as ThemeOptions;
