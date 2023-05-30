/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PRODUCT_LIST_DEFAULT_PAGE_SIZE } from '@/data/constants/catalog';
import { ParsedUrlQuery } from 'querystring';

export const getProductListQueryParameters = (query: ParsedUrlQuery) => {
	const { offset: _offset = 0, facetLimit, minPrice, maxPrice, facet, orderBy, searchTerm } = query;
	let offset = Number(_offset);
	if (Number.isNaN(offset) || offset < 0) {
		offset = 0;
	}
	return {
		offset,
		limit: PRODUCT_LIST_DEFAULT_PAGE_SIZE, // default, not implemented, since Emerald does not have this
		...(facetLimit !== undefined && { facetLimit }),
		...(minPrice !== undefined && { minPrice: Number(minPrice) }),
		...(maxPrice !== undefined && { maxPrice: Number(maxPrice) }),
		...(facet !== undefined && { facet }),
		...(orderBy !== undefined && { orderBy }),
		...(searchTerm !== undefined && { searchTerm: decodeURIComponent(searchTerm.toString()) }),
	};
};
