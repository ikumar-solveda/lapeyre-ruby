/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	UNUSED_ATTRIBUTE_VALUE_KEYS,
	UNUSED_PRODUCT_ATTRIBUTE_KEYS,
} from '@/data/constants/omitKeys_ProductAttribute';
import type { ResponseProductAttribute } from '@/data/types/Product';
import { recursiveOmit } from '@/data/utils/recursiveOmit';

export const omitKeys_ProductAttribute = (attribute: ResponseProductAttribute) => {
	const rc = recursiveOmit(attribute, UNUSED_PRODUCT_ATTRIBUTE_KEYS);
	if (rc.values) {
		rc.values = rc.values.map((val) => recursiveOmit(val, UNUSED_ATTRIBUTE_VALUE_KEYS));
	}
	return rc;
};
