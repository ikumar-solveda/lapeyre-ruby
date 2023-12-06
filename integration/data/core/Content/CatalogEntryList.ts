/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { marketingClickInfoInvoker } from '@/data/Content/_Marketing';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { getLocalization, useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { SORT_OPTIONS } from '@/data/constants/catalog';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import {
	ProductFacetEntry,
	ProductQueryResponse,
	ProductType,
	ResponseProductType,
} from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { extractFacetsArray } from '@/data/utils/extractFacetsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getProductListFacetFilters } from '@/data/utils/getProductListFacetFilters';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { mapFacetEntryData } from '@/data/utils/mapFacetData';
import { mapProductData } from '@/data/utils/mapProductData';
import { SelectChangeEvent } from '@mui/material';
import { isEmpty, union } from 'lodash';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = PRODUCT_DATA_KEY;

const fetcher = productFetcher;

const dataMap = (data?: ProductQueryResponse) => {
	const products = (extractContentsArray(data) as ResponseProductType[]).map(mapProductData);
	const metaData = data?.metaData;
	return { products, metaData };
};

const facetEntryDataMap = (data?: ProductQueryResponse) =>
	extractFacetsArray(data).map(mapFacetEntryData).flat(1);

const fetchLocalization = async ({ cache, context }: ContentProps) =>
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'ProductGrid'),
		getLocalization(cache, context.locale || 'en-US', 'Category'),
		getLocalization(cache, context.locale || 'en-US', 'ProductFilter'),
		getLocalization(cache, context.locale || 'en-US', 'compare'),
		getLocalization(cache, context.locale || 'en-US', 'PriceDisplay'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'Common'),
	]);

export const getCatalogEntryList = async ({
	cache,
	id,
	context,
}: ContentProps): Promise<
	{
		key: string;
		value: ProductQueryResponse;
	}[]
> => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const {
		storeId,
		langId,
		defaultCurrency: currency,
		defaultCatalogId: catalogId,
	} = getServerSideCommon(settings, context);
	await fetchLocalization({ cache, id, context });

	const filteredParams = getProductListQueryParameters(context.query);
	const RoutesLocalization = await getLocalization(cache, context.locale || 'en-US', 'Routes');
	const path = getIdFromPath(context.query.path, settings.storeToken);
	const { profileName, categoryId } =
		path === RoutesLocalization.Search?.route
			? { profileName: 'HCL_V2_findProductsBySearchTermWithPrice', categoryId: '' }
			: { profileName: 'HCL_V2_findProductsByCategoryWithPriceRange', categoryId: String(id) };
	const props = {
		...filteredParams,
		storeId,
		categoryId,
		catalogId,
		profileName,
		langId,
		currency,
		...getContractIdParamFromContext(user?.context),
	};
	const cacheScope = getServerCacheScope(context, user.context);
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key, cacheScope) || fetcher(false, context)(props, params);
	cache.set(key, value, cacheScope);

	return [
		{
			key,
			value: await value,
		},
	];
};

export const useCatalogEntryList = (id: ID) => {
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const {
		storeId,
		langId,
		defaultCatalogId: catalogId,
		defaultCurrency: currency,
	} = getClientSideCommon(settings, router);
	const { query } = router;
	const params = useExtraRequestParameters();
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const facetFilters = useMemo(() => getProductListFacetFilters(filteredParams), [filteredParams]);
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
						...filteredParams,
						storeId,
						categoryId,
						catalogId,
						profileName,
						langId,
						currency,
						...getContractIdParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [laggyMiddleWare] }
	);
	const { products, metaData } = useMemo(() => dataMap(data), [data]);

	const [facetEntries, setFacetEntries] = useState<ProductFacetEntry[]>(() =>
		facetEntryDataMap(data)
	);

	const total = useMemo(() => data?.total, [data]);

	const selectedFacet = useMemo(
		() => (query.facet ? (Array.isArray(query.facet) ? query.facet : [query.facet]) : []),
		[query.facet]
	);

	const onSortOptionChange = useCallback(
		(event: SelectChangeEvent<string>, _child: ReactNode) => {
			const orderBy = event.target.value;
			const { orderBy: _orderBy, limit, ...newQuery } = filteredParams; // use query instead to respect other params?
			const pathname = router.asPath.split('?').at(0);

			if (orderBy !== '0') {
				Object.assign(newQuery, { orderBy });
			}
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router]
	);

	const onPageChange = useCallback(
		(page: number) => {
			const { limit, ...newQuery } = filteredParams; // use query instead to respect other params?
			const offset = (page - 1) * limit;
			const pathname = router.asPath.split('?').at(0);
			Object.assign(newQuery, { offset });
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router]
	);

	const onPriceSelectionDelete = useCallback(() => {
		const { minPrice: _min, maxPrice: _max, limit, ...newQuery } = filteredParams;
		const pathname = router.asPath.split('?').at(0);
		router.push({ pathname, query: newQuery }, undefined, {
			shallow: true,
		});
	}, [filteredParams, router]);

	const onFacetDelete = useCallback(
		(facetValue: string) => () => {
			const { facet, limit, ...newQuery } = filteredParams;
			const pathname = router.asPath.split('?').at(0);
			const index = selectedFacet.indexOf(facetValue);
			const newFacet = [...selectedFacet];
			index > -1 && newFacet.splice(index, 1);
			if (newFacet.length > 0) {
				Object.assign(newQuery, { facet: newFacet });
			}
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router, selectedFacet]
	);

	const onDeleteAll = useCallback(() => {
		const { minPrice, maxPrice, facet, path, ...newQuery } = query;
		const pathname = router.asPath.split('?').at(0);
		router.push({ pathname, query: newQuery }, undefined, {
			shallow: true,
		});
	}, [query, router]);

	const selectedSortOption = useMemo(
		() =>
			Array.isArray(filteredParams.orderBy)
				? filteredParams.orderBy.at(0)
				: filteredParams.orderBy ?? SORT_OPTIONS.defaultSortOptions[0].value,
		[filteredParams]
	);
	const sortOptions = useMemo(
		() =>
			String(data?.metaData?.price) === '1'
				? SORT_OPTIONS.defaultSortOptions.concat(SORT_OPTIONS.priceSortOptions)
				: SORT_OPTIONS.defaultSortOptions,
		[data?.metaData?.price]
	);

	const pageCount = useMemo(() => {
		if (total !== undefined) {
			return Math.ceil(total / filteredParams.limit);
		} else {
			return null;
		}
	}, [filteredParams.limit, total]);

	const pageNumber = useMemo(
		() => filteredParams.offset / filteredParams.limit + 1,
		[filteredParams.offset, filteredParams.limit]
	);

	const clickActionGenerator = useCallback(
		(product: ProductType) => async () => {
			if (metaData?.espot) {
				const { espot, activity, experiment, testelement } = metaData as Required<typeof metaData>;
				const data = {
					evtype: 'CpgnClick',
					expDataType: 'CatalogEntryId',
					intv_id: activity,
					mpe_id: espot,
					experimentId: experiment,
					testElementId: testelement,
					expDataUniqueID: product.id,
				};
				await marketingClickInfoInvoker(true)({ storeId: settings.storeId, data, params });
			}
		},
		[metaData, params, settings]
	);

	useEffect(() => {
		if (pageCount) {
			if (pageNumber > pageCount) {
				onPageChange(pageCount);
			}
		}
	}, [onPageChange, pageCount, pageNumber]);

	useEffect(() => {
		setFacetEntries((facetEntries) => {
			const _facetEntries = union(facetEntries, facetEntryDataMap(data));
			return _facetEntries.length !== facetEntries.length ? _facetEntries : facetEntries;
		});
	}, [data]);

	return {
		entitled: !!data?.contents || !isEmpty(facetFilters),
		products,
		clickActionGenerator,
		total,
		selectedSortOption,
		facetEntries,
		sortOptions,
		loading: !error && !data,
		error,
		selectedFacet,
		filteredParams,
		facetFilters,
		pageCount,
		pageNumber,
		onSortOptionChange,
		onPriceSelectionDelete,
		onFacetDelete,
		onDeleteAll,
		onPageChange,
	};
};
