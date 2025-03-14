/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dMul } from '@/data/utils/floatingPoint';

export const getDateOffsetRangeV2 = (availability: ProductAvailabilityData | undefined) => {
	const current = Date.now();
	const expectedDate = new Date(
		availability?.pbcData?.fulfillmentCenter?.availableToPromiseDateTime || current
	).getTime();
	const ffm = availability?.pbcData?.fulfillmentCenter;
	const minOffset = dMul(ffm?.lagTimeOffset ?? 0, 1000);
	const maxOffset = dMul(ffm?.reserveTimeOffset ?? Number.POSITIVE_INFINITY, 1000);
	const minDate = new Date(expectedDate + minOffset);
	const maxDate = new Date(expectedDate + minOffset + maxOffset);
	return { minDate, maxDate };
};
