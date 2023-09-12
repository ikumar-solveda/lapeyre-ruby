/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMPromotionClickEvent } from '@/data/events/handlers/gtm/PromotionClick';
import { GTMPromotionClickPayload } from '@/data/types/GTM';

type PromotionClickDelegatorProps = {
	gtm?: GTMPromotionClickPayload;
};

export const promotionClickDelegator = async (payload: PromotionClickDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMPromotionClickEvent(gtm);
	}
};
