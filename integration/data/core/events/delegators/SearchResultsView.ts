/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMSearchResultsViewEvent } from '@/data/events/handlers/gtm/SearchResultsView';
import { GTMSearchResultsViewPayload } from '@/data/types/GTM';

type SearchResultsViewDelegatorProps = {
	gtm?: GTMSearchResultsViewPayload;
};

export const searchResultsViewDelegator = async (payload: SearchResultsViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMSearchResultsViewEvent(gtm);
	}
};
