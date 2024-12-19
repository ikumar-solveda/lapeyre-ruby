/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import type { useProductDetails } from '@/data/Content/ProductDetails';

export type BundleDetailsTableAuxiliaryContextValue = Omit<
	ReturnType<typeof useProductDetails>,
	'onQuantity' | 'addToCart'
> &
	ReturnType<typeof useBundleDetailsTable> & {
		embedded?: boolean;
	};
