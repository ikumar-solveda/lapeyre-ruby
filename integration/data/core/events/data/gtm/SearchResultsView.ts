/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GA4_EVENT_SEARCH_TYPE_PRODUCT } from '@/data/constants/gtm';
import { GTMSearchResultsViewPayload } from '@/data/types/GTM';

export const getGTMSearchResultsViewEventData = async (payload: GTMSearchResultsViewPayload) => {
	const { searchTerm, numberOfResults, pageNumber, products } = payload;
	return {
		search_term: decodeURIComponent(searchTerm),
		numberOfResults,
		search_type: GA4_EVENT_SEARCH_TYPE_PRODUCT,
		page_number: pageNumber,
		products,
	};
};
