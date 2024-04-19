/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BaseTheme } from '@/styles/Base/theme';
import { DefaultTheme } from '@/styles/Default/theme';
import { RubyTheme } from '@/styles/Ruby/theme';
import { themeManifestCustom } from '@/styles/manifestCustom';
import { SxProps, Theme, ThemeOptions } from '@mui/material';

export type ThemeManifestTheme = {
	inheritFrom?: string;
	components: (ThemeOptions | ((basePath: string) => ThemeOptions))[];
	additives?: { [key: string]: SxProps | ((theme: Theme) => SxProps) };
};

export type ThemeManifest = {
	defaultTheme?: string;
	themes: {
		[key: string]: ThemeManifestTheme;
	};
};

export const themeManifest: ThemeManifest = {
	defaultTheme: themeManifestCustom.defaultTheme || 'Ruby',
	themes: {
		Base: BaseTheme,
		Default: DefaultTheme,
		Ruby: RubyTheme,
		...themeManifestCustom.themes,
	},
};

export const getAllInheritedThemes = (
	themeName: keyof (typeof themeManifest)['themes']
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
