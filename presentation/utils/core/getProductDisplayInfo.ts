/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { ProductType } from '@/data/types/Product';

export const getProductDisplayInfo = (
	input: ProductType | undefined,
	fallback: ProductType | undefined
) => {
	const { productPrice: prices } = input ?? {};
	const {
		name = EMPTY_STRING,
		partNumber = EMPTY_STRING,
		shortDescription: short = EMPTY_STRING,
		longDescription: long = EMPTY_STRING,
		seller,
		sellerId = '',
		components,
	} = input ?? {};

	const descriptiveAttributes =
		input?.descriptiveAttributes ?? fallback?.descriptiveAttributes ?? [];

	const attachments = input?.attachments ?? fallback?.attachments ?? [];

	const longDescription = long ?? fallback?.longDescription ?? '';
	const longCompDesc = components?.map((c) => c.name) as string[];
	return {
		prices,
		name,
		partNumber,
		short,
		seller: seller ? { name: seller, id: sellerId } : null,
		tabsData: { descriptiveAttributes, attachments, longDescription, longCompDesc },
	};
};
