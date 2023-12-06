/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	CHUNK_SIZE,
	GA4_EVENT_SELECT_ITEM,
	PAGE_DATA_LAYER,
	PRODUCT_CLICK,
} from '@/data/constants/gtm';
import { getGTMProductClickEventData } from '@/data/events/data/gtm/ProductClick';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMProductClickPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { chunk, pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMProductClickEventData>>
) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { products: _products, currencyCode, marketplaceStore } = data;
	const chunks = chunk(_products, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const products = chunk.map(({ name, id, price, brand, category, position, affiliation }) => ({
			item_name: name,
			item_id: id,
			item_brand: brand,
			item_category: category,
			...pickBy({ price, position }, Boolean),
			affiliation,
			hclMarketplaceSeller: affiliation,
			hclMarketplace: marketplaceStore,
		}));

		const tagManagerArgs = {
			dataLayer: {
				event: GA4_EVENT_SELECT_ITEM,
				eventModel: { count_select_item: 1, currency: currencyCode, items: products },
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMProductClickEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const { products: _products, currencyCode, marketplaceStore } = data;
	const chunks = chunk(_products, CHUNK_SIZE);
	chunks.forEach((chunk) => {
		const products = chunk.map(({ name, id, price, brand, category, position, affiliation }) => ({
			name,
			id,
			...pickBy({ price, brand, category, position }, Boolean),
			dimension9: affiliation,
			dimension10: marketplaceStore,
		}));
		const list = chunk[0]?.list;
		const tagManagerArgs = {
			dataLayer: {
				event: PRODUCT_CLICK,
				ecommerce: { currencyCode, click: { actionField: { list }, products } },
			},
			dataLayerName,
		};
		TagManager.dataLayer(tagManagerArgs);
	});
};

export const sendGTMProductClickEvent = async (payload: GTMProductClickPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMProductClickEventData(payload);
		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(undefined, 'ProductClick: sendGTMProductClickEvent: measure_UA: error: %o', error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(
					undefined,
					'ProductClick: sendGTMProductClickEvent: measure_GA4: error: %o',
					error
				);
			}
		}
	}
};
