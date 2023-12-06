/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CHECK_OUT, GA4_EVENT_BEGIN_CHECKOUT, PAGE_DATA_LAYER } from '@/data/constants/gtm';
import { getGTMCheckoutEventData } from '@/data/events/data/gtm/Checkout';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCheckoutPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import { pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure checkout process into the Data Layer using the checkout action.
 * @param data transformed input payload from begin checkout event type (see data-type)
 */
export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMCheckoutEventData>>) => {
	const { products, grandTotal = 0, grandTotalCurrency = '', marketplaceStore, hcl_account } = data;
	const dataLayerName = PAGE_DATA_LAYER;

	const items = products.map(
		({ id: item_id, name: item_name, price, quantity, currency, affiliation }) => ({
			item_id,
			item_name,
			...pickBy({ price, quantity, currency }, Boolean),
			affiliation,
			hclMarketplaceSeller: affiliation,
		})
	);

	const eventModel = {
		currency: grandTotalCurrency,
		value: grandTotal,
		items,
		hcl_account,
		hclMarketplace: marketplaceStore,
		count_begin_checkout: 1,
	};

	const args = { dataLayer: { event: GA4_EVENT_BEGIN_CHECKOUT, eventModel }, dataLayerName };
	TagManager.dataLayer(args);
};

/**
 * Measure checkout process into the Data Layer using the checkout action.
 * @param data transformed input payload from begin checkout event type (see data-type)
 */
export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMCheckoutEventData>>) => {
	const { products, grandTotalCurrency = '', marketplaceStore, hcl_account } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: CHECK_OUT,
			ecommerce: {
				currencyCode: grandTotalCurrency,
				checkout: {
					actionField: { step: 1, option: 'shipping' },
					products,
				},
				hcl_account,
				dimension10: marketplaceStore,
			},
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMCheckoutEvent = async (payload: GTMCheckoutPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);

	if (ua || ga4) {
		const data = await getGTMCheckoutEventData(payload);
		if (ua) {
			try {
				await measure_UA(data);
			} catch (error) {
				logError(undefined, 'Checkout: sendGTMCheckoutEvent: measure_UA: error: %o', error);
			}
		}

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				logError(undefined, 'Checkout: sendGTMCheckoutEvent: measure_GA4: error: %o', error);
			}
		}
	}
};
