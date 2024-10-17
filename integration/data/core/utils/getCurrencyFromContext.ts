/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { UserContext } from '@/data/types/UserContext';

export const getCurrencyFromContext = (context?: UserContext) =>
	context?.globalization?.preferredCurrency;
