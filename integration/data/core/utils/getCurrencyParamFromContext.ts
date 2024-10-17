/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { UserContext } from '@/data/types/UserContext';

export const getCurrencyParamFromContext = (context?: UserContext) => {
	const currency = context?.globalization?.preferredCurrency;
	return currency
		? {
				currency,
		  }
		: ({} as any);
};
