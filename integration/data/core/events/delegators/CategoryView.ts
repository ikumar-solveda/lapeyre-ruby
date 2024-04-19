/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { sendMarketingCategoryViewEvent } from '@/data/events/handlers/marketing/CategoryView';
import { MarketingCategoryViewPayload } from '@/data/types/Marketing';

type CategoryViewDelegatorProps = {
	marketing: MarketingCategoryViewPayload;
};

export const categoryViewDelegator = async (payload: CategoryViewDelegatorProps) => {
	const { marketing } = payload;
	await sendMarketingCategoryViewEvent(marketing);
};
