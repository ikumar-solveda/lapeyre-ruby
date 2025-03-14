/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CDNCacheOnloadMutation } from '@/components/content/CDNCacheOnLoadMutaion';
import { CustomerService } from '@/components/content/CustomerService';
import { Notifications } from '@/components/content/Notifications';
import { OpenGraph } from '@/components/content/OpenGraph';
import { SchemaOrgMetaData } from '@/components/content/SchemaOrgMetaData';
import { SelectedStoreSynchronizer } from '@/components/content/SelectedStoreSynchronizer';
import { SessionErrorDialog } from '@/components/content/SessionErrorDialog';
import { layoutManifest } from '@/components/layouts/manifest';
import { Meta } from '@/data/Meta';
import { useSettings, useStaticSettings } from '@/data/Settings';
import { SettingProvider } from '@/data/context/setting';
import { Layout } from '@/data/types/Layout';
import { ThemeSettingsProvider } from '@/styles/theme';
import { CssBaseline, SxProps } from '@mui/material';
import { Theme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { FC, useMemo } from 'react';

type PageProps = {
	meta: Meta;
	layout: Layout;
	theme: Theme;
	additives?: { [key: string]: SxProps | ((theme: Theme) => SxProps) };
};

export const PageBlock: FC<PageProps> = ({ meta, layout, theme, additives }) => {
	const Layout = layout && layoutManifest[layout.name] ? layoutManifest[layout.name] : () => null;
	const themeAdditives = useMemo(() => ({ additives }), [additives]);
	const { settings } = useSettings();
	return (
		<>
			<Head>
				<title>{meta?.title}</title>
				<meta name="description" content={meta?.description} />
				<meta name="keywords" content={meta?.keywords} />
				<meta name="application-name" content={`${settings.identifier}`} />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-status-bar-style" content="default" />
				<meta name="description" content={meta?.description} />
				<meta name="keywords" content={meta?.keywords} />
				<link rel="shortcut icon" href={`/${settings.identifier}/favicon.png`} />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href={`/${settings.identifier}/apple-touch-icon.png`}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href={`/${settings.identifier}/favicon-32x32.png`}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href={`/${settings.identifier}/favicon-16x16.png`}
				/>
				<link rel="icon" href={`/${settings.identifier}/favicon.png`} />
				<link rel="manifest" href={`/${settings.identifier}/manifest.json`} />
				{meta.canonical ? <link rel="canonical" href={meta.canonical} /> : null}
			</Head>
			<SchemaOrgMetaData />
			<OpenGraph />
			<CustomerService />
			<CDNCacheOnloadMutation />
			<SelectedStoreSynchronizer />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ThemeSettingsProvider value={themeAdditives}>
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
