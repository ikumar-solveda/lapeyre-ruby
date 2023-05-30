/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductAttribute } from '@/components/content/ProductDetails/parts/Attribute';
import { ProductAttributeElement } from '@/components/content/ProductDetails/parts/AttributeElement';
import { ProductAttributeValue } from '@/data/types/Product';
import { FC, useContext } from 'react';
import {
	getSkuCurrentAttributeValues,
	getDefaultSwatchValue,
	getAttributeType,
} from '@/utils/productAttributes';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { getAttrsByIdentifier, useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';

const productAttributeValueDefault: ProductAttributeValue = {
	identifier: EMPTY_STRING,
	sequence: EMPTY_STRING,
	unitOfMeasure: EMPTY_STRING,
	unitID: EMPTY_STRING,
	image1: EMPTY_STRING,
	value: EMPTY_STRING,
	image1path: EMPTY_STRING,
	id: EMPTY_STRING,
	attributeIdentifier: EMPTY_STRING,
};

export const ProductDetailsAttributes: FC = () => {
	const {
		selection: { sku },
		product,
		onAttributeChange,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;

	const { definingAttributes = [] } = product ?? {};
	const skuAttributeMap =
		product?.items?.map((sku) => getAttrsByIdentifier(sku.definingAttributes)) ?? [];

	const skuCurrentAttributeValues = getSkuCurrentAttributeValues(
		sku?.definingAttributes,
		productAttributeValueDefault
	);
	const defaultSwatchValue = getDefaultSwatchValue(skuCurrentAttributeValues);
	return (
		<>
			{definingAttributes.map((attribute) => {
				const productAttributeElement = (
					<ProductAttributeElement
						attributeValues={attribute.values}
						skuCurrentAttributeValues={skuCurrentAttributeValues}
						onChange={onAttributeChange}
						skuAttributeMap={skuAttributeMap}
					/>
				);
				return (
					<ProductAttribute
						swatchValue={defaultSwatchValue}
						key={attribute.identifier}
						attributeType={getAttributeType(attribute.values)}
						title={attribute.name}
						element={productAttributeElement}
					/>
				);
			})}
		</>
	);
};
