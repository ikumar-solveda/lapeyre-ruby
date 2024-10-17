/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FACET_CATEGORY_ENTRY_VALUE_PREFIX, FACET_CATEGORY_VALUE } from '@/data/constants/facet';
import { ProductFacet } from '@/data/types/Product';

export const mapFacetDataForFacetWidget = (facet: ProductFacet) => {
	const _facet = { ...facet };
	const allValuesReturned = String(facet.extendedData?.allValuesReturned).toLowerCase();
	const maximumValuesToDisplay = Number(facet.extendedData?.maximumValuesToDisplay);
	const showMore = allValuesReturned === 'false';
	const showLess =
		allValuesReturned === 'true' &&
		maximumValuesToDisplay > 0 &&
		maximumValuesToDisplay < _facet.entry.length;
	if (_facet.value === FACET_CATEGORY_VALUE) {
		_facet.entry = _facet.entry.map((entry) => ({
			...entry,
			value: FACET_CATEGORY_ENTRY_VALUE_PREFIX + entry.value,
		}));
	}
	return { ..._facet, showMore, showLess };
};

export const mapFacetEntryData = (facet: ProductFacet) => {
	const _facet = { ...facet };
	return _facet.value === FACET_CATEGORY_VALUE
		? _facet.entry.map((entry) => ({
				...entry,
				value: FACET_CATEGORY_ENTRY_VALUE_PREFIX + entry.value,
		  }))
		: [..._facet.entry];
};
