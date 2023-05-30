/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_TOKEN_PARAM, NEW_PREVIEW_SESSION_PARAM } from '@/data/constants/preview';
import { GetServerSidePropsContext } from 'next';

const EMPTY_PARAMS = {};

export const constructRequestParamsWithPreviewToken = ({
	context,
}: {
	context: GetServerSidePropsContext;
}) => {
	const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
	if (previewToken) {
		if (context.query[NEW_PREVIEW_SESSION_PARAM] === 'true') {
			// new session, not sending any existing cookie
			return {
				headers: {
					[PREVIEW_TOKEN_PARAM]: previewToken,
				},
			};
		} else {
			return {
				headers: {
					[PREVIEW_TOKEN_PARAM]: previewToken,
					...(context.req.headers.cookie && {
						cookie: context.req.headers.cookie,
					}),
				},
			};
		}
	} else {
		return {
			...(context.req.headers.cookie && {
				headers: {
					cookie: context.req.headers.cookie,
				},
			}),
		};
	}
};

export const constructPreviewTokenHeaderRequestParams = ({
	context,
}: {
	context: GetServerSidePropsContext;
}) => {
	const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
	if (previewToken) {
		if (context.query[NEW_PREVIEW_SESSION_PARAM] === 'true') {
			// new session, not sending any existing cookie
			return {
				headers: {
					[PREVIEW_TOKEN_PARAM]: previewToken,
				},
			};
		} else {
			return {
				headers: {
					[PREVIEW_TOKEN_PARAM]: previewToken,
					...(context.req.headers.cookie && {
						cookie: context.req.headers.cookie,
					}),
				},
			};
		}
	} else {
		return EMPTY_PARAMS;
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
