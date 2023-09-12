/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { sendGTMCheckoutPageViewEvent } from '@/data/events/handlers/gtm/CheckoutPageView';
import { GTMCheckoutPageViewPayload } from '@/data/types/GTM';

type CheckoutPageViewDelegatorProps = {
	gtm?: GTMCheckoutPageViewPayload;
};

export const checkoutPageViewDelegator = async (payload: CheckoutPageViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMCheckoutPageViewEvent(gtm);
	}
};
