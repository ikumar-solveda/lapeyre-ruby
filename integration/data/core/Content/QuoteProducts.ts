/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { quoteItemDeleter, quoteItemFetcher, quoteItemUpdater } from '@/data/Content/_Quotes';
import { DATA_KEY_QUOTE_ITEMS } from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import {
	quoteItemsMutatorKeyMatcher,
	quoteMutatorKeyMatcher,
} from '@/data/utils/mutatorKeyMatchers/quoteMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState } from '@tanstack/react-table';
import type { QuoteItemBaseDTO } from 'integration/generated/rfq-pbc/data-contracts';
import { debounce } from 'lodash';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

type QuoteProductsProps = {
	quoteId: string;
};

export const useQuoteProducts = (props: QuoteProductsProps) => {
	const { quoteId } = props;
	const { notifyError } = useNotifications();
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const offset = useMemo(
		() => (pageIndex !== 0 ? pagination.pageIndex * pagination.pageSize : 0),
		[pagination, pageIndex]
	);
	const limit = pagination.pageSize;
	const currentQuoteItemsKey = useMemo(
		() =>
			quoteId
				? ([{ quoteId, searchTerm, offset, limit }, DATA_KEY_QUOTE_ITEMS] as [
						{ quoteId: string; searchTerm: string | undefined; offset: number; limit: number },
						string
				  ])
				: null,
		[limit, offset, quoteId, searchTerm]
	);
	const { data } = useSWR(
		currentQuoteItemsKey,
		async ([{ quoteId, searchTerm, offset, limit }]) =>
			quoteItemFetcher(true)(quoteId, !!searchTerm ? searchTerm : undefined, { offset, limit }),
		{ keepPreviousData: true, revalidateOnMount: true }
	);
	const { productsPageCount } = useMemo(() => {
		const totalRecords = data?.count ?? 0;
		const productsPageCount = Math.ceil(totalRecords / pageSize);
		return { productsPageCount };
	}, [data, pageSize]);

	const onSearch = useMemo(
		() =>
			debounce(
				(event: ChangeEvent<HTMLInputElement>) =>
					setSearchTerm((prev) => {
						if (prev !== event.target.value.trim()) {
							setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
							return event.target.value.trim();
						} else {
							return prev;
						}
					}),
				500
			),
		[]
	);

	const onProductQuantityChange = useCallback(
		async (quantity: number, itemId: string) => {
			const q: QuoteItemBaseDTO = {
				quantity,
			};
			try {
				await quoteItemUpdater(true)(quoteId as string, itemId as string, q);
				await mutate(quoteMutatorKeyMatcher(''));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[quoteId, notifyError]
	);

	const deleteQuoteItem = useCallback(
		(id: string) => async () => {
			try {
				await quoteItemDeleter(true)(quoteId as string, id);
				await mutate(quoteItemsMutatorKeyMatcher(currentQuoteItemsKey), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[currentQuoteItemsKey, notifyError, quoteId]
	);

	const deleteQuoteItems = useCallback(
		async (ids: string) => {
			try {
				await quoteItemDeleter(true)(quoteId as string, ids);
				await mutate(quoteItemsMutatorKeyMatcher(currentQuoteItemsKey), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[currentQuoteItemsKey, notifyError, quoteId]
	);

	const handleProposedPriceChange = useCallback(
		async (price: number, itemId: string) => {
			const q: QuoteItemBaseDTO = {
				proposedPrice: price,
				quantity: data?.contents[0].quantity,
			};
			try {
				await quoteItemUpdater(true)(quoteId as string, itemId as string, q);
				await mutate(quoteMutatorKeyMatcher(''));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[quoteId, notifyError, data]
	);

	return {
		dataProducts: data,
		productsPageCount,
		pagination,
		onProductQuantityChange,
		deleteQuoteItem,
		quoteId,
		setPagination,
		onSearch,
		searchTerm,
		handleProposedPriceChange,
		deleteQuoteItems,
	};
};
