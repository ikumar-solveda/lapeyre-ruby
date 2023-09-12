import { ID } from '@/data/types/Basic';
import { CategoryType } from '@/data/types/Category';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { queryV2CategoryResource } from 'integration/generated/query';
import { RequestParams } from 'integration/generated/query/http-client';

/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
export const categoryFetcher =
	(pub: boolean) =>
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
			console.log(error);
			// on client-side, this is a legitimate error (most likely an indicated session-error) --
			//   throw it and we can try to handle it
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
