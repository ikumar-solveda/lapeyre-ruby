/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMCheckoutShippingEvent } from '@/data/events/handlers/gtm/CheckoutShipping';
import { GTMCheckoutPayload } from '@/data/types/GTM';

type CheckoutShippingDelegatorProps = {
	gtm?: GTMCheckoutPayload;
};

export const checkoutShippingDelegator = async (payload: CheckoutShippingDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCheckoutShippingEvent(gtm);
	}
};
