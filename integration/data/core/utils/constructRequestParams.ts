/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Settings } from '@/data/Settings';
import { NEW_PREVIEW_SESSION_PARAM, PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';
import { AppContextWrapper } from '@/data/types/AppRouter';
import { canBeCachedByCDN } from '@/data/utils/canBeCachedByCDN';
import { getRequestId } from '@/data/utils/getRequestId';
import { isAppContext } from '@/data/utils/isAppContext';
import { Translation } from 'integration/generated/translations';
import { GetServerSidePropsContext } from 'next';

const EMPTY_PARAMS = {};

/**
 * Construct Server-side Request Parameters for all requests.
 * @returns Request params that contains cookie and/or preview token if applicable.
 */
export const constructRequestParamsWithPreviewToken = ({
	context,
	settings,
	routes,
}: {
	context: GetServerSidePropsContext;
	settings?: Settings;
	routes?: Translation;
}) => {
	if (isAppContext(context)) {
		return { headers: { cookie: (context as AppContextWrapper).extra.cookie } };
	} else {
		const _requestId = getRequestId(context);
		const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
		if (previewToken) {
			if (context.query[NEW_PREVIEW_SESSION_PARAM] === 'true') {
				// new session, not sending any existing cookie
				return {
					_requestId,
					headers: {
						[PREVIEW_TOKEN_PARAM]: previewToken,
					},
				};
			} else {
				return {
					_requestId,
					headers: {
						[PREVIEW_TOKEN_PARAM]: previewToken,
						...(context.req.headers.cookie && {
							cookie: context.req.headers.cookie,
						}),
					},
				};
			}
		} else {
			let passCookieHeader = true;
			if (settings && routes) {
				// if it is CDN cache enabled page, the user information is not relevant,
				// basically, in this case, we treat ourself as generic user, and
				// `passCookieHeader` will be set to false in this case.
				passCookieHeader = !canBeCachedByCDN({ context, settings, routes });
			}
			return {
				_requestId,
				...(context.req.headers.cookie && {
					headers: {
						...(passCookieHeader && {
							cookie: context.req.headers.cookie,
						}),
					},
				}),
			};
		}
	}
};

/**
 * Only construct Request parameters for preview session, returns empty if not in preview
 * Mainly used for the request that does not need to have cookies for regular request, e.g. URLs service
 * @returns Request parameter for preview session, empty if not in preview.
 */
export const constructPreviewTokenHeaderRequestParams = ({
	context,
}: {
	context: GetServerSidePropsContext;
}) => {
	if (isAppContext(context)) {
		return { headers: { cookie: (context as AppContextWrapper).extra.cookie } };
	} else {
		const _requestId = getRequestId(context);
		const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
		if (previewToken) {
			if (context.query[NEW_PREVIEW_SESSION_PARAM] === 'true') {
				// new session, not sending any existing cookie
				return {
					_requestId,
					headers: {
						[PREVIEW_TOKEN_PARAM]: previewToken,
					},
				};
			} else {
				return {
					_requestId,
					headers: {
						[PREVIEW_TOKEN_PARAM]: previewToken,
						...(context.req.headers.cookie && {
							cookie: context.req.headers.cookie,
						}),
					},
				};
			}
		} else {
			return { _requestId, ...EMPTY_PARAMS };
		}
	}
};

export const constructClientPreviewTokenHeaderRequestParams = (
	previewToken: string | undefined
) => {
	if (previewToken) {
		return {
			headers: {
				[PREVIEW_TOKEN_PARAM]: previewToken,
			},
		};
	} else {
		return EMPTY_PARAMS;
	}
};
