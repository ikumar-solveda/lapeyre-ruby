/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMPromotionViewEvent } from '@/data/events/handlers/gtm/PromotionView';
import { GTMPromotionViewPayload } from '@/data/types/GTM';

type PromotionViewDelegatorProps = {
	gtm?: GTMPromotionViewPayload;
};

export const promotionViewDelegator = async (payload: PromotionViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMPromotionViewEvent(gtm);
	}
};
