/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { BASE_PATH } from '@/data/constants/common';
import { getAllInheritedThemes, themeManifest, ThemeManifestTheme } from '@/styles/manifest';
import { createTheme, responsiveFontSizes, SxProps, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { createContext, useCallback, useContext, useMemo } from 'react';
const ThemeSettingsContext = createContext<{
	additives?: ThemeManifestTheme['additives'];
}>({});
export const ThemeSettingsProvider = ThemeSettingsContext.Provider;

export const useStyleTheme = (
	themeName: keyof (typeof themeManifest)['themes'] = themeManifest['defaultTheme'] || 'Base'
) => {
	const rc = useMemo(() => {
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
	}, [themeName]);
	return rc;
};

export const useThemeSettings = () => {
	const { additives } = useContext(ThemeSettingsContext);
	const { theme } = useStyleTheme();
	const getAdditive = useCallback(
		(additiveName: string): SxProps => {
			const additive = additives?.[additiveName] || {};
			const rc = typeof additive === 'function' ? additive(theme) : additive;
			return rc;
		},
		[additives, theme]
	);
	return { additives, getAdditive };
};
