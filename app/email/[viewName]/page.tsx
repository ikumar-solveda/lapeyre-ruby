/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { contentManifest } from '@/components/email/templates/manifest';
import { getTypedLocalization } from '@/data/Localization-Server';
import { getSettings } from '@/data/Settings-Server';
import { getCache } from '@/data/cache/getCache';
import { getEmailTemplateDataFromViewName } from '@/data/email/EmailTemplateDataFromViewName';
import { AppRouterPageProps, ServerPageProps } from '@/data/types/AppRouter';
import { Cache } from '@/data/types/Cache';
import { constructAppRouterContext } from '@/data/utils/constructAppRouterContext';
import { getRequestId } from '@/data/utils/getRequestId';
import { debugWithId } from '@/data/utils/loggerUtil';
import { ThemeRegistry } from '@/styles/app/ThemeRegistry';
import { GetServerSidePropsContext, Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = ServerPageProps & {
	cache: Cache;
	context: GetServerSidePropsContext;
};

const EMPTY_PARAMS = {};
const EmailTemplate = async ({
	params = EMPTY_PARAMS,
	searchParams = EMPTY_PARAMS,
	cache,
	context,
}: Props) => {
	debugWithId(getRequestId(context), 'EmailTemplate: Received request for template', {
		params,
		searchParams,
		cookies: cookies().toString(),
	});
	const { viewName } = params;
	const displayLayout = await getEmailTemplateDataFromViewName(cache, context, viewName);

	if (!displayLayout?.layout?.layoutName) {
		notFound();
	}

	const Component = contentManifest[displayLayout.layout?.layoutName as string];
	return <Component searchParams={searchParams} cache={cache} context={context} />;
};

const EmailTemplatePage = async (props: AppRouterPageProps) => {
	const cache = getCache();
	const context = constructAppRouterContext(props);
	const settings = await getSettings(cache, context);
	return (
		<ThemeRegistry settings={settings}>
			<EmailTemplate {...props} cache={cache} context={context} />
		</ThemeRegistry>
	);
};

export const generateMetadata = async (
	{ params, searchParams }: AppRouterPageProps,
	_parent: ResolvingMetadata
) => {
	// Technically, it is incorrect behavior to create cache and context here -- these should be
	//   singletons for the life of a request, however we have no way of passing in parameters other
	//   than what Next.JS allows
	// However, it's okay to have "recreate" of the cache (getCache) here because we're fetching
	//   translation text and layout info, which will be stored in the server-cache (not request-
	//   cache) anyway
	// Similarly, the "recreate" of the context is not ideal but it won't have any side-effects
	const cache = getCache();
	const context = constructAppRouterContext({ searchParams });
	const all = (await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')).Meta;
	const { viewName } = params as Record<string, string>;
	const displayLayout = await getEmailTemplateDataFromViewName(cache, context, viewName, false);
	let title;
	let description;

	if (!displayLayout?.layout) {
		title = all['404'].Title.t({ viewName });
		description = title;
	} else {
		const { identifier } = displayLayout as NonNullable<typeof displayLayout>;
		const { Title, Description } = all[identifier as keyof Omit<typeof all, '404'>];
		title = Title.t();
		description = Description.t();
	}
	return { title, description } as Metadata;
};

export default EmailTemplatePage;
