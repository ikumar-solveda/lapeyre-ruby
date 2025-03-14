/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DATA_KEY_IN_PROGRESS_ORDERS } from '@/data/constants/dataKey';
import { IN_PROGRESS_ORDERS_STATUS } from '@/data/constants/inProgressOrders';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PAGINATION } from '@/data/constants/tablePagination';
import { cancelCart } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import {
	inProgressOrdersCopyCreator,
	inProgressOrdersCreator,
	inProgressOrdersRemover,
} from '@/data/Content/_InProgressOrders';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { ordersByStatus, STATUS_PENDING } from '@/data/Content/_Order';
import { setAsPendingOrder, useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import type {
	CopyOrderProps,
	CreateNewOrderProps,
	InProgressOrdersDialogStateType,
} from '@/data/types/InProgressOrders';
import { useUser } from '@/data/User';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { PaginationState } from '@tanstack/react-table';
import { debounce, keyBy } from 'lodash';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export const useInProgressOrders = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { user } = useUser();
	const { storeId, langId, defaultCurrency } = getClientSideCommon(settings, router);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const [showDialog, setShowDialog] = useState(false); // used only for dialog transitions
	const [dialogState, setDialogState] = useState<InProgressOrdersDialogStateType>();
	const [orderId, setOrderId] = useState<string[]>([]);
	const params = useExtraRequestParameters();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const currency = useMemo(
		() => getCurrencyFromContext(user?.context) ?? defaultCurrency,
		[defaultCurrency, user?.context]
	);
	const { data: cart } = useCart();
	const activeOrderId = cart?.orderId ?? EMPTY_STRING;
	const successMessageNLS = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();

	const openDialog = useCallback((state: InProgressOrdersDialogStateType) => {
		setShowDialog(true);
		setDialogState(state);
	}, []);

	const closeDialog = useCallback(() => {
		setShowDialog(false);
		setTimeout(() => {
			setOrderId([]);
			setDialogState(undefined);
		}, 300);
	}, [setDialogState, setOrderId]);

	const {
		data,
		error,
		mutate: mutateInProgressOrdersList,
		isLoading,
	} = useSWR(
		storeId
			? [
					{
						storeId,
						status: STATUS_PENDING,
						query: {
							orderType: 'all' as const,
							...(isB2BStore(settings) ? { activeOrg: true } : {}),
							currency,
							langId,
							// add back server-side pagination if server-side search gets implemented
						},
					},
					DATA_KEY_IN_PROGRESS_ORDERS,
			  ]
			: null,
		async ([{ storeId, status, query }]) => ordersByStatus(true)(storeId, status, query, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const onSearch = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				setPagination((prev) => ({ ...prev, pageIndex: 0 }));
				setSearchTerm(e.target.value.trim());
			}, 500),
		[]
	);

	const filteredOrders = useMemo(() => {
		const orders = searchTerm
			? data?.Order?.filter(
					(order) =>
						order.orderId?.includes(searchTerm) ||
						new RegExp(searchTerm, 'i').test(order.orderDescription as string)
			  )
			: data?.Order;
		const rc = orders ?? [];

		// ensure the current cart is the first item if it exists
		if (activeOrderId) {
			const activeOrderIndex = rc.findIndex(({ orderId }) => orderId === activeOrderId);
			if (activeOrderIndex > 0) {
				const swap = rc[activeOrderIndex];
				rc[activeOrderIndex] = rc[0];
				rc[0] = swap;
			}
		}

		return rc;
	}, [activeOrderId, data?.Order, searchTerm]);

	const { orders, pageCount } = useMemo(() => {
		const start = pagination.pageIndex * pagination.pageSize;
		const end = start + pagination.pageSize;
		const pageCount = Math.ceil(filteredOrders.length / pagination.pageSize);
		return { orders: filteredOrders.slice(start, end), pageCount };
	}, [filteredOrders, pagination]);

	const onCreate = useCallback(
		async (values: CreateNewOrderProps) => {
			try {
				if (activeOrderId) {
					const mine = data?.Order?.filter(({ buyerId }) => buyerId === user?.userId).length;
					// If there is only an active cart, set it as pending order to avoid subsequent orders being created as carts
					if (mine === 1) {
						await setAsPendingOrder(true)(
							storeId,
							activeOrderId,
							{ orderId: activeOrderId },
							params
						);
					}
				}
				const query = {
					description: values.name.trim(),
					isSharedOrder: values.status === IN_PROGRESS_ORDERS_STATUS.SHARED,
				};
				const res = await inProgressOrdersCreator(true)({ storeId, query, params });
				closeDialog();

				if (res?.outOrderId) {
					if (!activeOrderId) {
						// If there is no cart, first order created, set it as cart to avoid subsequent orders being created as carts
						await setAsPendingOrder(true)(
							storeId,
							res.outOrderId,
							{ orderId: res.outOrderId },
							params
						);
						await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
					}
					showSuccessMessage(
						successMessageNLS.CREATE_IN_PROGRESS_ORDERS_SUCCESS.t([res.outOrderId])
					);
				}
				await mutateInProgressOrdersList();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			activeOrderId,
			data,
			user,
			storeId,
			params,
			closeDialog,
			mutateInProgressOrdersList,
			showSuccessMessage,
			successMessageNLS,
			notifyError,
		]
	);

	const onCopy = useCallback(
		async (values: CopyOrderProps) => {
			try {
				const data = {
					description: values.name.trim(),
					fromOrderId_1: values.orderId,
					copyOrderItemId_1: '*',
				};
				const res = await inProgressOrdersCopyCreator(true)({ storeId, data, params });
				closeDialog();
				const newOrderId = res?.orderId?.at(0) ?? EMPTY_STRING;
				showSuccessMessage(successMessageNLS.CREATE_IN_PROGRESS_ORDERS_SUCCESS.t([newOrderId]));
				await mutateInProgressOrdersList();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			closeDialog,
			mutateInProgressOrdersList,
			notifyError,
			params,
			showSuccessMessage,
			storeId,
			successMessageNLS,
		]
	);

	/**
	 * Check if cart was in the list of removed orders -- if so, find an order that we can set as
	 *   the current cart -- it mustn't be in the list of removed orders
	 * @param removedOrders pending orders that were recently removed/deleted
	 */
	const setNextCart = useCallback(
		async (removedOrders: string[]) => {
			const search = keyBy(removedOrders);
			if (search[activeOrderId]) {
				const next = data?.Order?.find(
					({ orderId, buyerId }) => !search[`${orderId}`] && buyerId === user?.userId
				);
				if (next) {
					await setAsPendingOrder(true)(
						storeId,
						`${next.orderId}`,
						{ orderId: next.orderId },
						params
					);
				}
			}
		},
		[activeOrderId, data, params, storeId, user]
	);

	const onDelete = useCallback(
		async (orderIds: string[]) => {
			try {
				await Promise.all(
					orderIds.map((orderId) =>
						orderId === activeOrderId
							? cancelCart(true)(storeId, undefined, params)
							: inProgressOrdersRemover(true)({ storeId, orderId, params })
					)
				);
				await setNextCart(orderIds);
				closeDialog();
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
				await mutateInProgressOrdersList();
				showSuccessMessage(
					successMessageNLS.DELETE_IN_PROGRESS_ORDERS_SUCCESS.t({ count: orderIds.length })
				);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			activeOrderId,
			setNextCart,
			closeDialog,
			mutateInProgressOrdersList,
			notifyError,
			params,
			showSuccessMessage,
			storeId,
			successMessageNLS,
		]
	);

	return {
		data: filteredOrders,
		orders,
		error,
		mutateInProgressOrdersList,
		isLoading,
		pagination,
		setPagination,
		pageCount,
		onSearch,
		onCreate,
		showDialog,
		openDialog,
		closeDialog,
		dialogState,
		onCopy,
		setOrderId,
		orderId,
		onDelete,
		user,
	};
};
