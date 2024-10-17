/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { GoogleMapsAPILoader } from '@/components/content/GoogleMapsAPILoader';
import { PreviewCommunication } from '@/components/content/PreviewCommunication';
import { AppContextProviders } from '@/data/AppContextProviders';
import { EMPTY_SETTINGS, SettingProvider } from '@/data/context/setting';
import { CookiesProvider } from '@/data/cookie/cookiesProvider';
import { getGTMConfig, initializeGTM } from '@/data/events/handlers/gtm';
import { Settings } from '@/data/Settings';
import { StateProvider } from '@/data/state/provider';
import { MyAppProps } from '@/data/types/PagesRouter';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import Script from 'next/script';
import 'polyfill';
import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
	cookies,
}: MyAppProps) => {
	// store settings ideally only need to be fetched once
	const [settings, setSettings] = useState<Settings>(() => pageProps.settings);
	useEffect(() => {
		setSettings((prevSettings) => prevSettings ?? pageProps.settings);
		const _settings = settings ?? pageProps.settings;
		const { ua, ga4, gtmId, gtmAuth, gtmPreview } = getGTMConfig(_settings);
		if (ua || ga4) {
			initializeGTM(gtmId, gtmAuth, gtmPreview);
		}
	}, [pageProps, settings]);

	const _cookies = useMemo(
		() => (typeof document !== 'undefined' ? new Cookies(document.cookie) : cookies),
		[cookies]
	);

	return (
		<SettingProvider value={settings ?? EMPTY_SETTINGS}>
			{settings?.csrSession ? <Script src="/iframeResizer.contentWindow.min.js" /> : null}
			<CookiesProvider cookies={_cookies}>
				<StateProvider>
					{settings?.inPreview ? <PreviewCommunication /> : null}
					<GoogleMapsAPILoader />
					<CacheProvider value={emotionCache}>
						<AppContextProviders>
							<Component {...pageProps} />
						</AppContextProviders>
					</CacheProvider>
				</StateProvider>
			</CookiesProvider>
		</SettingProvider>
	);
};

export default MyApp;
