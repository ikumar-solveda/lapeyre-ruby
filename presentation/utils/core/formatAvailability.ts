/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { dFix } from '@/utils/floatingPoint';

export const formatAvailability = (locale?: string, quantity?: string) =>
	Intl.NumberFormat(locale).format(dFix(quantity ?? '0', 0));
