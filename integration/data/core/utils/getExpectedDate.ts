/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

export const getExpectedDate = (
	data: ProductAvailabilityData | undefined,
	formatter: Intl.DateTimeFormat
): string => {
	const date = data?.pbcData?.fulfillmentCenter.availableToPromiseDateTime?.toString();
	return date ? formatter.format(new Date(date)) : EMPTY_STRING;
};
