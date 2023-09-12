/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PAGE_DATA_LAYER, PAGE_LOAD } from '@/data/constants/gtm';
import { getGTMCheckoutPageViewEventData } from '@/data/events/data/gtm/CheckoutPageView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCheckoutPageViewPayload } from '@/data/types/GTM';
import TagManager from 'react-gtm-module';

/**
 * Measure Checkout Page View of the pages user visits
 * @param data transformed input payload from checkout page event (see data-type)
 */
export const measure_UA = async (
	data: Awaited<ReturnType<typeof getGTMCheckoutPageViewEventData>>
) => {
	const { isLoggedIn, userId, pageTitle, pagePath, pageCategory, pageSubCategory, hcl_account } =
		data;
	const dataLayerName = PAGE_DATA_LAYER;
	const tagManagerArgs = {
		dataLayer: {
			event: PAGE_LOAD,
			login: isLoggedIn,
			userID: userId,
			pageTitle,
			pagePath,
			pageCategory,
			pageSubCategory,
			listerResults: '',
			hcl_account,
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMCheckoutPageViewEvent = async (payload: GTMCheckoutPageViewPayload) => {
	const { settings } = payload;
	const { ua } = getGTMConfig(settings);

	if (ua) {
		const data = await getGTMCheckoutPageViewEventData(payload);
		try {
			await measure_UA(data);
		} catch (error) {
			console.log(error);
		}
	}
};
