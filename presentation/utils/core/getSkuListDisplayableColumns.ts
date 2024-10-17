/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE,
	SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE_ON_DIALOG,
} from '@/data/constants/product';
import { ProductType } from '@/data/types/Product';

export const getSkuListDisplayableColumns = (
	product: ProductType,
	embeddedDisplay?: boolean
): Record<'total' | 'limit' | 'overflow', number> => {
	let rc = { total: 0, limit: 0, overflow: 0 };
	if (product?.definingAttributes) {
		const limit = embeddedDisplay
			? SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE_ON_DIALOG
			: SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE;
		const total = product.definingAttributes.length;
		rc = {
			total,
			limit: total > limit ? limit : total,
			overflow: total > limit ? total - limit : 0,
		};
	}
	return rc;
};
