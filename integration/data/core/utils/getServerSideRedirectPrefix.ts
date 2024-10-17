/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { NEXT_DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { encodeRedirectPath } from '@/data/utils/encodeRedirectPath';

/**
 * Helper to construct the redirect prefix for server side redirects.
 * The redirect prefix is the locale and store url keyword if available.
 * e.g. /en-US/store-url-keyword
 */
export const getServerSideRedirectPrefix = ({
	contextLocale,
	storeUrlKeyword,
}: {
	contextLocale?: string;
	storeUrlKeyword?: string;
}) => {
	const _redirectPrefix =
		!contextLocale || contextLocale === NEXT_DEFAULT_LOCALE ? '' : `/${contextLocale}`;
	return storeUrlKeyword
		? `${_redirectPrefix}/${encodeRedirectPath(storeUrlKeyword)}`
		: _redirectPrefix;
};
