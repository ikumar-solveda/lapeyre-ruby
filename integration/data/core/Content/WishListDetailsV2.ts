/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	BASE_ADD_2_CART_BODY,
	addToCartFetcherV2 as addToCartFetcher,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';

import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import {
	CreateEditData,
	PageData,
	wishListDetailsFetcher,
	wishListRemoverOrItemRemover,
	wishListUpdater,
	wishListsDetailsMapper,
} from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC,
	DATA_KEY_WISH_LIST_DETAILS,
} from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { WISHLIST_DETAILS_PAGE_SIZE } from '@/data/constants/wishlist';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ProductType } from '@/data/types/Product';

import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { invalidWishListName } from '@/data/utils/invalidWishListName';
import { mapProductsByPN } from '@/data/utils/mapProductData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { WishlistWishlist } from 'integration/generated/transactions/data-contracts';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
export { wishListUpdater };

type DialogState = 'list' | 'multi' | false;

export type WishListProductSelection = {
	size: number;
	selected: Record<string, boolean>;
};

export const useWishListDetailsV2 = () => {
	const router = useNextRouter();
	const { id } = router.query;
	const { settings } = useSettings();
	const { user } = useUser();
	const { langId } = getClientSideCommon(settings, router);

	// get a wishlist details by its id
	const {
		data,
		error,
		mutate: mutateWishListDetails,
	} = useSWR(
		user?.isLoggedIn && settings?.storeId
			? [{ storeId: settings?.storeId, externalId: id as string }, DATA_KEY_WISH_LIST_DETAILS]
			: null,
		async ([{ storeId, externalId }]) =>
			wishListDetailsFetcher(true)(storeId, externalId, undefined, params),
		{ revalidateIfStale: true }
	);

	const { wishListDetails, wishListDetailsItem, partNumber } = useMemo(
		() => wishListsDetailsMapper(data as WishlistWishlist),
		[data]
	);
	const [busy, setBusy] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const [editData, setEditData] = useState<CreateEditData>({
		name: wishListDetails?.description,
	} as CreateEditData);
	const [selection, setSelection] = useState<WishListProductSelection>({ size: 0, selected: {} });
	const [pagination, setPagination] = useState<PageData>({
		pageNumber: 1,
		pageSize: WISHLIST_DETAILS_PAGE_SIZE,
	});
	const [dialogState, setDialogState] = useState<DialogState>(false);

	const { totalPages, start } = useMemo(() => {
		const totalPages = dFix(Math.ceil(wishListDetailsItem.length / pagination.pageSize), 0);
		const start = pagination.pageSize * (pagination.pageNumber - 1);
		return { totalPages, start };
	}, [pagination, wishListDetailsItem]);

	const displayedItems = useMemo(
		() => wishListDetailsItem.slice(start, pagination.pageSize + start),
		[pagination, start, wishListDetailsItem]
	);

	// get products in the wishlist
	const { data: products } = useSWR(
		settings?.storeId && partNumber.length
			? [
					{
						storeId: settings.storeId,
						partNumber,
						langId,
						...getCurrencyParamFromContext(user?.context),
					},
					DATA_KEY_WISH_LIST_DETAILS,
			  ]
			: null,
		async ([{ storeId, partNumber, currency, langId }]) =>
			productFetcher(true)({ storeId, partNumber, currency, langId }, params)
	);
	// index those products by their partNumbers
	const productMap = useMemo(() => mapProductsByPN(products), [products]);

	const currentCartSWRKey = useCartSWRKey(); // in current language
	const localization = useLocalization('WishList');

	const route = useLocalization('Routes');
	const { mutate } = useSWRConfig();
	const isGenericUser = user?.isGeneric ?? false;

	const params = useExtraRequestParameters();

	const success = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();

	const { storeLocator } = useStoreLocatorState();

	const itemsPartNumbers = useMemo(
		() => wishListDetailsItem.map((item) => item.partNumber),
		[wishListDetailsItem]
	);

	const { availability } = useInventoryV2({
		partNumber: itemsPartNumbers?.toString(),
		physicalStore: storeLocator.selectedStore,
	});
	const { pickupInStoreShipMode } = useAllowableShippingModes();

	const onDialog = useCallback(
		(state: DialogState) => (_e?: any, reason?: string) => {
			if (reason !== 'backdropClick') setDialogState(state);
		},
		[]
	);

	const onEdit = useCallback(
		(state: boolean) => () => {
			if (state) {
				setEditData((prev) => ({ ...prev, name: wishListDetails?.description ?? '' }));
			}
			setEdit(state);
		},
		[wishListDetails]
	);

	const _onDeleteItemsCommon = useCallback(
		async (...product: ProductType[]) => {
			const storeId = settings?.storeId as string;
			const wlId = wishListDetails.uniqueID as string;
			const rc = await Promise.all(
				product.map((p) =>
					wishListRemoverOrItemRemover(true)(storeId, wlId, { productId: p.id }, params)
				)
			);

			// update pagination
			const numOfItems = wishListDetailsItem.length - rc.length;
			const newPageNum = Math.ceil(numOfItems / pagination.pageSize);
			if (newPageNum < totalPages && pagination.pageNumber > newPageNum) {
				setPagination((prev) => ({ ...prev, pageNumber: newPageNum }));
			}

			// reload wishlist details
			mutateWishListDetails();

			return rc;
		},
		[
			mutateWishListDetails,
			pagination,
			params,
			settings,
			totalPages,
			wishListDetails,
			wishListDetailsItem,
		]
	);

	const deSelectAll = useCallback(() => setSelection({ size: 0, selected: {} }), []);

	const onDeleteFromWishList = useCallback(
		(...product: ProductType[]) =>
			async () => {
				setBusy(true);
				try {
					await _onDeleteItemsCommon(...product);

					// in case item deletion was from multi-selection, de-select-all and close modal
					deSelectAll();
					onDialog(false)();

					// notification
					const msgKey =
						product.length > 1 ? 'DELETE_WISHLIST_ITEMS_SUCCESS' : 'DELETE_WISHLIST_ITEM_SUCCESS';
					const arg = product.length > 1 ? `${product.length}` : product[0].name;
					showSuccessMessage(success[msgKey].t([arg]));
				} catch (error) {
					notifyError(processError(error as TransactionErrorResponse));
				}
				setBusy(false);
			},
		[_onDeleteItemsCommon, notifyError, onDialog, showSuccessMessage, deSelectAll, success]
	);

	const onAddToCart = useCallback(
		(...product: ProductType[]) =>
			async () => {
				setBusy(true);
				const orderItem = product.map(({ partNumber }) => {
					const avail =
						availability?.find((a) => a.partNumber === partNumber && a.status) ??
						availability?.find((a) => a.partNumber === partNumber && a.physicalStoreStatus);

					return {
						partNumber,
						quantity: '1',
						...(avail?.physicalStoreId && {
							physicalStoreId: avail.physicalStoreId,
							shipModeId: pickupInStoreShipMode?.shipModeId,
						}),
					};
				});
				const data = { ...BASE_ADD_2_CART_BODY, orderItem };
				try {
					await addToCartFetcher(isGenericUser)(settings?.storeId ?? '', {}, data, params);
					if (isGenericUser) {
						await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
						await mutate(
							personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC),
							undefined
						);
					}
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
					_onDeleteItemsCommon(...product);

					// in case item deletion was from multi-selection, de-select-all and close modal
					deSelectAll();

					// notification
					const msgKey = product.length > 1 ? 'ITEMS_N_TO_CART' : 'ITEM_TO_CART';
					const arg = product.length > 1 ? `${product.length}` : product[0].name;
					showSuccessMessage(success[msgKey].t([arg]), true);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
				setBusy(false);
			},
		[
			availability,
			pickupInStoreShipMode?.shipModeId,
			isGenericUser,
			settings?.storeId,
			params,
			mutate,
			currentCartSWRKey,
			_onDeleteItemsCommon,
			showSuccessMessage,
			success,
			notifyError,
			deSelectAll,
		]
	);

	const onDeleteWishList = useCallback(async () => {
		setBusy(true);
		try {
			await wishListRemoverOrItemRemover(true)(
				settings?.storeId as string,
				wishListDetails.uniqueID as string,
				undefined,
				params
			);
			showSuccessMessage(
				success.DELETE_WISHLIST_SUCCESS.t([wishListDetails.description as string])
			);
			await router.push(route.WishLists.route.t());
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
		setBusy(false);
	}, [
		notifyError,
		params,
		route.WishLists.route,
		router,
		settings?.storeId,
		showSuccessMessage,
		success,
		wishListDetails,
	]);

	const selectAll = useCallback(
		() =>
			setSelection({
				size: wishListDetailsItem.length,
				selected: wishListDetailsItem.reduce((agg, v) => {
					agg[v.partNumber] = true;
					return agg;
				}, {} as Record<string, boolean>),
			}),
		[wishListDetailsItem]
	);

	const toggle = useCallback(
		(product: ProductType) => () => {
			setSelection(({ size, selected }) => ({
				size: size + (selected[product.partNumber] ? -1 : 1),
				selected: { ...selected, [product.partNumber]: !selected[product.partNumber] },
			}));
		},
		[]
	);

	const onPage = useCallback((event: ChangeEvent<unknown>, page: number) => {
		setPagination((prev) => ({ ...prev, pageNumber: page }));
	}, []);

	const onUpdateName = useCallback(async () => {
		setBusy(true);
		try {
			const rc = await wishListUpdater(true)(
				settings?.storeId as string,
				wishListDetails.uniqueID as string,
				{ description: editData.name },
				undefined,
				params
			);
			if (rc) {
				onEdit(false)();
				mutateWishListDetails();
				showSuccessMessage(success.UPDATE_WISHLIST_NAME_SUCCESS.t([editData.name]));
			}
		} catch (error) {
			notifyError(processError(error as TransactionErrorResponse));
		}
		setBusy(false);
	}, [
		editData,
		mutateWishListDetails,
		notifyError,
		onEdit,
		params,
		settings,
		showSuccessMessage,
		success,
		wishListDetails,
	]);

	const onEditData = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newName = event.target.value;
		setEditData((prev) => ({ ...prev, name: newName, error: invalidWishListName(newName) }));
	}, []);

	const getCardActions = useCallback(
		(product: ProductType) => [
			{
				text: localization.Actions.AddToCart.t(),
				handleClick: onAddToCart(product),
				disable:
					busy ||
					(selection.size > 1 && selection.selected[product.partNumber]) ||
					!product.productPrice?.min,
				variant: 'outlined',
			},
			{
				text: localization.Actions.Delete.t(),
				enableConfirmation: true,
				handleClick: onDeleteFromWishList(product),
				disable: busy || (selection.size > 1 && selection.selected[product.partNumber]),
			},
		],
		[busy, localization, onAddToCart, onDeleteFromWishList, selection]
	);

	return {
		onAddToCart,
		onDeleteFromWishList,
		toggle,
		selection,
		getCardActions,
		deSelectAll,
		selectAll,
		pagination,
		onPage,
		totalPages,
		items: wishListDetailsItem,
		wishList: wishListDetails,
		displayedItems,
		productMap,
		onDeleteWishList,
		edit,
		onEdit,
		editData,
		onEditData,
		onUpdateName,
		dialogState,
		onDialog,
		error,
		busy,
	};
};
