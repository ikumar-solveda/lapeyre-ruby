/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DEFAULT_LOGGED_IN_USER_STATE, DEFAULT_LOGIN_METHOD } from '@/data/constants/gtm';
import { GTMLoginPayload } from '@/data/types/GTM';

export const getGTMLoginEventData = async (payload: GTMLoginPayload) => {
	const { oldUserData, newUserData, userRegistrationData } = payload;
	const { personalizationID, userId } = newUserData ?? userRegistrationData ?? {};
	return {
		loginMethod: DEFAULT_LOGIN_METHOD,
		newUserLoginState: DEFAULT_LOGGED_IN_USER_STATE,
		newUserId: userId,
		newPersonalizationId: personalizationID,
		oldPersonalizationId: oldUserData?.audit?.personalizationId ?? '',
	};
};
