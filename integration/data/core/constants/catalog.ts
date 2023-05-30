/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const USAGE_DEFINING = 'Defining';
export const USAGE_DESCRIPTIVE = 'Descriptive';
export const USAGE_OFFER = 'Offer';
export const USAGE_DISPLAY = 'Display';
export const ATTR_PICKUP_IN_STORE = 'PickUpInStore';
export const STRING_TRUE = 'true';
export const RA_EXCLUSIVE = 'Exclusive';
export const PRODUCT_LIST_DEFAULT_PAGE_SIZE = 12;
export const SWATCH = 'swatch';
export const RADIO = 'radio';

type Option = {
	key: string;
	value: string;
	translationKey: 'relevance' | 'brands' | 'name' | 'priceLowToHigh' | 'priceHighToLow';
};

export const SORT_OPTIONS = {
	defaultSortOptions: [
		{
			key: 'SN_NO_SORT',
			value: '0',
			translationKey: 'relevance',
		},
		{
			key: 'SN_SORT_BY_BRANDS',
			value: '1',
			translationKey: 'brands',
		},
		{
			key: 'SN_SORT_BY_NAME',
			value: '2',
			translationKey: 'name',
		},
	] as Option[],
	priceSortOptions: [
		{
			key: 'SN_SORT_LOW_TO_HIGH',
			value: '3',
			translationKey: 'priceLowToHigh',
		},
		{
			key: 'SN_SORT_HIGH_TO_LOW',
			value: '4',
			translationKey: 'priceHighToLow',
		},
	] as Option[],
};
