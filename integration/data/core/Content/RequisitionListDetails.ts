/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { BASE_ADD_2_CART_BODY, addToCartFetcher } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useSiteContentSuggestions } from '@/data/Content/SiteContentSuggestions';
import { cartCalculator } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orderByIdFetcher } from '@/data/Content/_Order';
import {
	requisitionListItemUpdate,
	requisitionListSubmitToCart,
	requisitionListUpdate,
} from '@/data/Content/_RequisitionList';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_REQUISITION_LIST } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PAGINATION, SINGLE_RECORD } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { Order } from '@/data/types/Order';
import { RequisitionListSearchAndAddValue } from '@/data/types/RequisitionLists';

import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { requisitionListsMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/requisitionListsKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

/**
 * Default to sort by item create time desc (last added at top of table)
 */
const defaultSort = { sortOrderItemBy: 'createDate', sortOrder: 'DESC' };

const SORT_BY = {
	partNumber: (desc: boolean) => ({
		sortOrderItemBy: 'partNumber',
		sortOrder: desc ? 'DESC' : 'ASC',
	}),
	quantity: (desc: boolean) => ({
		sortOrderItemBy: 'quantity',
		sortOrder: desc ? 'DESC' : 'ASC',
	}),
};
export const getRequisitionListDetails = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'RequisitionLists'),
		getLocalization(cache, context.locale || 'en-US', 'RequisitionListItems'),
	]);
};

export const useRequisitionListDetails = () => {
	const { mutate } = useSWRConfig();
	const { fetchPartNumberSuggestion } = useSiteContentSuggestions();
	const { user } = useUser();
	const { settings } = useSettings();
	const { storeId } = settings;
	const router = useNextRouter();
	const {
		query: { id },
	} = router;
	const orderId = [id].flat().at(0) ?? '';
	const extraParams = useExtraRequestParameters();
	const { langId } = getClientSideCommon(settings, router);
	const {
		UPDATED_REQUISITIONLIST_SUCCESS,
		addedNRLSuccessfully,
		addedItemRLSuccessfully,
		addItemListSuccessfully,
		deletedItemListSuccessfully,
	} = useLocalization('success-message');
	const successMessage = UPDATED_REQUISITIONLIST_SUCCESS.t();
	const { showSuccessMessage, notifyError } = useNotifications();
	const [sorting, setSorting] = useState<SortingState>([]);
	const orderBy = useMemo(() => {
		const sort = sorting.at(0);
		return sort ? SORT_BY[sort.id as keyof typeof SORT_BY](sort.desc) : defaultSort;
	}, [sorting]);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const {
		data,
		error,
		isLoading,
		mutate: mutateRequisitionListsDetails,
	} = useSWR(
		orderId
			? [
					{
						storeId,
						orderId,
						query: { pageNumber: pageIndex + 1, pageSize, ...orderBy },
					},
					extraParams,
					DATA_KEY_REQUISITION_LIST,
			  ]
			: null,
		async ([{ storeId, orderId, query }, params]) =>
			orderByIdFetcher(true)(storeId, orderId, query, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);
	const pageCount = Math.ceil(Number(data?.recordSetTotal ?? 0) / pageSize);

	const updateRequisitionListItem = useCallback(
		async (props: { orderItemId: string; quantity: number }) => {
			try {
				await requisitionListItemUpdate(true)(
					{
						storeId,
						langId,
						requisitionListId: orderId,
						data: { ...props },
					},
					extraParams
				);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
				await mutateRequisitionListsDetails();
				showSuccessMessage(successMessage);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			storeId,
			orderId,
			extraParams,
			mutateRequisitionListsDetails,
			showSuccessMessage,
			successMessage,
			notifyError,
			langId,
			mutate,
		]
	);

	const addItemToCart = useCallback(
		async (orderItem: { partNumber: string; quantity: string }[]) => {
			try {
				await addToCartFetcher(true)(
					settings.storeId,
					{},
					{ ...BASE_ADD_2_CART_BODY, orderItem },
					extraParams
				);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);

				// notification
				showSuccessMessage(addedNRLSuccessfully.t({ v: orderItem.length }), true);
				// TODO: add onAddToCart Event call
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[addedNRLSuccessfully, extraParams, mutate, notifyError, settings.storeId, showSuccessMessage]
	);

	const submitToCurrentPendingOrder = useCallback(async () => {
		try {
			await requisitionListSubmitToCart(true)(
				{
					storeId,
					requisitionListId: orderId,
					langId,
				},
				extraParams
			);
			await cartCalculator(true)({ storeId, query: undefined, params: extraParams });
			await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
			// notification
			showSuccessMessage(addedItemRLSuccessfully.t({ v: data?.orderDescription ?? '' }), true);
			// TODO: add onAddToCart Event call
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [
		addedItemRLSuccessfully,
		langId,
		data?.orderDescription,
		extraParams,
		mutate,
		notifyError,
		orderId,
		showSuccessMessage,
		storeId,
	]);

	const onSKUAdd = useCallback(
		async (values: RequisitionListSearchAndAddValue, _event?: FormEvent<HTMLFormElement>) => {
			if (values.product && values.quantity) {
				try {
					await requisitionListItemUpdate(true)(
						{
							storeId,
							langId,
							requisitionListId: orderId,
							data: { partNumber: values.product.partNumber, quantity: values.quantity },
						},
						extraParams
					);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
					await mutateRequisitionListsDetails();
					showSuccessMessage(addItemListSuccessfully.t({ v: values.product.partNumber ?? '' }));
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
					return undefined;
				}
			}
		},
		[
			addItemListSuccessfully,
			extraParams,
			langId,
			mutate,
			mutateRequisitionListsDetails,
			notifyError,
			orderId,
			showSuccessMessage,
			storeId,
		]
	);

	const deleteRequisitionListItems = useCallback(
		async (orderItemIds: string[]) => {
			try {
				await Promise.all(
					orderItemIds.map((orderItemId) =>
						requisitionListItemUpdate(true)(
							{
								storeId,
								langId,
								requisitionListId: orderId,
								data: { orderItemId, quantity: 0 },
							},
							extraParams
						)
					)
				);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
				// go back a page if this page will no longer exist
				if (
					pageIndex > 0 &&
					pageIndex === pageCount - 1 &&
					data?.orderItem?.length === SINGLE_RECORD
				) {
					setPagination((prev: any) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
				}
				await mutateRequisitionListsDetails();
				showSuccessMessage(deletedItemListSuccessfully.t({ count: orderItemIds.length }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			mutate,
			pageIndex,
			pageCount,
			data?.orderItem?.length,
			mutateRequisitionListsDetails,
			showSuccessMessage,
			deletedItemListSuccessfully,
			storeId,
			langId,
			orderId,
			extraParams,
			notifyError,
		]
	);

	const updateRequisitionListInfo = useCallback(
		async (query: { status: string; name: string }) => {
			try {
				await requisitionListUpdate(true)(
					{
						storeId,
						requisitionListId: orderId,
						query,
					},
					extraParams
				);
				await mutate(requisitionListsMutatorKeyMatcher(EMPTY_STRING), undefined);
				await mutateRequisitionListsDetails();
				showSuccessMessage(successMessage);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			storeId,
			orderId,
			extraParams,
			mutate,
			mutateRequisitionListsDetails,
			showSuccessMessage,
			successMessage,
			notifyError,
		]
	);

	return {
		data: data as Order | undefined,
		readOnly: user?.userId !== data?.buyerId,
		isLoading,
		error,
		pagination,
		setPagination,
		pageCount,
		orderId,
		updateRequisitionListItem,
		submitToCurrentPendingOrder,
		fetchPartNumberSuggestion,
		deleteRequisitionListItems,
		updateRequisitionListInfo,
		onSKUAdd,
		addItemToCart,
		sorting,
		setSorting,
	};
};
