/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	CHUNK_SIZE,
	GA4_EVENT_VIEW_ITEM_LIST,
	PAGE_DATA_LAYER,
	PRODUCT_IMPRESSION,
} from '@/data/constants/gtm';
import { getGTMItemListViewEventData } from '@/data/events/data/gtm/ItemListView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMItemListViewPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { chunk, pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure the item list viewed.
 *
 * @param data transformed input payload from item-list-viewed event (see data-type)
 */
export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMItemListViewEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;

	const { products, listPageName: item_list_name, storeName } = data;

	const chunks = chunk(products, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const items = chunk.map(
			({ name, partNumber, productPrice, manufacturer: item_brand, position }) => ({
				item_name: name,
				item_id: partNumber,
				hclMarketplace: storeName,
				index: position,
				...pickBy(
					{
						price: productPrice?.offer,
						item_brand,
						item_list_name,
						currency: productPrice?.currency,
					},
					Boolean
				),
				affiliation: undefined, // This should be the Seller Organization name
				hclMarketplaceSeller: undefined, // This should be the Seller Organization name
			})
		);
		const currency = products.length > 0 ? products[0].productPrice?.currency : undefined;
		const tagManagerArgs = {
			dataLayer: {
				event: GA4_EVENT_VIEW_ITEM_LIST,
				currency,
				eventModel: {
					count_view_item_list: 1,
					item_list_name,
					item_list_id: item_list_name,
					items,
					hclMarketplace: storeName,
				},
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

/**
 * Measure the item list viewed.
 *
 * @param data transformed input payload from item-list-viewed event (see data-type)
 */
export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMItemListViewEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;

	const { products, listPageName, storeName } = data;
	const currencyCode = products[0]?.productPrice?.currency;

	// TODO - seller organization name, not internal ID
	const chunks = chunk(products, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const items = chunk.map(
			({ name, partNumber, productPrice, manufacturer: brand, position }) => ({
				name,
				id: partNumber,
				position,
				...pickBy(
					{
						price: productPrice?.offer,
						brand,
						list: listPageName,
					},
					Boolean
				),
				dimension9: undefined, // This should be the Seller Organization name
				dimension10: storeName,
				affiliation: undefined, // This should be the Seller Organization name
			})
		);
		const tagManagerArgs = {
			dataLayer: {
				event: PRODUCT_IMPRESSION,
				ecommerce: { currencyCode, impressions: items, dimension10: storeName },
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

export const sendGTMItemListViewEvent = async (payload: GTMItemListViewPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMItemListViewEventData(payload);

		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(undefined, 'ItemListView: sendGTMItemListViewEvent: measure_UA: error: %o', error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(
					undefined,
					'ItemListView: sendGTMItemListViewEvent: measure_GA4: error: %o',
					error
				);
			}
		}
	}
};
