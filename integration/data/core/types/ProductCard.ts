/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import type { useProductCard } from '@/data/Content/_ProductCard';
import { ProductType } from '@/data/types/Product';
import { getHref_Product } from '@/data/utils/getHref_Product';

export type ProductCardContextValue = ReturnType<typeof useCatalogEntryList> &
	ReturnType<typeof useProductCard> & {
		product: ProductType;
		routeUrl: ReturnType<typeof getHref_Product>;
	};
