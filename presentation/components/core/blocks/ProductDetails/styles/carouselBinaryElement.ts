/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { productDetailsBinaryElementSX } from '@/components/blocks/ProductDetails/styles/binaryElement';
import { combineSX } from '@/utils/combineSX';

export const productDetailsCarouselBinaryElementSX = combineSX([
	productDetailsBinaryElementSX,
	{ position: 'relative' },
]);
