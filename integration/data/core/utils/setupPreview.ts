/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { WCP_PREFIX } from '@/data/constants/cookie';
import { PREVIEW_TOKEN_PARAM, NEW_PREVIEW_SESSION_PARAM } from '@/data/constants/preview';
import Cookies from 'cookies';
import { GetServerSidePropsContext } from 'next';

/**
 *
 * @param context Return true if preview info is properly handled
 * @param storeId
 * @returns
 */
export const setupPreview = (context: GetServerSidePropsContext) => {
	if (context.query[PREVIEW_TOKEN_PARAM]) {
		if (context.query[NEW_PREVIEW_SESSION_PARAM] === 'true') {
			const cookie = new Cookies(context.req, context.res);
			const cookieKeys = Object.keys(context.req.cookies);
			cookieKeys.forEach((name) => {
				if (name.startsWith(WCP_PREFIX)) {
					// TODO: Handle delete in store scope
					// delete wcp cookie in the response, persistent cookie is useful for remember me case, so keep it
					cookie.set(name, null, { overwrite: true });
				}
			});
		}
		return true;
	}
	return false;
};
