/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import {
	addToCartFetcherV2,
	BASE_ADD_2_CART_BODY,
	BASE_ADD_2_CART_BODY_ALTERNATE,
	setAsPendingOrder,
	updateCartFetcher,
	useCart,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useProductsByPartNumbers } from '@/data/Content/ProductsByPartNumbers';
import { useSiteContentSuggestions } from '@/data/Content/SiteContentSuggestions';
import { addItemToNonCartOrder } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orderByIdFetcher } from '@/data/Content/_Order';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_IN_PROGRESS_ORDER_DETAILS } from '@/data/constants/dataKey';
import { DIALOG_STATES, ONE_QUANTITY } from '@/data/constants/inProgressOrders';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { SKU_SUGGESTION_SEARCH_TYPE_NO_PRODUCTS } from '@/data/constants/siteContentSuggestion';
import { PAGINATION } from '@/data/constants/tablePagination';
import type { TransactionErrorResponse } from '@/data/types/Basic';
import type {
	InProgressOrderNameForm,
	InProgressOrdersDialogStateType,
} from '@/data/types/InProgressOrders';
import type { Order } from '@/data/types/Order';
import type { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { inProgressOrderDetailsMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/inProgressOrderDetailsMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { AutocompleteInputChangeReason, debounce } from '@mui/material';
import { PaginationState } from '@tanstack/react-table';
import { transactionsCart } from 'integration/generated/transactions';
import { ComIbmCommerceRestOrderHandlerCartHandlerAddPreConfigurationToCartRequest } from 'integration/generated/transactions/data-contracts';
import { keyBy } from 'lodash';
import { MouseEvent, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export const useInProgressOrderDetails = () => {
	const successMessageNLS = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();
	const { settings } = useSettings();
	const { storeId } = settings;
	const router = useNextRouter();
	const { defaultCurrency } = getClientSideCommon(settings, router);
	const orderId = useMemo(() => [router.query.id].flat().at(0) ?? EMPTY_STRING, [router]);
	const extraParams = useExtraRequestParameters();
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const { user } = useUser();
	const cartData = useCart();
	const activeOrderId = cartData.data?.orderId ?? EMPTY_STRING;
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const [options, setOptions] = useState<ProductSuggestionEntry[]>([]);
	const { fetchPartNumberSuggestion } = useSiteContentSuggestions();
	const isGenericUser = user?.isGeneric ?? false;
	const requestParams = useExtraRequestParameters();
	const nls = useLocalization('InProgressOrderDetails');
	const RouteLocal = useLocalization('Routes');
	const [selected, setSelected] = useState<string[]>([]);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogState, setDialogState] = useState<InProgressOrdersDialogStateType>();
	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const currency = useMemo(
		() => getCurrencyFromContext(user?.context) ?? defaultCurrency,
		[defaultCurrency, user?.context]
	);
	const swrKey = useMemo<[any, string] | null>(
		() =>
			orderId
				? [
						shrink({ storeId, orderId, query: { pageNumber: pageIndex + 1, pageSize, currency } }),
						DATA_KEY_IN_PROGRESS_ORDER_DETAILS,
				  ]
				: null,
		[orderId, pageIndex, pageSize, storeId, currency]
	);

	const { data, error, isLoading } = useSWR(
		swrKey,
		async ([props]) => {
			const { storeId, orderId, query } = expand<Record<string, any>>(props);
			return orderByIdFetcher(true)(storeId, orderId, query, extraParams);
		},
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const isBuyerMismatch = useMemo(() => data?.buyerId !== user?.userId, [data, user]);

	const pageCount = useMemo(
		() => Math.ceil(dFix(data?.recordSetTotal ?? 0) / pagination.pageSize),
		[data, pagination.pageSize]
	);

	const partNumbers = useMemo(() => data?.orderItem?.map(({ partNumber: p }) => p) ?? [], [data]);

	const { data: productListData } = useProductsByPartNumbers(partNumbers);
	const products = useMemo(() => keyBy(productListData, 'partNumber'), [productListData]);

	const onDialog = useCallback(
		(state?: InProgressOrdersDialogStateType) => async () => {
			setDialogOpen((prev) => !prev);
			if (!state) {
				setTimeout(() => setDialogState(undefined), 300);
			} else {
				setDialogState(state);
			}
		},
		[]
	);

	const mutateInProgressOrderDetails = useCallback(
		async () => await mutate(inProgressOrderDetailsMutatorKeyMatcher(EMPTY_STRING), undefined),
		[]
	);

	const onSaveName = useCallback(
		async (formData: InProgressOrderNameForm) => {
			try {
				const data = {
					description: formData.name.trim(),
					fromOrderId: orderId,
					toOrderId: orderId,
				};
				await transactionsCart(true).cartCopyOrder(storeId, undefined, data, extraParams);
				onDialog()();
				showSuccessMessage(successMessageNLS.IN_PROGRESS_ORDER_NAME_UPDATED.t());
				await mutateInProgressOrderDetails();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			orderId,
			storeId,
			extraParams,
			onDialog,
			showSuccessMessage,
			successMessageNLS,
			mutateInProgressOrderDetails,
			notifyError,
		]
	);

	const refresh = useCallback(async () => {
		await mutateInProgressOrderDetails();
		if (orderId === activeOrderId) {
			await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
			await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined);
		}
	}, [activeOrderId, currentCartSWRKey, mutateInProgressOrderDetails, orderId]);

	const deleteOrderItems = useCallback(async () => {
		try {
			const data = {
				orderId,
				x_calculateOrder: ORDER_CONFIGS.calculateOrder,
				orderItem: selected.map((id) => ({ quantity: '0', orderItemId: id })),
				x_calculationUsage: ORDER_CONFIGS.calculationUsage,
				x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
				x_validateInventoryForFulfillmentCenter:
					ORDER_CONFIGS.inventoryValidationForFulfillmentCenter.toString(),
			};
			await updateCartFetcher(true)(storeId, {}, data, extraParams);
			await refresh();
			showSuccessMessage(
				successMessageNLS.DELETE_IN_PROGRESS_ORDER_ITEMS_SUCCESS.t({ count: selected.length })
			);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [
		orderId,
		selected,
		storeId,
		extraParams,
		refresh,
		showSuccessMessage,
		successMessageNLS,
		notifyError,
	]);

	const onDelete = useCallback(
		(...items: string[] | string[][]) =>
			async () => {
				setSelected(items.flat());
				onDialog(DIALOG_STATES.DELETE)();
			},
		[onDialog]
	);

	const onDeleteConfirm = useCallback(async () => {
		await deleteOrderItems();
		onDialog()();
	}, [deleteOrderItems, onDialog]);

	const onDebouncedSearch = useMemo(
		() =>
			debounce(async (searchTerm: string, reason: AutocompleteInputChangeReason) => {
				if (reason === 'input') {
					if (searchTerm) {
						const options = await fetchPartNumberSuggestion({
							searchTerm,
							searchType: SKU_SUGGESTION_SEARCH_TYPE_NO_PRODUCTS,
						});
						setOptions(options ?? ([] as ProductSuggestionEntry[]));
					} else {
						setOptions([]);
					}
					setSearchTerm(searchTerm);
				}
			}, 300),
		[fetchPartNumberSuggestion]
	);

	const onSearchInputChange = useCallback(
		async (_event: SyntheticEvent, searchTerm: string, reason: AutocompleteInputChangeReason) =>
			await onDebouncedSearch(searchTerm, reason),
		[onDebouncedSearch]
	);

	const onAddToOrder = useCallback(
		async (selectedSKU: ProductSuggestionEntry) => {
			const requestData = {
				...BASE_ADD_2_CART_BODY_ALTERNATE,
				orderId,
				partNumber: selectedSKU.partNumber,
				quantity: ONE_QUANTITY,
			} as ComIbmCommerceRestOrderHandlerCartHandlerAddPreConfigurationToCartRequest;

			try {
				await addItemToNonCartOrder(true)(settings.storeId, requestData, requestParams);
				await refresh();
				showSuccessMessage(nls.AddProductSuccessMsg.t({ sku: selectedSKU.partNumber ?? '' }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[orderId, settings, requestParams, refresh, showSuccessMessage, nls, notifyError]
	);

	const onAddProduct = useCallback(
		async (_event: SyntheticEvent, value: ProductSuggestionEntry | null, reason: string) => {
			_event.preventDefault();
			_event.stopPropagation();
			if (reason === 'selectOption') {
				onAddToOrder(value as ProductSuggestionEntry);
			}
		},
		[onAddToOrder]
	);

	const onMoveOrderItemToCart = useCallback(
		(partNumber: string, quantity: string) => async () => {
			const orderItem = [{ partNumber, quantity }];
			const requestData = { ...BASE_ADD_2_CART_BODY, orderId: activeOrderId, orderItem };

			try {
				await addToCartFetcherV2(isGenericUser)(settings.storeId, {}, requestData, requestParams);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
				showSuccessMessage(nls.MoveProductToCartSuccessMsg.t({ sku: partNumber }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			activeOrderId,
			isGenericUser,
			settings.storeId,
			requestParams,
			currentCartSWRKey,
			showSuccessMessage,
			nls,
			notifyError,
		]
	);

	const onOrderItemQuantityChange = useCallback(
		async (orderItemId: string, quantity: string) => {
			const orderItem = [{ orderItemId, quantity }];
			const requestData = { ...BASE_ADD_2_CART_BODY, orderId: data?.orderId, orderItem };

			try {
				await updateCartFetcher(true)(storeId, {}, requestData, requestParams);
				await refresh();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[data, storeId, requestParams, refresh, notifyError]
	);

	const getOptionLabel = useCallback(
		(option?: ProductSuggestionEntry) =>
			option?.partNumber ? `${option.partNumber} (${option.name})` : EMPTY_STRING,
		[]
	);

	const setAsCurrentCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			try {
				await setAsPendingOrder(true)(settings.storeId, orderId, { orderId }, requestParams);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined);
				router.push(RouteLocal.Cart.route.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[RouteLocal, currentCartSWRKey, notifyError, orderId, requestParams, router, settings.storeId]
	);

	return {
		data: data as Order | undefined,
		products,
		isLoading,
		error,
		orderId,
		onSaveName,
		deleteOrderItems,
		pagination,
		setPagination,
		pageCount,
		options,
		onSearchInputChange,
		onAddProduct,
		getOptionLabel,
		setAsCurrentCart,
		activeOrderId,
		onMoveOrderItemToCart,
		cartData,
		user,
		selected,
		dialogOpen,
		dialogState,
		onOrderItemQuantityChange,
		onDelete,
		onDialog,
		onDeleteConfirm,
		isBuyerMismatch,
		searchTerm,
	};
};
