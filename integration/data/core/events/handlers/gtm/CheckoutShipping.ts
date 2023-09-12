/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CHECK_OUT, GA4_EVENT_ADD_SHIPPING_INFO, PAGE_DATA_LAYER } from '@/data/constants/gtm';
import { getGTMCheckoutShippingEventData } from '@/data/events/data/gtm/CheckoutShipping';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCheckoutPayload } from '@/data/types/GTM';
import { pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 *  Measure checkout shipping process into the Data Layer using the checkout action
 * @param data transformed input payload from checkout shipping event (see data-type)
 */
export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMCheckoutShippingEventData>>
) => {
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

	// it seems we just pick the last item's shipModeCode -- items may have different shipping-modes
	//   -- do we want to return an array here or a CSV string of all the unique values?
	// const shipping_tier = uniq(products.map(({ shippingTier }) => shippingTier)).join(', ');
	const shipping_tier = products.at(-1)?.shippingTier;

	const eventModel = {
		currency: grandTotalCurrency,
		value: grandTotal,
		shipping_tier,
		items,
		hcl_account,
		hclMarketplace: marketplaceStore,
		count_add_shipping_info: 1,
	};

	const args = { dataLayer: { event: GA4_EVENT_ADD_SHIPPING_INFO, eventModel }, dataLayerName };
	TagManager.dataLayer(args);
};

/**
 * Measure checkout process into the Data Layer using the checkout action.
 * @param data transformed input payload from begin checkout event type (see data-type)
 */
export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMCheckoutShippingEventData>>
) => {
	const { products, grandTotalCurrency = '', marketplaceStore, hcl_account } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: CHECK_OUT,
			ecommerce: {
				currencyCode: grandTotalCurrency,
				checkout: {
					actionField: { step: 2, option: 'payment' },
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

export const sendGTMCheckoutShippingEvent = async (payload: GTMCheckoutPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);
	const data = await getGTMCheckoutShippingEventData(payload);
	if (ua || ga4) {
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
