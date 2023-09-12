/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMProductViewEvent } from '@/data/events/handlers/gtm/ProductView';
import { GTMProductViewPayload } from '@/data/types/GTM';

type ProductViewDelegatorProps = {
	gtm?: GTMProductViewPayload;
};

export const productViewDelegator = async (payload: ProductViewDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMProductViewEvent(gtm);
	}
};
