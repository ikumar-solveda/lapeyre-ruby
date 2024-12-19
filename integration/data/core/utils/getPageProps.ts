/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { getContent } from '@/data/Content';
import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { getLayout } from '@/data/Layout';
import { getMeta } from '@/data/Meta';
import { Cache } from '@/data/types/Cache';
import { constructRedirectURLParameters } from '@/data/utils/constructRedirectURLParameters';
import { getMapPromiseValues } from '@/data/utils/getMapPromiseValues';
import { getRequestId } from '@/data/utils/getRequestId';
import { traceWithId } from '@/data/utils/loggerUtil';
import { omit, pick } from 'lodash';
import { GetServerSidePropsContext } from 'next';

type GetProps = {
	context: GetServerSidePropsContext;
	cache: Cache;
};

export const getPageProps = async ({ context, cache }: GetProps) => {
	// Prevent missing assets from being included in page lookup.
	// if the last part of the path includes a dot, it's a file.
	traceWithId(getRequestId(context), 'Processing request', {
		from: context.resolvedUrl,
		address: context.req.socket.remoteAddress,
	});
	if (context.query.path?.at(-1)?.includes('.')) return { notFound: true, props: {} };
	const layout = await getLayout(cache, context.query.path, context);
	if (layout.redirect) {
		return {
			redirect: {
				destination: (
					layout.redirect +
					(layout.redirect.includes('?') ? '&' : '?') +
					constructRedirectURLParameters({ context })
				).replace(
					/[\?\&]$/, // remove trailing question mark
					''
				),
				permanent: layout.permanent ?? false,
			},
		};
	}
	if (!layout.value) {
		// url response with an empty array means not found.
		return {
			notFound: true,
			props: {},
		};
	}

	const header = (Object.values(pick(layout.processed?.slots, 'header')) ?? []).flat(1);
	const others = (Object.values(omit(layout.processed?.slots, 'header')) ?? []).flat(1);

	// try to do the header first -- the navbar fetch can help cache some categories
	await Promise.all(
		header.map(
			async ({ id, name, properties }) => await getContent(name, { cache, id, context, properties })
		)
	);
	const resolved = await Promise.all(
		others.map(
			async ({ id, name, properties }) => await getContent(name, { cache, id, context, properties })
		)
	);
	const redirectFound = resolved.find((r) => r?.redirect);
	if (redirectFound) {
		return {
			redirect: {
				destination: (
					redirectFound.redirect +
					'?' +
					constructRedirectURLParameters({ context })
				).replace(
					/\?$/, // remove trailing question mark
					''
				),
				permanent: false,
			},
		};
	}
	await getMeta(cache, context.query.path, context);
	await getFlexFlowStoreFeature({ cache, id: EMS_STORE_FEATURE.SCHEMA_ORG_META_DATA, context });

	return {
		props: {
			fallback: await getMapPromiseValues(cache.getRequestCache()),
		},
	};
};
