/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { ProductType } from '@/data/types/Product';
import { Product, ProductCollection } from 'schema-dts';

const EMPTY_PRODUCT = {} as ProductType;
const EMPTY_COMPONENTS = [] as ProductType[];
export const createSchemaOrgMetaDataForProduct = (
	product: ProductType = EMPTY_PRODUCT
): Product | ProductCollection => {
	const {
		name = EMPTY_STRING,
		thumbnail = EMPTY_STRING,
		shortDescription = EMPTY_STRING,
		partNumber = EMPTY_STRING,
		seo,
		attributes,
		manufacturer = EMPTY_STRING,
		productPrice,
		components = EMPTY_COMPONENTS,
	} = product;

	const rc = {
		'@type': (components.length ? 'ProductCollection' : 'Product') as any,
		name,
		image: thumbnail,
		description: shortDescription,
		sku: partNumber,
		url: seo?.href || EMPTY_STRING,
		color:
			(attributes?.find((attr) => attr.name === 'Color')?.values[0]?.identifier as string) ||
			EMPTY_STRING,
		brand: {
			'@type': 'Brand',
			name: manufacturer,
		},
		offers: {
			'@type': 'Offer',
			priceCurrency: productPrice?.currency || EMPTY_STRING,
			price: productPrice?.min?.toString() || EMPTY_STRING,
			// availability: status ? 'InStock' : 'OutOfStock',
		},
		...(components.length && { hasPart: components.map(createSchemaOrgMetaDataForProduct) }),
	};

	return rc as Product | ProductCollection;
};
