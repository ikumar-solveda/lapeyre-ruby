/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	render,
	queries,
	queryHelpers,
	buildQueries,
	Matcher,
	MatcherOptions,
	waitFor,
	RenderOptions,
	waitForOptions,
} from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { FC, ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { StateProvider } from '@/data/state/provider';
import { ThemeSettingsProvider, useStyleTheme } from '@/styles/theme';
import { SettingProvider } from '@/data/context/setting';
import { INITIAL_SETTINGS } from '@/data/config/DEFAULTS';

expect.extend(toHaveNoViolations);

const clientSideEmotionCache = createEmotionCache();

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
	const { theme, additives } = useStyleTheme();
	return (
		<StateProvider>
			<CacheProvider value={clientSideEmotionCache}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ThemeSettingsProvider value={{ additives }}>
						<SettingProvider value={INITIAL_SETTINGS}>
							<SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
						</SettingProvider>
					</ThemeSettingsProvider>
				</ThemeProvider>
			</CacheProvider>
		</StateProvider>
	);
};

const queryAllByAttribute = (
	container: HTMLElement,
	attribute: string,
	id: Matcher,
	options?: MatcherOptions | undefined
) => queryHelpers.queryAllByAttribute(attribute, container, id, options);

const [queryByAttribute, getAllByAttribute, getByAttribute, findAllByAttribute, findByAttribute] =
	buildQueries(
		queryAllByAttribute,
		// Handle Failures
		(attribute, value) => `Found multiple elements with the ${attribute} attribute of: ${value}`,
		(attribute, value) => `Unable to find an element with the ${attribute} attribute of: ${value}`
	);

const queryAllBySelector = (container: HTMLElement, selector: any): HTMLElement[] =>
	Array.from(container.querySelectorAll(selector));

const [queryBySelector, getAllBySelector, getBySelector, findAllBySelector, findBySelector] =
	buildQueries(
		queryAllBySelector,
		// Handle Failures
		(_, value) => `Found multiple elements with the selector of: ${value}`,
		(_, value) => `Unable to find an element with the selector of: ${value}`
	);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, {
		wrapper: AllTheProviders,
		queries: {
			...queries,
			queryByAttribute,
			queryAllByAttribute,
			getAllByAttribute,
			getByAttribute,
			findAllByAttribute,
			findByAttribute,
			queryBySelector,
			queryAllBySelector,
			getAllBySelector,
			getBySelector,
			findAllBySelector,
			findBySelector,
		},
		...options,
	});

/**
 * Required for components that use data hooks: swr, localization, etc.
 * For page with huge data interaction please provide a timeout value to overwrite default one.
 */
const waitForData = (view: ReturnType<typeof customRender>, options: waitForOptions = {}) =>
	waitFor(
		() => {
			expect(
				Date.now() - fetchMock.last[process.env.JEST_WORKER_ID ?? 1] ?? Date.now()
			).toBeGreaterThanOrEqual(300);
			expect(view.queryAllByRole('progressbar').length).toBe(0);
		},
		{ timeout: 1500, ...options }
	);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, waitForData, axe };
