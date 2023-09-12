/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMProductClickEvent } from '@/data/events/handlers/gtm/ProductClick';
import { GTMProductClickPayload } from '@/data/types/GTM';

type ProductClickDelegatorProps = {
	gtm?: GTMProductClickPayload;
};

export const productClickDelegator = async (payload: ProductClickDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMProductClickEvent(gtm);
	}
};
