/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dMul } from '@/data/utils/floatingPoint';
import { getExpectedDate } from '@/data/utils/getExpectedDate';

/**
 * @deprecated use `getDateOffsetRangeV2` instead
 */
export const getDateOffsetRange = (
	availability: ProductAvailabilityData | undefined,
	dateFormatter: Intl.DateTimeFormat
) => {
	const current = Date.now();
	const expectedDate = new Date(getExpectedDate(availability, dateFormatter) || current).getTime();
	const ffm = availability?.pbcData?.fulfillmentCenter;
	const minOffset = dMul(ffm?.lagTimeOffset ?? 0, 1000);
	const maxOffset = dMul(ffm?.reserveTimeOffset ?? Number.POSITIVE_INFINITY, 1000);
	const minDate = new Date(expectedDate + minOffset);
	const maxDate = new Date(expectedDate + minOffset + maxOffset);
	return { minDate, maxDate };
};
