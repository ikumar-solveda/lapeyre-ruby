/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { CategoryType } from '@/data/types/Category';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { error as logError } from '@/data/utils/loggerUtil';
import { queryV2CategoryResource } from 'integration/generated/query';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';

export const categoryFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * The data fetcher for Category
	 * @param query The request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched Category data.
	 */
	async (
		query: {
			storeId: string;
			[key: string]: string | boolean | ID | ID[];
		},
		params: RequestParams
	): Promise<CategoryType[] | undefined> => {
		try {
			return extractContentsArray(
				await queryV2CategoryResource(pub).getV2CategoryResources(query, params)
			);
		} catch (error) {
			logError(context?.req, '_Category: categoryFetcher: error: %o', error);
			// on client-side, this is a legitimate error (most likely an indicated session-error) --
			//   throw it and we can try to handle it
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
