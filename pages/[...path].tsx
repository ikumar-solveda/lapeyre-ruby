/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Page as PageComponent } from '@/components/Page';
import { useNotifications } from '@/data/Content/Notifications';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser } from '@/data/User';
import { ElasticSearchErrorResponse, TransactionErrorResponse } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { getCache } from '@/data/utils/getCache';
import { processError } from '@/data/utils/processError';
import { getPageProps } from '@/utils/getPageProps';
import type { GetServerSideProps, NextPage } from 'next';
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
	const { error } = settings; // any errors encountered resolving store settings (store-id, etc.)

	const user = error ? {} : await getUser(cache, context);
	const {
		res,
		req: { url = '' },
	} = context;

	// for metrics
	Object.assign(res, { hclData: { storeId: settings?.storeId } });

	// not a initial page request (url.startsWith('/_next')
	// e.g. `/_next/data/development/en-US/bedroom.json?path=bedroom`
	// see `docs/cookie-session.md`
	const { props = { fallback: {} }, ...rest } = error
		? { notFound: true }
		: settings.csrSession || (url.startsWith('/_next') && user.sessionError)
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
