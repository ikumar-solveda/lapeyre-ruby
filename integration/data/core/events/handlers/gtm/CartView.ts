/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GA4_EVENT_VIEW_CART, PAGE_DATA_LAYER } from '@/data/constants/gtm';
import { getGTMCartViewEventData } from '@/data/events/data/gtm/CartView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCartViewPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure view cart process into the Data Layer using the view cart action.
 * @param data transformed input payload from cart-view event (see data-type)
 */
export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMCartViewEventData>>) => {
	const { cart, products, hcl_account, marketplaceStore: hclMarketplace } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const items = products.map(
		({
			name: item_name,
			id: item_id,
			price,
			brand: item_brand,
			category: item_category,
			variant: item_variant,
			quantity,
			coupon,
			currency,
			tax,
			discount,
			affiliation,
		}) => ({
			item_name,
			item_id,
			...pickBy(
				{
					price,
					item_brand,
					item_category,
					item_variant,
					quantity,
					coupon,
					currency,
					tax,
					discount,
				},
				Boolean
			),
			affiliation,
			hclMarketplaceSeller: affiliation,
		})
	);
	const { grandTotalCurrency: currency, grandTotal: value } = cart;
	const tagManagerArgsGA4 = {
		dataLayer: {
			event: GA4_EVENT_VIEW_CART,
			eventModel: {
				count_view_cart: 1,
				currency,
				...(items?.length && { items }),
				value,
				hcl_account,
				hclMarketplace,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgsGA4);
};

export const sendGTMCartViewEvent = async (payload: GTMCartViewPayload) => {
	const { settings } = payload;
	const { ga4 } = getGTMConfig(settings);
	if (ga4) {
		const data = await getGTMCartViewEventData(payload);
		try {
			await measure_GA4(data);
		} catch (error) {
			logError(undefined, 'CartView: sendGTMCartViewEvent: error: %o', error);
		}
	}
};
