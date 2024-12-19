/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { GA4_LOGOUT, PAGE_DATA_LAYER as dataLayerName } from '@/data/constants/gtm';
import { getGTMLogoutEventData } from '@/data/events/data/gtm/Logout';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMLogoutPayload } from '@/data/types/GTM';
import { errorWithId } from '@/data/utils/loggerUtil';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMLogoutEventData>>) => {
	const { newUserState: user_login_state } = data;
	const dataLayer = {
		event: GA4_LOGOUT,
		userModel: { count_logout: 1, user_id: null, user_login_state },
	};
	TagManager.dataLayer({ dataLayer, dataLayerName });
};

export const sendGTMLogoutEvent = async (payload: GTMLogoutPayload) => {
	const { settings } = payload;
	const { ga4 } = getGTMConfig(settings);

	if (ga4) {
		const data = await getGTMLogoutEventData(payload);

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				errorWithId(undefined, 'Logout: sendGTMLogoutEvent: ', { error });
			}
		}
	}
};
