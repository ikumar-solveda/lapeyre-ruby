/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { sendGTMRemoveFromCartEvent } from '@/data/events/handlers/gtm/RemoveFromCart';
import { GTMRemoveFromCartPayload } from '@/data/types/GTM';

type RemoveFromCartDelegatorProps = {
	gtm?: GTMRemoveFromCartPayload;
};

export const removeFromCartDelegator = async (payload: RemoveFromCartDelegatorProps) => {
	const { gtm } = payload;
	if (gtm) {
		await sendGTMRemoveFromCartEvent(gtm);
	}
};
