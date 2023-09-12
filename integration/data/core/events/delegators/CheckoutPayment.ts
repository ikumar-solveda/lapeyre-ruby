/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMCheckoutPaymentEvent } from '@/data/events/handlers/gtm/CheckoutPayment';
import { GTMCheckoutPayload } from '@/data/types/GTM';

type CheckoutPaymentDelegatorProps = {
	gtm?: GTMCheckoutPayload;
};

export const checkoutPaymentDelegator = async (payload: CheckoutPaymentDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCheckoutPaymentEvent(gtm);
	}
};
