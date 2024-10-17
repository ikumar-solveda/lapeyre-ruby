/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useProductMulti } from '@/data/Content/ProductMulti';
import { getProductMulti } from '@/data/Content/ProductMulti-Server';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { marketingClickInfoInvoker } from '@/data/Content/_Marketing';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { getLocalization, useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { SORT_OPTIONS, USAGE_DEFINING } from '@/data/constants/catalog';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { TYPES } from '@/data/constants/product';
import { StoreInventoryContext } from '@/data/context/storeInventory';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import {
	ProductFacetEntry,
	ProductQueryResponse,
	ProductType,
	ResponseProductType,
} from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { encodeRedirectPath } from '@/data/utils/encodeRedirectPath';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { extractFacetsArray } from '@/data/utils/extractFacetsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getProductListFacetFilters } from '@/data/utils/getProductListFacetFilters';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { getServerSideRedirectPrefix } from '@/data/utils/getServerSideRedirectPrefix';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapFacetEntryData } from '@/data/utils/mapFacetData';
import { mapProductData } from '@/data/utils/mapProductData';
import { currencyFallbackMiddleWare } from '@/data/utils/swr/currencyFallbackMiddleWare';
import { SelectChangeEvent } from '@mui/material';
import { Translation } from 'integration/generated/translations';
import { isEmpty, keyBy, union } from 'lodash';
import {
	MouseEvent,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const EMPTY_AVAILABILITY: ProductAvailabilityData[] = [];

const DATA_KEY = PRODUCT_DATA_KEY;

const fetcher = productFetcher;

const dataMap = (data?: ProductQueryResponse) => {
	const products = (extractContentsArray(data) as ResponseProductType[]).map(mapProductData);
	const metaData = data?.metaData;
	return { products, metaData };
};

const attachSKUs = (products: ProductType[], productDataWithSKU: ProductType[] = []) => {
	const productMap = keyBy(productDataWithSKU, 'partNumber');
	products
		.filter(({ partNumber }) => productMap[partNumber])
		.forEach((product) => {
			product.items = productMap[product.partNumber]?.items;
		});
	return products;
};

const filterByProductsEligibleToGetSKUs = (productData: ResponseProductType[]) =>
	productData.filter(
		(product) =>
			product.hasSingleSKU ||
			(product.attributes?.filter((attribute) => attribute.usage === USAGE_DEFINING).length === 1 &&
				product.attributes.find(
					(attribute) => attribute.usage === USAGE_DEFINING && attribute.values?.at(0)?.image1path
				))
	);

const facetEntryDataMap = (data?: ProductQueryResponse) =>
	extractFacetsArray(data).map(mapFacetEntryData).flat(1);

const fetchLocalization = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	return await Promise.all([
		getLocalization(cache, locale, 'ProductGrid'),
		getLocalization(cache, locale, 'Category'),
		getLocalization(cache, locale, 'ProductFilter'),
		getLocalization(cache, locale, 'compare'),
		getLocalization(cache, locale, 'PriceDisplay'),
		getLocalization(cache, locale, 'CommerceEnvironment'),
		getLocalization(cache, locale, 'Common'),
		getLocalization(cache, locale, 'Inventory'),
		getLocalization(cache, locale, 'productDetail'),
	]);
};

export const getCatalogEntryList = async ({
	cache,
	id,
	context,
}: ContentProps): Promise<
	| {
			key: string;
			value: ProductQueryResponse;
	  }[]
	| { redirect: string }
> => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const { storeId, langId, defaultCatalogId: catalogId } = getServerSideCommon(settings, context);
	await Promise.all([
		fetchLocalization({ cache, id, context }),
		getFlexFlowStoreFeature({ cache, id: EMS_STORE_FEATURE.GUEST_SHOPPING, context }),
	]);
	const routes = await getLocalization(cache, locale, 'Routes');
	const filteredParams = getProductListQueryParameters(context.query);
	const { Search } = await getLocalization(cache, locale, 'Routes');
	const path = getIdFromPath(context.query.path, settings.storeToken);
	const { profileName, categoryId } =
		path === (Search as Translation)?.route
			? { profileName: 'HCL_V2_findProductsBySearchTermWithPrice', categoryId: '' }
			: { profileName: 'HCL_V2_findProductsByCategoryWithPriceRange', categoryId: String(id) };
	const props = {
		...filteredParams,
		storeId,
		categoryId,
		catalogId,
		profileName,
		langId,
		...getContractIdParamFromContext(user?.context),
		...getCurrencyParamFromContext(user?.context),
	};
	const cacheScope = getServerCacheScope(context, user.context);
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value = cache.get(key, cacheScope) || fetcher(false, context)(props, params);
	cache.set(key, value, cacheScope);
	const response = await value;

	const products = extractContentsArray(response) as ResponseProductType[];
	if (
		products.length === 1 &&
		products.at(0)?.seo.href &&
		path === (Search as Translation)?.route
	) {
		const redirectPrefix = getServerSideRedirectPrefix({
			contextLocale: context.locale,
			storeUrlKeyword: settings.storeToken?.urlKeywordName,
		});
		return {
			redirect: `${redirectPrefix}/${encodeRedirectPath(products.at(0)?.seo.href ?? '')}`
				.replace('//', '/')
				.replace(/\/$/, ''),
		};
	}
	const filteredProducts = filterByProductsEligibleToGetSKUs(products);
	if (filteredProducts.length) {
		await getProductMulti(
			{ cache, id, context },
			filteredProducts.map(({ partNumber }) => partNumber)
		);
	}

	return [
		{
			key,
			value: response,
		},
	];
};

export const useCatalogEntryList = (id: ID) => {
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const { storeLocator } = useStoreLocatorState();
	const {
		storeId,
		langId,
		defaultCatalogId: catalogId,
		defaultCurrency,
	} = getClientSideCommon(settings, router);
	const { query } = router;
	const params = useExtraRequestParameters();
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const facetFilters = useMemo(() => getProductListFacetFilters(filteredParams), [filteredParams]);
	const [activeSKUPartNumber, setActiveSKUPartNumber] = useState<string | undefined>();
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
						...getContractIdParamFromContext(user?.context),
						...getCurrencyParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [currencyFallbackMiddleWare({ defaultCurrency })] }
	);
	const { products: productsData, metaData } = useMemo(() => dataMap(data), [data]);
	const filteredProducts = useMemo(
		() =>
			(filterByProductsEligibleToGetSKUs(productsData) as ProductType[]).map(
				({ partNumber }) => partNumber
			),
		[productsData]
	);
	const { setOpen } = useContext(StoreInventoryContext);
	const { data: productsWithSKU } = useProductMulti(filteredProducts);
	const inventoryEligible = useMemo(() => {
		const items =
			productsWithSKU
				?.filter(({ items }) => items)
				.map(({ items }) => items.map((sku) => sku.partNumber)) ?? [];
		const individual = productsData
			.filter(({ type }) => type === TYPES.kit || type === TYPES.sku)
			.map((item) => item.partNumber);
		return [...items.flat(1), ...individual].join(',');
	}, [productsData, productsWithSKU]);

	const { availability = EMPTY_AVAILABILITY, isLoading: isInventoryLoading } = useInventoryV2({
		partNumber: inventoryEligible,
		physicalStore: storeLocator.selectedStore,
	});

	const products = useMemo(
		() => attachSKUs(productsData, productsWithSKU),
		[productsData, productsWithSKU]
	);

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
			const { limit, offset: _offset, ...newQuery } = filteredParams; // use query instead to respect other params?
			const offset = (page - 1) * limit;
			const pathname = router.asPath.split('?').at(0);
			Object.assign(newQuery, { offset });
			router.push({ pathname, query: newQuery }, undefined, {
				shallow: true,
			});
		},
		[filteredParams, router]
	);

	const getPageLink = useCallback(
		(page: number) => {
			const { limit, offset: _offset, ...newQuery } = filteredParams; // use query instead to respect other params?
			const offset = (page - 1) * limit;
			const pathname = router.asPath.split('?').at(0);
			offset && Object.assign(newQuery, { offset });
			return { pathname, query: newQuery };
		},
		[filteredParams, router]
	);

	const onPriceSelectionDelete = useCallback(() => {
		// on facet change, should reset offset(page number)
		const { minPrice: _min, maxPrice: _max, limit, offset: _offset, ...newQuery } = filteredParams;
		const pathname = router.asPath.split('?').at(0);
		router.push({ pathname, query: newQuery }, undefined, {
			shallow: true,
		});
	}, [filteredParams, router]);

	const onFacetDelete = useCallback(
		(facetValue: string) => () => {
			// on facet change, should reset offset(page number)
			const { facet, limit, offset: _offset, ...newQuery } = filteredParams;
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
		const { minPrice, maxPrice, facet, path, offset: _offset, ...newQuery } = query;
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

	const onSelectStore = useCallback(
		(activeSKUPartNumber: string | undefined) => (event: MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			setOpen(true);
			setActiveSKUPartNumber(activeSKUPartNumber);
		},
		[setOpen]
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
		categoryId,
		onSelectStore,
		activeSKUPartNumber,
		params,
		breadCrumbTrailEntryView: data?.breadCrumbTrailEntryView,
		availability,
		isInventoryLoading,
		getPageLink,
	};
};
