/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Settings } from '@/data/_Settings';
import { User } from '@/data/_User';
import { DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import {
	COMMERCE_PAGE_VIEW_NAME_REDIRECT,
	COMMERCE_PAGE_VIEW_NAME_SEARCH,
} from '@/data/constants/page';
import { dataRouteManifest } from '@/data/containers/manifest';
import { searchTermAssociationFetcher } from '@/data/Content/_SearchTermAssociationFetcher';
import { URLsFetcher } from '@/data/Content/_URLs';
import { IncomingContent } from '@/data/types/IncomingContent';
import { Order } from '@/data/types/Order';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type PageDataLookup = {
	storeId: string;
	path: ParsedUrlQuery['path'];
	localeId: string;
	locale?: string;
	user: Partial<User>;
	identifier: string | undefined;
	searchTerm?: string;
	cart?: Order | boolean; // cart: no cart or cart is empty.
	settings?: Settings;
};
const checkIdentifier = (identifier: string): any => identifier?.split('/').pop() ?? 'home';
export const pageDataRuntimeFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		{
			storeId,
			searchTerm: theSearchTerm,
			identifier: theIdentifier,
			staticRoutePageData,
		}: {
			storeId: string;
			identifier: string;
			searchTerm?: string;
			staticRoutePageData?: IncomingContent;
		},
		params: RequestParams
	): Promise<PageDataFromId | undefined> => {
		let identifier = theIdentifier;
		let searchTerm = theSearchTerm;
		identifier = checkIdentifier(identifier);
		identifier = identifier?.split('/').pop();

		if (theSearchTerm && staticRoutePageData?.tokenExternalValue === dataRouteManifest.Search) {
			// a search result page with searchTerm,
			const searchAssociationData = await searchTermAssociationFetcher(
				pub,
				context
			)({ storeId, searchTerm: theSearchTerm, params });
			if (searchAssociationData) {
				const { redirecturl, viewTaskName } = searchAssociationData;
				if (viewTaskName === COMMERCE_PAGE_VIEW_NAME_REDIRECT && redirecturl) {
					// e.g. of redirecturl: /privacy-policy?storeId=10001&*=
					const redirect = redirecturl
						.replace('*=', '')
						.replace(/[\?\&]$/, '')
						.replace(/^\//, '');
					const { page, ...other } = DEFAULT_PAGE_DATA;
					return Promise.resolve({
						...other,
						page: { ...page, redirect, permanent: false },
					});
				} else if (viewTaskName !== COMMERCE_PAGE_VIEW_NAME_SEARCH) {
					identifier = viewTaskName; // landing page for search term.
					searchTerm = undefined;
				}
			}
		} // const data = await URLsFetcher(pub, context)(
		let data = await URLsFetcher(pub, context)(
			{
				storeId: Number(storeId),
				identifier: [identifier],
				...(searchTerm && { searchTerm }), // searchTerm take precedence over identifier at query search server.
			},
			params as any
		);
		data = checkResponse(data, identifier);
		const pageData = extractContentsArray(data).at(0);
		console.log('###insideV2', '##pageData', pageData);
		if (pageData) {
			// if the url keyword does not have corresponding page defined at commerce server(search)
			// server respond with an empty contents array instead of 404
			if (pageData.redirect) {
				// url keyword was modified, old url redirect to new URL.
				const { page, ...other } = DEFAULT_PAGE_DATA;
				return Promise.resolve({
					...other,
					page: { ...page, redirect: `${pageData.redirect}`, permanent: true },
				});
			} else {
				return pageData;
			}
		}
	};

const checkResponse = (data: any, identifier: string): any => {
	if (!data || !data.contents || !data.contents[0]) {
		if (identifier === 'home') {
			return {
				contents: [
					{
						page: {
							type: 'HomePage',
							name: 'home',
							title: 'Lapeyre - Multispécialiste de la maison',
						},
						layout: {
							id: '3074457345618271107',
							name: 'Home Page Layout',
							containerName: 'home-page',
							startDate: null,
							endDate: null,
							priority: 0,
							slots: [],
						},
						tokenExternalValue: 'HomePage',
						identifier: 'home',
						'store.type': 'MHS',
						language: 'fr_FR',
						status: 1,
						id: '3074457345618271107',
					},
				],
			};
		}
	}
	return data;
};
