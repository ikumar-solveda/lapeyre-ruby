/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { sendGTMLogoutEvent } from '@/data/events/handlers/gtm/Logout';
import { GTMLogoutPayload } from '@/data/types/GTM';

type LogoutDelegatorProps = {
	gtm?: GTMLogoutPayload;
};

export const logoutDelegator = async (payload: LogoutDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMLogoutEvent(gtm);
	}
};
