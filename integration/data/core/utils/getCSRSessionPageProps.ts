/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getPageProps } from '@/utils/getPageProps';

/**
 * A wrap around original `getPageProps` to determine Notfound.
 * Return empty page props if not a NotFound.
 */
export const getCSRSessionPageProps = async ({
	context,
	cache,
}: Parameters<typeof getPageProps>[0]) => {
	const pageProps = await getPageProps({ context, cache });
	return pageProps.notFound ? pageProps : {};
};
