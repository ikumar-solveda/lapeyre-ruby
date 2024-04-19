/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { triggerMarketingEvent } from '@/data/Content/_Marketing';
import { CATEGORY_DISPLAY } from '@/data/constants/marketing';
import { MarketingItemListViewPayload } from '@/data/types/Marketing';

export const sendMarketingItemListViewEvent = async (payload: MarketingItemListViewPayload) => {
	const { settings, categoryId, params } = payload;
	const data = {
		DM_ReqCmd: CATEGORY_DISPLAY,
		categoryId,
	};
	await triggerMarketingEvent(true)(settings.storeId, {}, data, params);
};
