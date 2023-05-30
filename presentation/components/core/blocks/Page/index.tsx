/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { layoutManifest } from '@/components/layouts/manifest';
import { Meta } from '@/data/Meta';
import { Notifications } from '@/components/content/Notifications';
import Head from 'next/head';
import { FC } from 'react';
import { CssBaseline, SxProps, ThemeProvider } from '@mui/material';
import { ThemeSettingsProvider } from '@/styles/theme';
import { Layout } from '@/data/types/Layout';
import { Theme } from '@mui/material/styles/createTheme';
import { SessionErrorDialog } from '@/components/content/SessionErrorDialog';
import { SettingProvider } from '@/data/context/setting';
import { useStaticSettings } from '@/data/Settings';
import { CustomerService } from '@/components/content/CustomerService';

type PageProps = {
	meta: Meta;
	layout: Layout;
	theme: Theme;
	additives?: { [key: string]: SxProps | ((theme: Theme) => SxProps) };
};

export const PageBlock: FC<PageProps> = ({ meta, layout, theme, additives }) => {
	const Layout = layout && layoutManifest[layout.name] ? layoutManifest[layout.name] : () => null;

	return (
		<>
			<Head>
				<title>{meta?.title}</title>
				<meta name="description" content={meta?.description} />
				<meta name="keywords" content={meta?.keywords} />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<CustomerService />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ThemeSettingsProvider value={{ additives }}>
					<Layout layout={layout} />
					<Notifications />
					<SessionErrorDialog />
				</ThemeSettingsProvider>
			</ThemeProvider>
		</>
	);
};

export const StaticPageBlock: FC<PageProps> = ({ meta, layout, theme, additives }) => {
	const { settings } = useStaticSettings();

	return settings ? (
		<SettingProvider value={settings}>
			<PageBlock meta={meta} layout={layout} theme={theme} additives={additives} />
		</SettingProvider>
	) : null;
};
