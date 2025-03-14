/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	GA4_EVENT_SEARCH,
	GA4_EVENT_VIEW_SEARCH_RESULTS,
	KEYWORD_SEARCH,
	ONSITE_SEARCH,
	PAGE_DATA_LAYER,
} from '@/data/constants/gtm';
import { getGTMSearchResultsViewEventData } from '@/data/events/data/gtm/SearchResultsView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMSearchResultsViewPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import TagManager from 'react-gtm-module';

/**
 * Measure keyword search.
 *
 * @param data transformed input payload from view search event (see data-type)
 */
export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMSearchResultsViewEventData>>
) => {
	const { search_term, search_type, numberOfResults: productResults, page_number, products } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	// search event
	const searchEventTagManagerArgs = {
		dataLayer: {
			event: GA4_EVENT_SEARCH,
			eventModel: { search_term, search_type },
		},
		dataLayerName,
	};
	TagManager.dataLayer(searchEventTagManagerArgs);
	// view_search_results event
	const viewSearchResultsTagManagerArgs = {
		dataLayer: {
			event: GA4_EVENT_VIEW_SEARCH_RESULTS,
			eventModel: {
				search_term,
				search_type,
				number_of_results: productResults,
				page_number,
				products,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(viewSearchResultsTagManagerArgs);
};

/**
 * Measure keyword search.
 *
 * @param data transformed input payload from view search event (see data-type)
 */
export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMSearchResultsViewEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { search_term = '', numberOfResults: productResults = 0 } = data;
	const tagManagerArgs = {
		dataLayer: {
			event: KEYWORD_SEARCH,
			// pageTitle: pageObj.pageTitle,  // TODO The old store sent the page information
			// pagePath: pageObj.pagePath,
			pageCategory: ONSITE_SEARCH,
			onsiteSearch: productResults > 0 ? 'Successful Search' : 'Zero Search',
			searchTerm: search_term,
			productResults,
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMSearchResultsViewEvent = async (payload: GTMSearchResultsViewPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMSearchResultsViewEventData(payload);

		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(
					undefined,
					'SearchResultsView: sendGTMSearchResultsViewEvent: measure_UA: error: %o',
					error
				);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(
					undefined,
					'SearchResultsView: sendGTMSearchResultsViewEvent: measure_GA4: error: %o',
					error
				);
			}
		}
	}
};
