/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { USAGE_DISPLAY, USAGE_OFFER } from '@/data/constants/catalog';
import {
	GroupingProperties,
	Price,
	ProductDisplayPrice,
	ResponseProductType,
} from '@/data/types/Product';
import { dFix } from '@/data/utils/floatingPoint';

const getMinMax = (items?: ResponseProductType[]): { min: number | null; max: number | null } => {
	let min: number | null = null;
	let max: number | null = null;

	if (items) {
		items.forEach(({ price: p }) => {
			const o = p.find(({ usage: u, value: v }) => u === USAGE_OFFER && v !== '');
			if (o?.value) {
				const v = parseFloat(o.value);
				min = min === null || v < min ? v : min;
				max = max === null || v > max ? v : max;
			}
		});
	}
	return { min, max };
};

const getMinMaxFromGroupingProperties = (
	groupingProperties: GroupingProperties
): { min: number | null; max: number | null } => {
	let min = null;
	let max = null;
	if (
		groupingProperties.groupCount > 1 &&
		groupingProperties.groupMinPriceValue !== undefined &&
		groupingProperties.groupMaxPriceValue !== undefined
	) {
		min = parseFloat(groupingProperties.groupMinPriceValue);
		max = parseFloat(groupingProperties.groupMaxPriceValue);
	}
	return { min, max };
};

const getMinFromOfferList = (offer?: Price, list?: Price) =>
	offer?.value ? parseFloat(offer.value) : list?.value ? parseFloat(list.value) : null;

export const getProductPrice = (product: ResponseProductType): ProductDisplayPrice => {
	const { items, price, groupingProperties } = product;
	const offer = price?.find(({ usage: u }) => u === USAGE_OFFER);
	const list = price?.find(({ usage: u }) => u === USAGE_DISPLAY);
	let { min, max } = getMinMax(items);
	if (min === null && max === null && groupingProperties) {
		const { min: _min, max: _max } = getMinMaxFromGroupingProperties(groupingProperties);
		min = _min;
		max = _max;
	}
	if (min === null && max === null) {
		min = getMinFromOfferList(offer, list);
	}
	const currency = offer?.currency ?? list?.currency;

	max = max === min ? null : max;
	return {
		min,
		max,
		currency,
		offer: dFix(offer?.value || '0'),
		list: dFix(list?.value || '0'),
	};
};
