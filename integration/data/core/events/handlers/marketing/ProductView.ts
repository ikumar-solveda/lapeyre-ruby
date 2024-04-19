/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { triggerMarketingEvent } from '@/data/Content/_Marketing';
import { PRODUCT_DISPLAY } from '@/data/constants/marketing';
import { MarketingProductViewPayload } from '@/data/types/Marketing';

export const sendMarketingProductViewEvent = async (payload: MarketingProductViewPayload) => {
	const { settings, productId, params } = payload;
	const data = {
		DM_ReqCmd: PRODUCT_DISPLAY,
		productId,
	};
	await triggerMarketingEvent(true)(settings.storeId, {}, data, params);
};
