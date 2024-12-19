/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { UNUSED_PRICE_KEYS, UNUSED_PRODUCT_KEYS } from '@/data/constants/omitKeys_Product';
import type { ResponseProductType } from '@/data/types/Product';
import { omitKeys_ProductAttribute } from '@/data/utils/omitKeys_ProductAttribute';
import { recursiveOmit } from '@/data/utils/recursiveOmit';

/**
 * for a given product response, omit attribute and value pairs that aren't consumed by us
 * @param product object to omit keys/attributes from
 * @param isMerchAssoc whether this product is a merchandising association
 * @returns response with some keys/attributes omitted
 */
export const omitKeys_Product = (product: ResponseProductType, isMerchAssoc = false) => {
	const rc = recursiveOmit(product, UNUSED_PRODUCT_KEYS);

	if (rc.price) {
		rc.price = rc.price.map((p) => recursiveOmit(p, UNUSED_PRICE_KEYS));
	}

	if (rc.attributes) {
		rc.attributes = rc.attributes.map(omitKeys_ProductAttribute);
	}

	// if this is a merch-assoc, update its various sub-items
	if (isMerchAssoc) {
		if (rc.items) {
			rc.items = rc.items.map((item) => omitKeys_Product(item, true));
		}
		if (rc.sKUs) {
			rc.sKUs = rc.sKUs.map((sku) => omitKeys_Product(sku, true));
		}
		if (rc.components) {
			rc.components = rc.components.map((comp) => omitKeys_Product(comp, true));
		}
	}

	// merchandisingAssociations isn't mapped in mapProductData, so we tidy it up here, i.e., even
	//  though `recursiveOmit` would have traversed through these for product-type keys, it won't have
	//  done it for its attributes and prices, so we do that ourselves
	if (rc.merchandisingAssociations) {
		rc.merchandisingAssociations = rc.merchandisingAssociations.map((ma) =>
			omitKeys_Product(ma, true)
		);
	}

	return rc;
};
