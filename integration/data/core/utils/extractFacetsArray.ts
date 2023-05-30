/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductQueryResponse } from '@/data/types/Product';

export const extractFacetsArray = (data?: ProductQueryResponse) =>
	data && Array.isArray(data?.facets) ? data.facets : [];
