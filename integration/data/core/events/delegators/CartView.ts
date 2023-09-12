/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMCartViewEvent } from '@/data/events/handlers/gtm/CartView';
import { GTMCartViewPayload } from '@/data/types/GTM';

type CartViewDelegatorProps = {
	gtm?: GTMCartViewPayload;
};

export const cartViewDelegator = async (payload: CartViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCartViewEvent(gtm);
	}
};
