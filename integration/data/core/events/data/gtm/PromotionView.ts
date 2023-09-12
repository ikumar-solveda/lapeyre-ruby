/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMPromotionViewPayload } from '@/data/types/GTM';

export const getGTMPromotionViewEventData = async (payload: GTMPromotionViewPayload) => {
	const { activity, position } = payload;
	const {
		contentId: id = '',
		contentName: name = '',
		baseMarketingSpotActivityName: creative_slot = '',
		baseMarketingSpotDataType: creative = '',
	} = activity;
	const promotions = [{ id, name, creative, creative_slot, position }];
	return { promotions };
};
