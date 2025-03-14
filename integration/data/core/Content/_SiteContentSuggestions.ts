/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import {
	SKU_SUGGESTION_PAGE_NUMBER,
	SKU_SUGGESTION_PAGE_SIZE,
	SKU_SUGGESTION_PROFILE_NAME,
	SKU_SUGGESTION_SEARCH_TYPE,
} from '@/data/constants/siteContentSuggestion';
import { SuggestionBySearchTermQuery } from '@/data/types/SiteContentSuggestion';
import { RequestParams } from 'integration/generated/query/http-client';
import querySiteContentResource from 'integration/generated/query/querySiteContentResource';

export const partNumberSuggestionFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		searchTerm: string,
		query: SuggestionBySearchTermQuery,
		params: RequestParams = {},
		searchType?: number
	) =>
		querySiteContentResource(pub).findProductSuggestionsBySearchTerm(
			storeId,
			searchTerm,
			{
				searchType: searchType ?? SKU_SUGGESTION_SEARCH_TYPE,
				term: true,
				pageSize: SKU_SUGGESTION_PAGE_SIZE,
				pageNumber: SKU_SUGGESTION_PAGE_NUMBER,
				profileName: SKU_SUGGESTION_PROFILE_NAME,
				...query,
			} as SuggestionBySearchTermQuery,
			params
		);
