/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ACTIVITY_CONTENT, ACTIVITY_PRODUCT } from '@/data/constants/gtm';
import { GTMPromotionClickPayload, GTMRecommendationCatalogEntry } from '@/data/types/GTM';

export const getGTMPromotionClickEventData = async (payload: GTMPromotionClickPayload) => {
	const { activity, type, position } = payload;
	const {
		contentId,
		contentName,
		activityIdentifierID,
		activityIdentifierName,
		baseMarketingSpotDataType,
		baseMarketingSpotActivityName,
		productPartNumber: item_id,
		description,
	} = activity;

	let items: GTMRecommendationCatalogEntry[] | undefined;
	let id;
	let name;
	let creative;
	let creative_slot;

	if (type === ACTIVITY_CONTENT) {
		id = contentId;
		name = contentName;
	} else {
		id = activityIdentifierID;
		name = activityIdentifierName;
		creative = baseMarketingSpotDataType;
		creative_slot = baseMarketingSpotActivityName;
		if (type === ACTIVITY_PRODUCT) {
			items = [{ item_id, item_name: description?.at(0)?.productName as string }];
		}
	}

	const promotions = [{ id, name, creative, creative_slot, position, items }];
	return { promotions };
};
