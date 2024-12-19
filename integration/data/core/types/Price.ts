/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type {
	PricePriceItem,
	PricePriceItemRangePrice,
} from 'integration/generated/transactions/data-contracts';

export type RangePriceItem = PricePriceItemRangePrice;

export type EntitledPriceData = PricePriceItem & {
	RangePrice: RangePriceItem[];
};

export type PriceResponse = {
	resourceId: string;
	EntitledPrice: EntitledPriceData[];
	resourceName: string;
};
