/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// TODO: Remove this file, the file is not being used anywhere.
import { RequestParams } from 'integration/generated/transactions/http-client';
import { PREVIEW_TOKEN_PREFIX } from '@/data/constants/cookie';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';

const PREVIEW_TOKEN_PARAM = 'WCPreviewToken';

/**
 * Checks for WCPreviewToken cookie in the context request or the response (for the case where this is the first Preview request)
 * and if present, add the preview header to the API service request parameters.
 *
 * @param req The request object
 * @param res The response object
 * @param params Object of request parameters
 * @returns copy of input request parameters with preview header applied, if applicable
 */
export const setPreviewHeaders = (
	req: IncomingMessage,
	res: ServerResponse,
	storeId: string,
	params: RequestParams
): RequestParams => {
	const previewToken = getPreviewToken(req, res, storeId);
	return previewToken
		? { ...params, headers: { ...params.headers, [PREVIEW_TOKEN_PARAM]: previewToken } }
		: params;
};

/**
 * Gets the preview token from the context request or the response
 * @param req
 * @param res
 * @returns The value of the WCPreviewToken, if found
 */
export const getPreviewToken = (
	req: IncomingMessage,
	res: ServerResponse,
	storeId: string
): string | undefined => {
	const cookie = new Cookies(req, res);
	const cookieName = PREVIEW_TOKEN_PREFIX + storeId;
	let previewToken = cookie.get(cookieName) ? cookie.get(cookieName) : '';

	if (!previewToken && res.hasHeader('set-cookie')) {
		const responseCookies = res.getHeader('set-cookie');
		const responseCookiesArray = Array.isArray(responseCookies)
			? responseCookies
			: [responseCookies];
		responseCookiesArray.forEach((element) => {
			if (element && element.toString().startsWith(cookieName)) {
				const previewCookie = parseCookieHeader(element.toString());
				previewToken = previewCookie[cookieName];
			}
		});
	}
	return previewToken;
};

export const shouldAddPreviewToken = (query: ParsedUrlQuery): boolean => {
	// Ignore specific endpoints as backend services fail, even if given a valid preview token
	// This can be removed if backend services are fixed
	const ignorePreviewEndpoints = ['online_store', 'adminLookup'];

	let addPreviewToken = true;
	if (query.all) {
		const queryArray = Array.isArray(query.all) ? query.all : [query.all];
		addPreviewToken = !queryArray.some((element) => ignorePreviewEndpoints.includes(element));
	}
	return addPreviewToken;
};

const parseCookieHeader = (cookie: string): { [key: string]: string } =>
	cookie
		.split(';')
		.map((pair) => pair.split('='))
		.reduce((obj: { [key: string]: string }, nvp) => {
			obj[decodeURIComponent(nvp[0].trim())] = nvp[1] ? decodeURIComponent(nvp[1].trim()) : '';
			return obj;
		}, {});
