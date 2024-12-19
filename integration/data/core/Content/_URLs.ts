/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import queryV2UrlResource from 'integration/generated/query/queryV2UrlResource';
import { GetServerSidePropsContext } from 'next';

export const URLsFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		query: {
			/** @format int32 */
			storeId: number;
			identifier?: string[];
			searchTerm?: string;
		},
		params: RequestParams = {}
	) => {
		try {
			return await queryV2UrlResource(pub).getV2CategoryResources1(query, params);
		} catch (error) {
			errorWithId(getRequestId(context), 'URLsFetcher: URLsFetcher: error', {
				error,
			});
			if (pub) {
				throw error;
			}
		}
	};
