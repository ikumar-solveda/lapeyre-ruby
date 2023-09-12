/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	CHUNK_SIZE,
	GA4_EVENT_SELECT_PROMOTION,
	PAGE_DATA_LAYER,
	PROMOTION_CLICK,
} from '@/data/constants/gtm';
import { getGTMPromotionClickEventData } from '@/data/events/data/gtm/PromotionClick';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMPromotionClickPayload } from '@/data/types/GTM';
import { chunk, pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMPromotionClickEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { promotions: _promotions } = data;
	const chunks = chunk(_promotions, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const promotions = chunk.map(
			({
				name: promotion_name,
				id: promotion_id,
				creative: creative_name,
				creative_slot,
				items,
			}) => ({
				promotion_name,
				promotion_id,
				creative_name,
				creative_slot,
				items,
			})
		);
		promotions.forEach((promotion) => {
			const tagManagerArgs = {
				dataLayer: {
					event: GA4_EVENT_SELECT_PROMOTION,
					eventModel: {
						count_select_promotion: 1,
						creative_name: promotion.creative_name,
						creative_slot: promotion.creative_slot,
						promotion_id: promotion.promotion_id,
						promotion_name: promotion.promotion_name,
						items: promotion.items, // The products or skus associated with this promotion
					},
				},
				dataLayerName,
			};
			TagManager.dataLayer(tagManagerArgs);
		});
	});
};

export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMPromotionClickEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { promotions: _promotions } = data;
	const chunks = chunk(_promotions, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const promotions = chunk.map(({ name, id, creative, position: brand }) => ({
			name,
			id,
			...pickBy({ creative, brand }, Boolean),
		}));
		const tagManagerArgs = {
			dataLayer: {
				event: PROMOTION_CLICK,
				ecommerce: { promoClick: { promotions } },
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

export const sendGTMPromotionClickEvent = async (payload: GTMPromotionClickPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMPromotionClickEventData(payload);
		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				console.log(error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				console.log(error);
			}
		}
	}
};
