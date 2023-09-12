/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductAttributeV2 } from '@/components/content/ProductDetails/parts/AttributeV2';
import { getAttrsByIdentifier, useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const ProductDetailsAttributes: FC = () => {
	const { selection, product, onAttributeChange } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	>;
	const numAttrs = product?.definingAttributes?.length ?? 0;
	const skusAsAttrsList =
		product?.items?.map((sku) => getAttrsByIdentifier(sku.definingAttributes)) ?? [];
	return (
		<>
			{product?.definingAttributes?.map((attribute, index) => (
				<ProductAttributeV2
					key={attribute.identifier}
					attribute={attribute}
					skusAsAttrsList={skusAsAttrsList}
					onAttributeChange={onAttributeChange}
					selection={selection}
					isPivot={!!(index === 0 && numAttrs > 1)} // make the first attribute the pivot
				/>
			))}
		</>
	);
};
