/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DEFAULT_NEW_USER_STATE } from '@/data/constants/gtm';
import { GTMLogoutPayload } from '@/data/types/GTM';

export const getGTMLogoutEventData = async (_payload: GTMLogoutPayload) => {
	const { newUserState = DEFAULT_NEW_USER_STATE } = _payload;
	return { newUserState };
};
