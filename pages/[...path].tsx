/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Page as PageComponent } from '@/components/Page';
import { useNotifications } from '@/data/Content/Notifications';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { ElasticSearchErrorResponse, TransactionErrorResponse } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { getCache } from '@/data/utils/getCache';
import { getPagePropsForServer } from '@/data/utils/getPagePropsForServer';
import { processError } from '@/data/utils/processError';
import { setCacheHeaderIfRequiredForCDN } from '@/data/utils/setCacheHeaderIfRequiredForCDN';
import { setReferrerCookie } from '@/data/utils/setReferrerCookie';
import type { GetServerSideProps, NextPage } from 'next';
import nextConfig from 'next.config';
import { useCallback } from 'react';
import { SWRConfig } from 'swr';
interface Props {
	fallback?: Record<string, unknown>;
}

const GlobalSWRConfig = {
	revalidateOnFocus: false, // disable focus re-validations
	revalidateIfStale: false, // disable auto re-validations
};

const Page: NextPage<Props> = ({ fallback }) => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const onError = useCallback(
		(error: any, _key: string) => {
			notifyError(processError(error as TransactionErrorResponse | ElasticSearchErrorResponse));
		},
		[notifyError]
	);

	// the check for `settings.storeId` is needed when navigating from a statically generated page
	// to this server-side rendered page. Different from initial page load, in this scenario,
	// the settings are from pageProps async ajax call
	return settings.storeId ? (
		<SWRConfig value={{ fallback, onError, ...GlobalSWRConfig }}>
			<PageComponent />
		</SWRConfig>
	) : null;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const cache: Cache = getCache();
	const settings = await getSettings(cache, context);
	const { res } = context;
	// for metrics
	Object.assign(res, { hclData: { storeId: settings?.storeId } });

	const pageProps = await getPagePropsForServer({ context, cache });

	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(
		cache,
		locale || nextConfig.i18n?.defaultLocale || 'default',
		'Routes'
	);
	/**
	 * set cache-control header so that CDN can cache it
	 */
	setCacheHeaderIfRequiredForCDN({ pageProps, context, routes, settings });
	setReferrerCookie(context, settings);

	const { props = { fallback: {} }, ...rest } = pageProps;
	return {
		...rest,
		props: {
			...props,
			settings,
		},
	};
};
