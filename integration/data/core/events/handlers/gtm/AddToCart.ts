/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	ADD_TO_CART,
	CHUNK_SIZE,
	GA4_EVENT_ADD_TO_CART,
	PAGE_DATA_LAYER,
} from '@/data/constants/gtm';
import { getGTMAddToCartEventData } from '@/data/events/data/gtm/AddToCart';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMAddToCartPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { chunk, pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of
 *   productFieldObjects.
 * @param data transformed input payload from add-to-cart event (see data-type)
 */
export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMAddToCartEventData>>) => {
	const { products, currencyCode, marketplaceStore, hcl_account, value } = data;
	const dataLayerName = PAGE_DATA_LAYER;

	if (products?.length > 0) {
		const items = products.map(
			({
				partNumber: item_id,
				name: item_name,
				manufacturer: item_brand,
				category: item_category,
				price,
				currency,
				quantity,
				affiliation,
			}) => ({
				item_id,
				item_name,
				...pickBy({ item_brand, item_category, price, currency, quantity }, Boolean),
				affiliation,
				hclMarketplaceSeller: affiliation,
			})
		);
		const eventModel = {
			count_add_to_cart: 1,
			currency: currencyCode,
			items,
			value,
			hcl_account,
			hclMarketplace: marketplaceStore,
		};
		const tagManagerArgsGA4 = {
			dataLayer: { event: GA4_EVENT_ADD_TO_CART, eventModel },
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgsGA4);
	}
};

/**
 * Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of
 *   productFieldObjects.
 * @param data transformed input payload from add-to-cart event (see data-type)
 */
export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMAddToCartEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;

	const { products: _products, currencyCode, marketplaceStore } = data;
	const chunks = chunk(_products, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const products = chunk.map(
			({
				name,
				partNumber: id,
				price,
				manufacturer: brand,
				category,
				quantity,
				affiliation: dimension9,
				variant,
			}) => ({
				name,
				id,
				variant,
				dimension9,
				...pickBy({ brand, category, price, quantity }, Boolean),
			})
		);
		const ecommerce = { currencyCode, add: { products }, dimension10: marketplaceStore };
		TagManager.dataLayer({ dataLayer: { event: ADD_TO_CART, ecommerce }, dataLayerName });
	});
};

export const sendGTMAddToCartEvent = async (payload: GTMAddToCartPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMAddToCartEventData(payload);

		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(undefined, 'AddToCart: sendGTMAddToCartEvent: measure_UA: error: %o', error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(undefined, 'AddToCart: sendGTMAddToCartEvent: measure_GA4: error: %o', error);
			}
		}
	}
};
