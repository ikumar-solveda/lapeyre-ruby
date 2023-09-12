/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { INITIAL_SETTINGS } from '@/data/config/DEFAULTS';
import { SettingProvider } from '@/data/context/setting';
import { StateProvider } from '@/data/state/provider';
import { ThemeSettingsProvider, useStyleTheme } from '@/styles/theme';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { mockFetch } from './mockFetch';

const clientSideEmotionCache = createEmotionCache();

mockFetch(window);

export const decorators = [
	(Story: FC) => {
		const { theme, additives } = useStyleTheme();
		return (
			<StateProvider>
				<CacheProvider value={clientSideEmotionCache}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<ThemeSettingsProvider value={{ additives }}>
							<SettingProvider value={INITIAL_SETTINGS}>
								<Story />
							</SettingProvider>
						</ThemeSettingsProvider>
					</ThemeProvider>
				</CacheProvider>
			</StateProvider>
		);
	},
];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		expanded: true,
		matchers: {
			// color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: {
			order: ['Content', ['Header', 'Footer']],
		},
	},
};
