/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { createTheme, responsiveFontSizes, SxProps } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { themeManifest, ThemeManifestTheme } from '@/styles/manifest';
import { useMemo, createContext, useContext, useCallback } from 'react';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { ThemeOptions } from '@mui/material/styles';
const ThemeSettingsContext = createContext<{
	additives?: ThemeManifestTheme['additives'];
}>({});
export const ThemeSettingsProvider = ThemeSettingsContext.Provider;

const getAllInheritedThemes = (
	themeName: keyof typeof themeManifest['themes']
): ThemeManifestTheme => {
	const { inheritFrom = 'Base', components, additives } = themeManifest['themes'][themeName];
	if (inheritFrom === 'None') {
		return { components, additives };
	}
	const inheritedTheme = getAllInheritedThemes(inheritFrom);
	return {
		components: [...inheritedTheme.components, ...components],
		additives: { ...inheritedTheme.additives, ...additives },
	};
};

export const useStyleTheme = (
	themeName: keyof typeof themeManifest['themes'] = themeManifest['defaultTheme'] || 'Base'
) => {
	const { basePath } = useNextRouter();
	const rc = useMemo(() => {
		const { components, additives } = getAllInheritedThemes(themeName);
		const theme = responsiveFontSizes(
			createTheme(
				components.reduce<ThemeOptions>((composition, styles) => {
					const _styles: ThemeOptions = typeof styles === 'function' ? styles(basePath) : styles;
					return deepmerge(composition, _styles);
				}, {})
			)
		);
		return { theme, additives };
	}, [basePath, themeName]);
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
