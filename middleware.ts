/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { EMAIL_ROUTE } from '@/data/constants/emailTemplate';
import { REQUEST_ID_HEADER_KEY } from '@/data/constants/environment';
import { OLD_SITEMAP_ROUTE, SITEMAP_ROUTE } from '@/data/constants/sitemap';
import { emailTemplateLayoutManifest } from '@/data/email/views/manifest';
import { debugWithId } from '@/data/utils/loggerUtil';
import { NextResponse, type NextRequest } from 'next/server';

const emailViewNames = Object.keys(emailTemplateLayoutManifest)
	.map((view) => `${view}View`)
	.join('|');
const emailViewNamesRE = new RegExp(`(.*/)(${emailViewNames})`);
const sitemapRE = new RegExp(`(.*/)(${OLD_SITEMAP_ROUTE})`);

export const middleware = (request: NextRequest) => {
	const requestId = crypto.randomUUID();
	const headers = new Headers(request.headers);
	headers.set(REQUEST_ID_HEADER_KEY, requestId);
	const update = { request: { headers } };

	const emailMatch = request.nextUrl.pathname.match(emailViewNamesRE);
	const sitemapMatch = request.nextUrl.pathname.match(sitemapRE);
	let response: NextResponse;

	if (emailMatch && emailMatch[1] !== EMAIL_ROUTE) {
		const prefix = request.url.replace(`${request.nextUrl.pathname}${request.nextUrl.search}`, '');
		const pathname = `${EMAIL_ROUTE}${emailMatch[2]}`;
		const rewrite = `${prefix}${pathname}${request.nextUrl.search}`;

		/**
		 * the Next.JS server's hosting of email templates is under the `/email/` route -- older
		 *   invocations (from TS) of email rendering requests will have been updated to remove the
		 *   `/wcs/shop/` context-path (that was used for CRS) to just be blank -- consequently, those
		 *   requests will now land at the root of the Next.JS server without the `/email/` route that
		 *	 we have specifically defined for email templates -- here we check for the route that is
		 *   invoked against the set of email templates that we have implemented (using keys of the
		 *   manifest) and if the route matches but without the `/email/` prefix, we do a rewrite
		 */
		debugWithId(requestId, 'Matched old email-template', { old: request.url, new: rewrite });
		response = NextResponse.rewrite(rewrite, update);
	} else if (sitemapMatch) {
		const prefix = request.url.replace(`${request.nextUrl.pathname}${request.nextUrl.search}`, '');
		const rewrite = `${prefix}${SITEMAP_ROUTE}${request.nextUrl.search}`;

		/**
		 * route any old CRS-type seo sitemap generation requests to the new sitemap generator
		 */
		debugWithId(requestId, 'Matched old sitemap-generator', { old: request.url, new: rewrite });
		response = NextResponse.rewrite(rewrite, update);
	} else {
		response = NextResponse.next(update);
	}
	response.headers.set(REQUEST_ID_HEADER_KEY, requestId);

	return response;
};
