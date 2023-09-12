/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { has } from 'lodash';

/**
 * Get Component or product Type
 */
export const getComponentType = (entity: ProductType) => {
	const isProduct = entity.catalogEntryTypeCode === 'ProductBean' ? true : false;
	const isItem = entity.catalogEntryTypeCode === 'ItemBean' ? true : false;
	const isVariant = entity.catalogEntryTypeCode === 'VariantBean' ? true : false;

	return { isProduct, isItem, isVariant };
};

/**
 * Get descriptive and defining attributes
 */
export const getBundleComponentOrSkuAttributes = (entity: ProductType) => {
	const definingAttributes: ResponseProductAttribute[] = [];
	const single = (entity as any).numberOfSKUs === 1 || !has(entity, 'numberOfSKUs');
	const attrStates: Record<string, string | string[]> = !single
		? {}
		: definingAttributes.reduce(
				(agg, att) => ({
					...agg,
					[att.identifier]: att.values[0]?.identifier,
				}),
				{}
		  );
	return { attrStates };
};
