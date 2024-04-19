/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

'use client';
import { BASE_PATH } from '@/data/constants/common';
import { getAllInheritedThemes, themeManifest } from '@/styles/manifest';
import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

export const useStyleTheme = (
	themeName: keyof (typeof themeManifest)['themes'] = themeManifest['defaultTheme'] || 'Base'
) => {
	const { components, additives } = getAllInheritedThemes(themeName);
	const theme = responsiveFontSizes(
		createTheme(
			components.reduce<ThemeOptions>((composition, styles) => {
				const _styles: ThemeOptions = typeof styles === 'function' ? styles(BASE_PATH) : styles;
				return deepmerge(composition, _styles);
			}, {})
		)
	);
	return { theme, additives };
};
