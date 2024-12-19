/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { sendGTMLoginEvent } from '@/data/events/handlers/gtm/Login';
import { GTMLoginPayload } from '@/data/types/GTM';

type LoginDelegatorProps = {
	gtm?: GTMLoginPayload;
};

export const loginDelegator = async (payload: LoginDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMLoginEvent(gtm);
	}
};
