/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const KIT_TABLE_PREFIX = 'kit-table';
export const BUNDLE_TABLE_PREFIX = 'bundle-table';
export const TYPES = {
	bundle: 'bundle',
	kit: 'package',
	product: 'product',
	sku: 'item',
	variant: 'variant',
};

export const KIT_TABLE_ACCESSOR_KEYS = {
	quantity: 'quantity',
	itemDetails: 'itemDetails',
	expanderOrAttributes: 'attributes',
};

export const SKU_LIST_TABLE_PREFIX = 'sku-list-table';
export const SKU_LIST_TABLE_ACCESSOR_KEYS = {
	attributes: 'attributes',
	partNumber: 'partNumber',
	price: 'price',
	quantity: 'quantity',
	availability: 'availability',
	pickup: 'pickup',
	scheduleForLater: 'scheduleForLater',
};
export const PRODUCT_INFO_STATE_KEY = 'productInfoData';
export const SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE = 1;
export const SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE_ON_DIALOG = 2;

export const ADD_TO_LISTS_DISPLAY_TIMEOUT = 300;
export const VOLUME_PRICE_TABLE_PREFIX = 'volume-price-table';

export const VOLUME_PRICE_TABLE_ACCESSOR_KEYS = {
	quantityRange: 'quantityRange',
	pricePerItem: 'pricePerItem',
};
