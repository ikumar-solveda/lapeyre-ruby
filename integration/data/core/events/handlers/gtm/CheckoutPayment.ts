/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CHECK_OUT, GA4_EVENT_ADD_PAYMENT_INFO, PAGE_DATA_LAYER } from '@/data/constants/gtm';
import { getGTMCheckoutPaymentEventData } from '@/data/events/data/gtm/CheckoutPayment';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCheckoutPayload } from '@/data/types/GTM';
import { pickBy } from 'lodash';
import TagManager from 'react-gtm-module';

/**
 * Measure checkout payment process into the Data Layer using the checkout action
 * @param data transformed input payload from checkout payment event (see data-type)
 */
export const measure_GA4 = async (
	data: Awaited<ReturnType<typeof getGTMCheckoutPaymentEventData>>
) => {
	const {
		payMethods = [],
		products,
		grandTotal = 0,
		grandTotalCurrency = '',
		marketplaceStore,
		hcl_account,
	} = data;
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

	// we pick the first payment-method -- there may be more than one -- do we want to return an
	//   array here or a CSV string of all the unique values?
	// const payment_type = uniq(payMethods.map(({ payMethodId }) => payMethodId)).join(', ');
	const payment_type = payMethods[0]?.payMethodId;

	const eventModel = {
		currency: grandTotalCurrency,
		value: grandTotal,
		payment_type,
		items,
		hcl_account,
		hclMarketplace: marketplaceStore,
		count_add_payment_info: 1,
	};

	const args = { dataLayer: { event: GA4_EVENT_ADD_PAYMENT_INFO, eventModel }, dataLayerName };
	TagManager.dataLayer(args);
};

/**
 * Measure checkout process into the Data Layer using the checkout action.
 * @param data transformed input payload from begin checkout event type (see data-type)
 */
export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMCheckoutPaymentEventData>>
) => {
	const { products, grandTotalCurrency = '', marketplaceStore, hcl_account } = data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: CHECK_OUT,
			ecommerce: {
				currencyCode: grandTotalCurrency,
				checkout: {
					actionField: { step: 3, option: 'review' },
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

export const sendGTMCheckoutPaymentEvent = async (payload: GTMCheckoutPayload) => {
	const { settings } = payload;
	const { ga4, ua } = getGTMConfig(settings);
	const data = await getGTMCheckoutPaymentEventData(payload);
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
