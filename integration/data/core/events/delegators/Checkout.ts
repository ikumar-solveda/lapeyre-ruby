/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { sendGTMCheckoutEvent } from '@/data/events/handlers/gtm/Checkout';
import { GTMCheckoutPayload } from '@/data/types/GTM';

type CheckoutDelegatorProps = {
	gtm?: GTMCheckoutPayload;
};

export const checkoutDelegator = async (payload: CheckoutDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCheckoutEvent(gtm);
	}
};
