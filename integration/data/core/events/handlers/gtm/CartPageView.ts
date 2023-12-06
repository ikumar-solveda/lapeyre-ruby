/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PAGE_DATA_LAYER, PAGE_LOAD } from '@/data/constants/gtm';
import { getGTMCartPageViewEventData } from '@/data/events/data/gtm/CartPageView';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMCartPageViewPayload } from '@/data/types/GTM';
import { error as logError } from '@/data/utils/loggerUtil';
import TagManager from 'react-gtm-module';

export const measure_UA = async (data: Awaited<ReturnType<typeof getGTMCartPageViewEventData>>) => {
	const dataLayerName = PAGE_DATA_LAYER;
	const {
		login,
		userID = 0,
		pageTitle,
		pagePath,
		pageCategory,
		pageSubCategory,
		hcl_account,
		listerResults,
	} = data;
	const tagManagerArgs = {
		dataLayer: {
			event: PAGE_LOAD,
			login,
			userID,
			pageTitle,
			pagePath,
			pageCategory,
			pageSubCategory,
			listerResults,
			hcl_account,
		},
		dataLayerName,
	};
	TagManager.dataLayer(tagManagerArgs);
};

export const sendGTMCartPageViewEvent = async (payload: GTMCartPageViewPayload) => {
	const { settings } = payload;
	const { ua } = getGTMConfig(settings);
	if (ua) {
		const data = await getGTMCartPageViewEventData(payload);
		try {
			await measure_UA(data);
		} catch (error) {
			logError(undefined, 'CartPageView: sendGTMCartPageViewEvent: error: %o', error);
		}
	}
};
