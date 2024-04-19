/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMSearchResultsViewEvent } from '@/data/events/handlers/gtm/SearchResultsView';
import { sendMarketingSearchResultsViewEvent } from '@/data/events/handlers/marketing/SearchResultsView';
import { GTMSearchResultsViewPayload } from '@/data/types/GTM';
import { MarketingSearchResultsViewPayload } from '@/data/types/Marketing';

type SearchResultsViewDelegatorProps = {
	gtm?: GTMSearchResultsViewPayload;
	marketing: MarketingSearchResultsViewPayload;
};

export const searchResultsViewDelegator = async (payload: SearchResultsViewDelegatorProps) => {
	const { gtm, marketing } = payload;
	if (gtm) {
		await sendGTMSearchResultsViewEvent(gtm);
	}
	await sendMarketingSearchResultsViewEvent(marketing);
};
