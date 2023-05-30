/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import type { GetServerSideProps, NextPage } from 'next';
import { useCallback } from 'react';
import { SWRConfig } from 'swr';
import { getPageProps } from '@/utils/getPageProps';
import { Page as PageComponent } from '@/components/Page';
import { useNotifications } from '@/data/Content/Notifications';
import { processError } from '@/data/utils/processError';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getSettings, useSettings } from '@/data/Settings';
import { Cache } from '@/data/types/Cache';
import { getCache } from '@/data/utils/getCache';
import { getUser } from '@/data/User';
interface Props {
	fallback?: Record<string, unknown>;
}

const GlobalSWRConfig = {
	focusThrottleInterval: 1800000, // 30 minutes
	revalidateIfStale: false, // disable auto re-validations
};

const Page: NextPage<Props> = ({ fallback }) => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const onError = useCallback(
		(error: any, _key: string) => {
			notifyError(processError(error as TransactionErrorResponse));
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
	const user = await getUser(cache, context);
	const {
		req: { url = '' },
	} = context;
	// not a initial page request (url.startsWith('/_next')
	// e.g. `/_next/data/development/en-US/bedroom.json?path=bedroom`
	// see `docs/cookie-session.md`
	const { props = { fallback: {} }, ...rest } =
		settings.csrSession || (url.startsWith('/_next') && user.sessionError)
			? {}
			: await getPageProps({ context, cache });
	return {
		...rest,
		props: {
			...props,
			settings,
		},
	};
};
