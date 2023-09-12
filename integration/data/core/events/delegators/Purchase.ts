/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMPurchaseEvent } from '@/data/events/handlers/gtm/Purchase';
import { GTMPurchasePayload } from '@/data/types/GTM';

type PurchaseDelegatorProps = {
	gtm?: GTMPurchasePayload;
};

export const purchaseDelegator = async (payload: PurchaseDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMPurchaseEvent(gtm);
	}
};
