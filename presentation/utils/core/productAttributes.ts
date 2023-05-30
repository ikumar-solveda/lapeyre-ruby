/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductAttribute, ProductAttributeValue } from '@/data/types/Product';
import { SWATCH, RADIO } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';

export const getDefaultSwatchValue = (values: ProductAttributeValue[] = []) =>
	values.filter((value) => value.image1path).at(0)?.value ?? EMPTY_STRING;

export const getAttributeType = (values: ProductAttributeValue[] = []): string =>
	values.filter((value) => value.image1path).length > 0 ? SWATCH : RADIO;

export const getSkuCurrentAttributeValues = (
	attributes: ProductAttribute[] = [],
	productAttributeValueDefault: ProductAttributeValue
): ProductAttributeValue[] =>
	attributes.map((attribute) => ({
		...(attribute.values?.at(0) ?? productAttributeValueDefault),
		attributeIdentifier: attribute.identifier,
	}));

export const getDefaultSelectedAttributeIds = (
	skuCurrentAttributeValues: ProductAttributeValue[] = []
) => {
	const swatchAttr = skuCurrentAttributeValues.filter((value) => value.image1path).at(0);
	const radioAttr = skuCurrentAttributeValues.filter((value) => !value.image1path).at(0);
	return {
		defaultSwatchId: swatchAttr?.identifier ?? EMPTY_STRING,
		defaultSwatchAttributeId: swatchAttr?.attributeIdentifier ?? EMPTY_STRING,
		defaultRadioId: radioAttr?.identifier ?? EMPTY_STRING,
		defaultRadioAttributeId: radioAttr?.attributeIdentifier ?? EMPTY_STRING,
	};
};

export const getRemainingSkuAttributes = (
	attributeValues: ProductAttributeValue[],
	defaultRadioId: string,
	defaultRadioAttributeId: string
) =>
	attributeValues
		.filter((value) => value.identifier !== defaultRadioId)
		.reduce((remainingAttributes, value) => {
			remainingAttributes[defaultRadioAttributeId] = value.identifier.toString();
			return remainingAttributes;
		}, {} as Record<string, string>);
