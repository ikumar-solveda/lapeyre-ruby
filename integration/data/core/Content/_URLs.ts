/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { queryV2UrlResource } from 'integration/generated/query';
import { RequestParams } from 'integration/generated/query/http-client';

export const URLsFetcher =
	(pub: boolean) =>
	async (
		query: {
			/** @format int32 */
			storeId: number;
			identifier?: string[];
		},
		params: RequestParams = {}
	) =>
		await queryV2UrlResource(pub).getV2CategoryResources1(query, params);
