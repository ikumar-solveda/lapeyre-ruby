/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
'use client';
import { Settings } from '@/data/_Settings';
import { EMPTY_SETTINGS, SettingProvider } from '@/data/context/setting';
import { EmotionCacheProvider } from '@/styles/app/EmotionCacheProvider';
import { useStyleTheme } from '@/styles/app/StyleTheme';
import { ThemeSettingsProvider } from '@/styles/app/ThemeSettingsContext';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

export const ThemeRegistry = ({
	children,
	settings,
}: {
	children: ReactNode;
	settings: Settings;
}) => {
	const { theme, additives } = useStyleTheme();
	return (
		<SettingProvider value={settings ?? EMPTY_SETTINGS}>
			<EmotionCacheProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ThemeSettingsProvider value={{ additives }}>{children}</ThemeSettingsProvider>
				</ThemeProvider>
			</EmotionCacheProvider>
		</SettingProvider>
	);
};
