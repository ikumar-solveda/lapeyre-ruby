/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR from 'swr';
import { useSettings } from '@/data/Settings';
import { ProductFacetEntry, ProductQueryResponse } from '@/data/types/Product';
import { productFetcher, PRODUCT_DATA_KEY } from '@/data/Content/_Product';
import { ID } from '@/data/types/Basic';
import { extractFacetsArray } from '@/data/utils/extractFacetsArray';
import { useCallback, useMemo } from 'react';
import { mapFacetDataForFacetWidget } from '@/data/utils/mapFacetData';
import { getCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { FACET_LIMIT_SUFFIX } from '@/data/constants/facet';
import { useLocalization } from '@/data/Localization';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

const DATA_KEY = PRODUCT_DATA_KEY;

const fetcher = productFetcher;

const dataMap = (data: ProductQueryResponse | undefined) =>
	extractFacetsArray(data)?.map(mapFacetDataForFacetWidget) ?? [];

/**
 * Do not include this in manifest since it is same as GetCatalogEntryList,
 * Only need when someone have this alone on a page, not likely to happen.
 */
export const getFacetNavigation = getCatalogEntryList;

export const useFacetNavigation = (id: ID) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const {
		storeId,
		defaultCatalogId: catalogId,
		defaultCurrency: currency,
		langId,
	} = getClientSideCommon(settings, router);

	const { query, locale, defaultLocale } = router;
	const params = useExtraRequestParameters();
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const selectedFacet = useMemo(
		() => (query.facet ? (Array.isArray(query.facet) ? query.facet : [query.facet]) : []),
		[query.facet]
	);
	const SearchLocalization = useLocalization('Routes').Search;
	const path = getIdFromPath(query.path, settings.storeToken);
	const profileName =
		path === SearchLocalization.route.t()
			? 'HCL_V2_findProductsBySearchTermWithPrice'
			: 'HCL_V2_findProductsByCategoryWithPriceRange';
	const { data, error } = useSWR(
		storeId
			? [
					{
						storeId,
						categoryId: [String(id)],
						catalogId,
						profileName,
						...filteredParams,
						langId,
						currency,
					},
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(props, params),
		{ use: [laggyMiddleWare] }
	);

	const onPriceRangeChange = useCallback(
		({ minPrice, maxPrice }: { minPrice: number | null; maxPrice: number | null }) => {
			const { minPrice: _min, maxPrice: _max, limit, ...newQuery } = filteredParams;
			const pathname = router.asPath.split('?').at(0);
			if (minPrice !== null || maxPrice !== null) {
				Object.assign(newQuery, { minPrice, maxPrice });
			}
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router]
	);

	const onFacetSelectChange = useCallback(
		(_event: Event, entry: ProductFacetEntry) => {
			const { facet, limit, ...newQuery } = filteredParams; // use query instead to respect other params?
			const pathname = router.asPath.split('?').at(0);
			const index = selectedFacet.indexOf(entry.value);
			const newFacet = [...selectedFacet];
			index > -1 ? newFacet.splice(index, 1) : newFacet.push(entry.value);
			if (newFacet.length > 0) {
				Object.assign(newQuery, { facet: newFacet });
			}
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router, selectedFacet]
	);

	const toggleFacetLimit = useCallback(
		(facetValue: string) => () => {
			const { facetLimit: _facetLimit = [], limit, ...newQuery } = filteredParams; // use query instead to respect other params?
			const facetLimitValue = facetValue + FACET_LIMIT_SUFFIX;
			const facetLimit = Array.isArray(_facetLimit) ? [..._facetLimit] : [_facetLimit];
			const index = facetLimit.indexOf(facetLimitValue);
			index > -1 ? facetLimit.splice(index, 1) : facetLimit.push(facetLimitValue);
			if (facetLimit.length > 0) {
				Object.assign(newQuery, { facetLimit });
			}
			const pathname = router.asPath.split('?').at(0);
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router]
	);

	return {
		facets: dataMap(data),
		loading: !error && !data,
		error,
		filteredParams,
		selectedFacet,
		locale,
		defaultLocale,
		onPriceRangeChange,
		onFacetSelectChange,
		toggleFacetLimit,
	};
};
