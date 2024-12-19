/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EntitledPriceData, RangePriceItem } from '@/data/types/Price';
import { dFix } from '@/data/utils/floatingPoint';

export const getRangePriceValue = (
	quantity: number,
	rangePriceList: RangePriceItem[],
	defaultPriceValue: number
) => {
	const rangePriceItem = rangePriceList?.find((item: any) => {
		if (item.maximumQuantity && item.minimumQuantity) {
			return quantity >= item.minimumQuantity.value && quantity <= item.maximumQuantity.value;
		} else {
			return quantity >= item.minimumQuantity.value;
		}
	});
	return {
		rangePriceValue: dFix(rangePriceItem?.priceInRange?.value || defaultPriceValue),
	};
};

export const getRangePriceRecord = (
	entitledPriceList: EntitledPriceData[] | undefined,
	partNumber: string | undefined
) => {
	const rangePriceList: RangePriceItem[] =
		entitledPriceList?.find(({ partNumber: _pn }) => _pn === partNumber)?.RangePrice ?? [];
	return {
		rangePriceList,
	};
};

export const volumePricingExists = (entitledPriceList?: EntitledPriceData[]) =>
	entitledPriceList?.some(({ RangePrice }) => RangePrice?.length > 0);
