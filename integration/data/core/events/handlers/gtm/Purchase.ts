/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GA4_EVENT_PURCHASE, PAGE_DATA_LAYER, PURCHASE } from '@/data/constants/gtm';
import { getGTMPurchaseEventData } from '@/data/events/data/gtm/Purchase';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMPurchasePayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { pickBy, uniq } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure transaction details into the Data Layer using the purchase action.
 * @param data transformed input payload from purchase event (see data-type)
 */
export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMPurchaseEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;

	const {
		orderId,
		cartValue,
		cartCurrency,
		cartTax,
		cartShipping,
		products,
		hcl_account,
		marketplaceStore,
	} = data;

	const items = products.map(
		({
			name: item_name,
			id: item_id,
			price,
			brand: item_brand,
			category: item_category,
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
					item_list_name: item_category,
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
	const tagManagerArgsGA4 = {
		dataLayer: {
			event: GA4_EVENT_PURCHASE,
			eventModel: {
				transaction_id: orderId,
				...pickBy(
					{ currency: cartCurrency, value: cartValue, tax: cartTax, shipping: cartShipping },
					Boolean
				),
				items,
				hcl_account,
				hclMarketplace: marketplaceStore,
				count_purchase: 1,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgsGA4);
};

/**
 * Measure transaction details into the Data Layer using the purchase action.
 * @param data transformed input payload from purchase event (see data-type)
 */
export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMPurchaseEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const {
		orderId,
		cartValue = 0,
		cartCurrency,
		cartTax = 0,
		cartShipping = 0,
		cartAdjustments = 0,
		products,
		hcl_account,
		marketplaceStore,
	} = data;

	const list = uniq(products.map(({ category }) => category));
	const items = products.map(
		({ name, id, price, brand, category, quantity, coupon, affiliation }) => ({
			name,
			id,
			...pickBy({ price, brand, category, quantity, coupon }, Boolean),
			dimension9: affiliation,
		})
	);

	const tagManagerArgs = {
		dataLayer: {
			event: PURCHASE,
			ecommerce: {
				...(cartCurrency && { currencyCode: cartCurrency }),
				purchase: {
					actionField: {
						id: orderId,
						affiliation: marketplaceStore || 'Online Store', // Order level affiliation (store), not item level affiliation (marketplace seller)
						revenue: cartValue,
						tax: cartTax,
						shipping: cartShipping,
						coupon: cartAdjustments,
						list, // TODO Category list?? - to track purchase by category
					},
					products: items,
				},
				hcl_account,
				dimension10: marketplaceStore,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMPurchaseEvent = async (payload: GTMPurchasePayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMPurchaseEventData(payload);

		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(undefined, 'Purchase: sendGTMPurchaseEvent: measure_UA: error: %o', error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(undefined, 'Purchase: sendGTMPurchaseEvent: measure_GA4: error: %o', error);
			}
		}
	}
};
