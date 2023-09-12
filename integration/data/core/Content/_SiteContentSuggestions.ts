/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { RequestParams } from 'integration/generated/query/http-client';
import { querySiteContentResource } from 'integration/generated/query';
import {
	SKU_SUGGESTION_SEARCH_TYPE,
	SKU_SUGGESTION_PAGE_SIZE,
	SKU_SUGGESTION_PAGE_NUMBER,
	SKU_SUGGESTION_PROFILE_NAME,
} from '@/data/constants/siteContentSuggestion';
import { SuggestionBySearchTermQuery } from '@/data/types/SiteContentSuggestion';

export const partNumberSuggestionFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		searchTerm: string,
		query: SuggestionBySearchTermQuery,
		params: RequestParams = {}
	) =>
		querySiteContentResource(pub).findProductSuggestionsBySearchTerm(
			storeId,
			searchTerm,
			{
				searchType: SKU_SUGGESTION_SEARCH_TYPE,
				term: true,
				pageSize: SKU_SUGGESTION_PAGE_SIZE,
				pageNumber: SKU_SUGGESTION_PAGE_NUMBER,
				profileName: SKU_SUGGESTION_PROFILE_NAME,
				...query,
			} as SuggestionBySearchTermQuery,
			params
		);
