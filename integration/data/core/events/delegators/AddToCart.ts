/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMAddToCartEvent } from '@/data/events/handlers/gtm/AddToCart';
import { GTMAddToCartPayload } from '@/data/types/GTM';

type AddToCartDelegatorProps = {
	gtm?: GTMAddToCartPayload;
};

export const addToCartDelegator = async (payload: AddToCartDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMAddToCartEvent(gtm);
	}
};
