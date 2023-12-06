/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	CHUNK_SIZE,
	GA4_EVENT_VIEW_PROMOTION,
	PAGE_DATA_LAYER,
	PROMO_VIEW,
} from '@/data/constants/gtm';
import { getGTMPromotionViewEventData } from '@/data/events/data/gtm/PromotionView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMPromotionViewPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { chunk, pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMPromotionViewEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { promotions: _promotions } = data;
	const chunks = chunk(_promotions, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const promotions = chunk.map(
			({ name: promotion_name, id: promotion_id, creative: creative_name, creative_slot }) => ({
				promotion_name,
				promotion_id,
				creative_name,
				creative_slot,
			})
		);
		promotions.forEach((promotion) => {
			const tagManagerArgs = {
				dataLayer: {
					event: GA4_EVENT_VIEW_PROMOTION,
					eventModel: {
						count_view_promotion: 1,
						creative_name: promotion.creative_name,
						creative_slot: promotion.creative_slot,
						promotion_id: promotion.promotion_id,
						promotion_name: promotion.promotion_name,
						items: undefined, // The products or skus associated with this promotion
					},
				},
				dataLayerName,
			};
			TagManager.dataLayer(tagManagerArgs);
		});
	});
};

export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMPromotionViewEventData>>
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
				event: PROMO_VIEW,
				ecommerce: { promoView: { promotions } },
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

export const sendGTMPromotionViewEvent = async (payload: GTMPromotionViewPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMPromotionViewEventData(payload);
		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(
					undefined,
					'PromotionView: sendGTMPromotionViewEvent: measure_UA: error: %o',
					error
				);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(
					undefined,
					'PromotionView: sendGTMPromotionViewEvent: measure_GA4: error: %o',
					error
				);
			}
		}
	}
};
