/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Order } from '@/data/types/Order';
import { dAdd, dFix } from '@/data/utils/floatingPoint';

export const validateProfileUsage = (profile: string | undefined, order: Order | undefined) => {
	// validate that shipping and payment info is present and tally is correct
	const used = !!(
		profile &&
		dFix(order?.grandTotal ?? 0) ===
			dAdd(...(order?.paymentInstruction?.map(({ piAmount }) => piAmount) ?? []))
	);
	return used;
};
