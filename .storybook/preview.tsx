/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { StateProvider } from '@/data/state/provider';
import { ThemeSettingsProvider, useStyleTheme } from '@/styles/theme';
import { mockFetch } from './mockFetch';
import { SettingProvider } from '@/data/context/setting';
import { INITIAL_SETTINGS } from '@/data/config/DEFAULTS';

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
	nextRouter: {
		Provider: RouterContext.Provider,
		locale: 'en-US',
		query: { path: [] },
	},
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
