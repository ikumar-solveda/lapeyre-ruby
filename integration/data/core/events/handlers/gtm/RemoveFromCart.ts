/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	GA4_EVENT_REMOVE_FROM_CART,
	PAGE_DATA_LAYER,
	REMOVE_FROM_CART,
} from '@/data/constants/gtm';
import { getGTMRemoveFromCartEventData } from '@/data/events/data/gtm/RemoveFromCart';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMRemoveFromCartPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMRemoveFromCartEventData>>
) => {
	const {
		name: item_name,
		currency,
		partNumber: item_id,
		price,
		quantity,
		affiliation,
		marketplaceStore,
		hcl_account,
	} = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: GA4_EVENT_REMOVE_FROM_CART,
			eventModel: {
				...pickBy({ currency, value: price }, Boolean),
				items: [
					{
						item_id,
						item_name,
						...pickBy({ item_variant: item_id, price, currency, quantity }, Boolean),
						affiliation,
						hclMarketplaceSeller: affiliation,
					},
				],
				count_remove_from_cart: 1,
				hcl_account,
				hclMarketplace: marketplaceStore,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMRemoveFromCartEventData>>
) => {
	const { name, currency, partNumber, price, quantity, affiliation, marketplaceStore } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: REMOVE_FROM_CART,
			ecommerce: {
				currencyCode: currency,
				remove: {
					products: [
						{
							name,
							id: partNumber,
							...pickBy({ price, quantity }, Boolean),
							dimension9: affiliation,
							dimension10: marketplaceStore,
						},
					],
				},
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMRemoveFromCartEvent = async (payload: GTMRemoveFromCartPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ga4 || ua) {
		const data = await getGTMRemoveFromCartEventData(payload);

		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(
					undefined,
					'RemoveFromCart: sendGTMRemoveFromCartEvent: measure_UA: error: %o',
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
					'RemoveFromCart: sendGTMRemoveFromCartEvent: measure_GA4: error: %o',
					error
				);
			}
		}
	}
};
