/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PAGE_DATA_LAYER as dataLayerName, GA4_LOGIN } from '@/data/constants/gtm';
import { getGTMLoginEventData } from '@/data/events/data/gtm/Login';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { GTMLoginPayload } from '@/data/types/GTM';
import { errorWithId } from '@/data/utils/loggerUtil';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import TagManager from 'react-gtm-module';

export const measure_GA4 = async (data: Awaited<ReturnType<typeof getGTMLoginEventData>>) => {
	const {
		newPersonalizationId: user_id,
		newUserLoginState: user_login_state,
		loginMethod: method,
		oldPersonalizationId,
	} = data;
	const previous_user_id = oldPersonalizationId === user_id ? undefined : oldPersonalizationId;
	const dataLayer = {
		event: GA4_LOGIN,
		eventModel: { count_login: 1, method },
		userModel: omitBy({ previous_user_id, user_id, user_login_state }, isNil),
	};
	TagManager.dataLayer({ dataLayer, dataLayerName });
};

export const sendGTMLoginEvent = async (payload: GTMLoginPayload) => {
	const { settings } = payload;
	const { ga4 } = getGTMConfig(settings);

	if (ga4) {
		const data = await getGTMLoginEventData(payload);

		if (ga4) {
			try {
				await measure_GA4(data);
			} catch (error) {
				errorWithId(undefined, 'Login: sendGTMLoginEvent: ', { error });
			}
		}
	}
};
