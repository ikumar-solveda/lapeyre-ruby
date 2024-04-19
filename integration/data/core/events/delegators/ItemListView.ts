/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMItemListViewEvent } from '@/data/events/handlers/gtm/ItemListView';
import { sendMarketingItemListViewEvent } from '@/data/events/handlers/marketing/ItemListView';
import { GTMItemListViewPayload } from '@/data/types/GTM';
import { MarketingItemListViewPayload } from '@/data/types/Marketing';

type ItemListViewDelegatorProps = {
	gtm?: GTMItemListViewPayload;
	marketing?: MarketingItemListViewPayload;
};

export const itemListViewDelegator = async (payload: ItemListViewDelegatorProps) => {
	const { gtm, marketing } = payload;
	if (gtm) {
		await sendGTMItemListViewEvent(gtm);
	}
	if (marketing) {
		await sendMarketingItemListViewEvent(marketing);
	}
};
