/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { FACET_LIMIT_SUFFIX, FACET_PRICE_PREFIX } from '@/data/constants/facet';
import { ID } from '@/data/types/Basic';
import { ProductFacetEntry, ProductQueryResponse } from '@/data/types/Product';
import { extractFacetsArray } from '@/data/utils/extractFacetsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getProductListFacetFilters } from '@/data/utils/getProductListFacetFilters';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapFacetDataForFacetWidget } from '@/data/utils/mapFacetData';
import { currencyFallbackMiddleWare } from '@/data/utils/swr/currencyFallbackMiddleWare';
import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

const DATA_KEY = PRODUCT_DATA_KEY;

const fetcher = productFetcher;

const dataMap = (data: ProductQueryResponse | undefined) =>
	extractFacetsArray(data)
		?.map(mapFacetDataForFacetWidget)
		.sort((a, b) =>
			a.value.startsWith(FACET_PRICE_PREFIX) ? -1 : b.value.startsWith(FACET_PRICE_PREFIX) ? 1 : 0
		) ?? [];

/**
 * Do not include this in manifest since it is same as GetCatalogEntryList,
 * Only need when someone have this alone on a page, not likely to happen.
 */
export const getFacetNavigation = getCatalogEntryList;

export const useFacetNavigation = (id: ID) => {
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const {
		storeId,
		defaultCatalogId: catalogId,
		langId,
		defaultCurrency,
	} = getClientSideCommon(settings, router);

	const { query, locale, defaultLocale } = router;
	const params = useExtraRequestParameters();
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const facetFilters = useMemo(() => getProductListFacetFilters(filteredParams), [filteredParams]);
	const selectedFacet = useMemo(
		() => (query.facet ? (Array.isArray(query.facet) ? query.facet : [query.facet]) : []),
		[query.facet]
	);
	const SearchLocalization = useLocalization('Routes').Search;
	const path = getIdFromPath(query.path, settings.storeToken);
	const { profileName, categoryId } =
		path === SearchLocalization.route.t()
			? { profileName: 'HCL_V2_findProductsBySearchTermWithPrice', categoryId: '' }
			: { profileName: 'HCL_V2_findProductsByCategoryWithPriceRange', categoryId: String(id) };
	const { data, error } = useSWR(
		storeId
			? [
					shrink({
						storeId,
						categoryId,
						catalogId,
						profileName,
						...filteredParams,
						langId,
						...getContractIdParamFromContext(user?.context),
						...getCurrencyParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [currencyFallbackMiddleWare({ defaultCurrency })] }
	);
	const facets = useMemo(() => dataMap(data), [data]);

	const onPriceRangeChange = useCallback(
		({ minPrice, maxPrice }: { minPrice: number | null; maxPrice: number | null }) => {
			const {
				minPrice: _min,
				maxPrice: _max,
				limit,
				offset: _offset,
				// on facet change, should reset offset(page number)
				...newQuery
			} = filteredParams;
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
			// on facet change, should reset offset(page number)
			const { facet, limit, offset: _offset, ...newQuery } = filteredParams; // use query instead to respect other params?
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
		available: !!data?.facets?.length || !isEmpty(facetFilters),
		facets,
		loading: !error && !data,
		error,
		filteredParams,
		facetFilters,
		selectedFacet,
		locale,
		defaultLocale,
		onPriceRangeChange,
		onFacetSelectChange,
		toggleFacetLimit,
	};
};
