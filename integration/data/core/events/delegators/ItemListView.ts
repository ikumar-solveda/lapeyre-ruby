/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMItemListViewEvent } from '@/data/events/handlers/gtm/ItemListView';
import { GTMItemListViewPayload } from '@/data/types/GTM';

type ItemListViewDelegatorProps = {
	gtm?: GTMItemListViewPayload;
};

export const itemListViewDelegator = async (payload: ItemListViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMItemListViewEvent(gtm);
	}
};
