/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { triggerMarketingEvent } from '@/data/Content/_Marketing';
import { EMPTY_STRING, SEARCH_DISPLAY } from '@/data/constants/marketing';
import { MarketingSearchResultsViewPayload } from '@/data/types/Marketing';

export const sendMarketingSearchResultsViewEvent = async (
	payload: MarketingSearchResultsViewPayload
) => {
	const { settings, searchTerm, params } = payload;
	const data = {
		searchTerm: searchTerm ?? EMPTY_STRING,
		DM_ReqCmd: SEARCH_DISPLAY,
	};
	await triggerMarketingEvent(true)(settings.storeId, {}, data, params);
};
