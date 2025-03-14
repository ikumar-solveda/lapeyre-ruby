/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DATA_KEY_PRODUCT_MULTI } from '@/data/constants/dataKey';
import { SKU_SUGGESTION_SEARCH_TYPE_NO_PRODUCTS } from '@/data/constants/siteContentSuggestion';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher as fetcher } from '@/data/Content/_Product';
import { quoteBulkItemCreator } from '@/data/Content/_Quotes';
import { useNotifications } from '@/data/Content/Notifications';
import { useSiteContentSuggestions } from '@/data/Content/SiteContentSuggestions';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import type { ProductType, ResponseProductType } from '@/data/types/Product';
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { useUser } from '@/data/User';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { mapProductData } from '@/data/utils/mapProductData';
import { quoteMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { currencyFallbackMiddleWare } from '@/data/utils/swr/currencyFallbackMiddleWare';
import { AutocompleteInputChangeReason } from '@mui/material';
import { PaginationState } from '@tanstack/react-table';
import { QuoteItemDTO } from 'integration/generated/rfq-pbc/data-contracts';
import { debounce, isEmpty, sortBy, uniqBy } from 'lodash';
import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

const EMPTY_ARRAY = [] as ProductType[];

type QuoteBrowseAndAddProps = {
	quoteId: string;
};

export const useQuoteBrowseAndAdd = (props: QuoteBrowseAndAddProps) => {
	const { quoteId } = props;
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const {
		storeId,
		langId,
		defaultCatalogId: catalogId,
		defaultCurrency,
	} = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const [listData, setListData] = useState<ProductSuggestionEntry[]>([]);
	const [options, setOptions] = useState<ProductSuggestionEntry[]>([]);
	const { fetchPartNumberSuggestion } = useSiteContentSuggestions();
	const { notifyError } = useNotifications();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const { productsPageCount } = useMemo(() => {
		const totalRecords = listData?.length ?? 0;
		const productsPageCount = Math.ceil(totalRecords / pagination.pageSize);
		return { productsPageCount };
	}, [listData, pagination]);

	const [showBrowseAndAddDialog, setShowBrowseAndAddDialog] = useState<boolean>(false);
	const closeBrowseAndAddDialog = useCallback(() => setShowBrowseAndAddDialog(false), []);
	const openBrowseAndAddDialog = useCallback(() => setShowBrowseAndAddDialog(true), []);

	const closeAndClearBrowseAndAddDialog = useCallback(() => {
		setOptions([]);
		setListData([]);
		closeBrowseAndAddDialog();
	}, [closeBrowseAndAddDialog]);

	const onAddToList = useCallback(
		async (_event: SyntheticEvent, value: ProductSuggestionEntry | null, reason: string) => {
			if (reason === 'selectOption') {
				setListData((prev) => [...prev, value as ProductSuggestionEntry]);
				setOptions([]);
			}
		},
		[]
	);

	const onDebouncedSearch = useMemo(
		() =>
			debounce(async (searchTerm: string, reason: AutocompleteInputChangeReason) => {
				if (reason === 'input' && searchTerm) {
					const options = await fetchPartNumberSuggestion({
						searchTerm: searchTerm.trim(),
						searchType: SKU_SUGGESTION_SEARCH_TYPE_NO_PRODUCTS,
					});
					const sortedOptions = sortBy(options, ['partNumber']);
					setOptions((sortedOptions as ProductSuggestionEntry[]) ?? []);
				}
			}, 300),
		[fetchPartNumberSuggestion]
	);

	const onSearchInputChange = useCallback(
		async (_event: SyntheticEvent, searchTerm: string, reason: AutocompleteInputChangeReason) =>
			await onDebouncedSearch(searchTerm, reason),
		[onDebouncedSearch]
	);

	const getOptionLabel = useCallback(
		(option?: ProductSuggestionEntry) =>
			option?.partNumber ? `${option.partNumber} (${option.name})` : '',
		[]
	);

	const onDeleteItem = useCallback(
		(partNumber: string) => async () => {
			const updatedList = listData.filter((item) => item.partNumber !== partNumber);
			setListData(updatedList);
		},
		[listData]
	);

	const onAddToQuote = useCallback(async () => {
		const items = uniqBy(listData, 'partNumber').map((item) => ({
			...item,
			sku: item.partNumber,
			quantity: 1,
			languageId: langId,
		})) as QuoteItemDTO[];
		try {
			await quoteBulkItemCreator(true)(quoteId, { items });
		} catch (error) {
			notifyError(processError(error as TransactionErrorResponse));
		}
		await mutate(quoteMutatorKeyMatcher(''), undefined);
		closeAndClearBrowseAndAddDialog();
	}, [listData, closeAndClearBrowseAndAddDialog, langId, quoteId, notifyError]);

	const { data } = useSWR(
		storeId && user?.registeredShopper && listData.length
			? [
					shrink({
						storeId,
						partNumber: listData.map((item) => item.partNumber),
						catalogId,
						langId,
						...getCurrencyParamFromContext(user?.context),
						...getContractIdParamFromContext(user?.context),
					}),
					DATA_KEY_PRODUCT_MULTI,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params),
		{ use: [laggyMiddleWare, currencyFallbackMiddleWare({ defaultCurrency })] }
	);
	const detail = useMemo(
		() =>
			isEmpty(listData)
				? EMPTY_ARRAY
				: (extractContentsArray(data) as ResponseProductType[]).map(mapProductData),
		[data, listData]
	);
	return {
		quoteId,
		options,
		listData,
		onSearchInputChange,
		getOptionLabel,
		onAddToList,
		productsPageCount,
		pagination,
		setPagination,
		onDeleteItem,
		onAddToQuote,
		openBrowseAndAddDialog,
		showBrowseAndAddDialog,
		closeAndClearBrowseAndAddDialog,
		productsDetailsData: detail,
	};
};
