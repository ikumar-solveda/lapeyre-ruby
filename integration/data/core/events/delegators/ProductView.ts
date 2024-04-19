/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMProductViewEvent } from '@/data/events/handlers/gtm/ProductView';
import { sendMarketingProductViewEvent } from '@/data/events/handlers/marketing/ProductView';
import { GTMProductViewPayload } from '@/data/types/GTM';
import { MarketingProductViewPayload } from '@/data/types/Marketing';

type ProductViewDelegatorProps = {
	gtm?: GTMProductViewPayload;
	marketing: MarketingProductViewPayload;
};

export const productViewDelegator = async (payload: ProductViewDelegatorProps) => {
	const { gtm, marketing } = payload;
	if (gtm) {
		await sendGTMProductViewEvent(gtm);
	}
	await sendMarketingProductViewEvent(marketing);
};
