/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { USAGE_OFFER } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';
import type { Price } from '@/data/types/Product';
import { dFix } from '@/data/utils/floatingPoint';

export const findOfferPrice = (price: Price[]) => {
	const o = price.find(({ usage: u, value: v }) => u === USAGE_OFFER && v !== EMPTY_STRING);
	const offerPrice = o ? dFix(o.value) : 0;
	const currency = o ? o.currency : null;
	return { value: (offerPrice > 0 ? offerPrice : null) as number, currency };
};
