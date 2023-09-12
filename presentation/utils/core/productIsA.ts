/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ProductType } from '@/data/types/Product';

export const productIsA = (product: ProductType | undefined, type: string) =>
	product?.type === type;

export const isKitOrBundleType: Record<string, boolean> = {
	package: true,
	bundle: true,
};
