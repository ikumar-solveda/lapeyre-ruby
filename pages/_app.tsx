/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { StateProvider } from '@/data/state/provider';
import { EventsProvider } from '@/data/context/events';
import { NotificationsProvider } from '@/data/context/notifications';
import { SessionErrorProvider } from '@/data/context/sessionError';
import { Settings } from '@/data/Settings';
import { EMPTY_SETTINGS, SettingProvider } from '@/data/context/setting';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { PreviewCommunication } from '@/components/content/PreviewCommunication';
import { getGTMConfig, initializeGTM } from '@/data/events/handlers/gtm';

type pageProps = {
	fallback: any;
	settings: Settings;
	csrSession: boolean;
};
interface MyAppProps extends AppProps<pageProps> {
	emotionCache?: EmotionCache;
	settings: Settings;
}
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
	// store setting only need to fetch once ideally
	const [settings, setSettings] = useState<Settings>(() => pageProps.settings);
	useEffect(() => {
		setSettings((prevSettings) => prevSettings ?? pageProps.settings);

		// ---------------------------------------------------------------------------//
		// Google Tag Manager Integration
		// ---------------------------------------------------------------------------//
		// Right now - the configuration we need from STORECONF isn't being returned:
		// Query: select * from storeconf where storeent_id=41
		// 1. 'google.analytics.versions': 'UA,GA4'
		// 2. 'google.tag.manager.auth': 'cnzsj5FrFmQu8pJAeDsjbQ'
		// 3. 'google.tag.manager.container.id': 'GTM-5HTXBL2'
		// 4. 'google.tag.manager.preview': 'env-1'
		//
		const _settings = settings ?? pageProps.settings;
		const { ua, ga4, gtmId, gtmAuth, gtmPreview } = getGTMConfig(_settings);
		if (ua || ga4) {
			initializeGTM(gtmId, gtmAuth, gtmPreview);
		}
	}, [pageProps, settings]);
	return (
		<SettingProvider value={settings ?? EMPTY_SETTINGS}>
			{settings?.csrSession ? <Script src="/iframeResizer.contentWindow.min.js" /> : null}
			<StateProvider>
				{settings?.inPreview ? <PreviewCommunication /> : null}
				<CacheProvider value={emotionCache}>
					<EventsProvider>
						<SessionErrorProvider>
							<NotificationsProvider>
								<Component {...pageProps} />
							</NotificationsProvider>
						</SessionErrorProvider>
					</EventsProvider>
				</CacheProvider>
			</StateProvider>
		</SettingProvider>
	);
};

export default MyApp;
