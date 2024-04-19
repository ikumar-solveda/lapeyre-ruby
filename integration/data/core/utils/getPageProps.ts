/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getContent } from '@/data/Content';
import { getLayout } from '@/data/Layout';
import { getMeta } from '@/data/Meta';
import { Cache } from '@/data/types/Cache';
import { constructRedirectURLParameters } from '@/data/utils/constructRedirectURLParameters';
import { getRequestId } from '@/data/utils/getRequestId';
import { traceWithId } from '@/data/utils/loggerUtil';
import { getMapPromiseValues } from '@/utils/getMapPromiseValues';
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
				destination: layout.redirect + '?' + constructRedirectURLParameters({ context }),
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
	await Promise.all(
		others.map(
			async ({ id, name, properties }) => await getContent(name, { cache, id, context, properties })
		)
	);
	await getMeta(cache, context.query.path, context);

	return {
		props: {
			fallback: await getMapPromiseValues(cache.getRequestCache()),
		},
	};
};
