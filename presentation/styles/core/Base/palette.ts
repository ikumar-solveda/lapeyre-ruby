/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsColorOverrides {
		text: true;
	}
}

declare module '@mui/material/styles' {
	// allow configuration using `createTheme`
	export interface TypeBackground {
		main?: string;
		transparency?: string;
		contrastText?: string;
	}

	export interface TypeButton {
		primary: string;
		primaryHover: string;
		secondary: string;
		secondaryHover: string;
		contrastText: string;
		disabled: string;
		disabledText: string;
	}

	export interface PaletteOptions {
		button?: Partial<TypeButton>;
	}

	export interface Palette {
		button: TypeButton;
	}
}

export const palette: ThemeOptions = {
	palette: {},
} as ThemeOptions;
