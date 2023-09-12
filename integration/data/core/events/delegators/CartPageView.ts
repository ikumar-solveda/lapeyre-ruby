/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMCartPageViewEvent } from '@/data/events/handlers/gtm/CartPageView';
import { GTMCartPageViewPayload } from '@/data/types/GTM';

type CartPageViewDelegatorProps = {
	gtm?: GTMCartPageViewPayload;
};

export const cartPageViewDelegator = async (payload: CartPageViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCartPageViewEvent(gtm);
	}
};
