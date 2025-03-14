/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getSettings } from '@/data/Settings-Server';
import { Cache } from '@/data/types/Cache';
import { getUser } from '@/data/User-Server';
import { getCSRSessionPageProps } from '@/data/utils/getCSRSessionPageProps';
import { getPageProps } from '@/data/utils/getPageProps';
import { getRequestId } from '@/data/utils/getRequestId';
import { traceWithId } from '@/data/utils/loggerUtil';
import { validateLocale } from '@/data/utils/validateLocale';
import { GetServerSidePropsContext } from 'next';

type Props = {
	context: GetServerSidePropsContext;
	cache: Cache;
};

export const getPagePropsForServer = async ({ context, cache }: Props): Promise<any> => {
	traceWithId(getRequestId(context), 'getPagePropsForServer: entering');
	const settings = await getSettings(cache, context);
	const { error, csrSession } = settings; // any errors encountered resolving store settings (store-id, etc.)
	const { req } = context;
	const user = error || csrSession ? {} : await getUser(cache, context);
	const validatedLocale = await validateLocale(cache, context, !!(error || csrSession));

	// not a initial page request (url.startsWith('/_next')
	// e.g. `/_next/data/development/en-US/bedroom.json?path=bedroom`
	// see `docs/cookie-session.md`
	const propsForServer = error
		? { notFound: true }
		: req.url?.startsWith('/_next') && user.sessionError
		? {}
		: context.query.path?.at(-1)?.includes('.')
		? // Prevent missing assets from being included in page lookup.
		  { notFound: true, props: {} }
		: csrSession
		? await getCSRSessionPageProps({ context, cache })
		: validatedLocale
		? validatedLocale
		: await getPageProps({ context, cache });
	traceWithId(getRequestId(context), 'getPagePropsForServer: exiting', { propsForServer });
	return propsForServer;
};
