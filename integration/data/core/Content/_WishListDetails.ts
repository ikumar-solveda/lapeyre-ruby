/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BASE_ADD_2_CART_BODY, addToCartFetcher, useCart } from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useNotifications } from '@/data/Content/Notifications';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	CreateEditData,
	PageData,
	WL_NAME_REGEX,
	wishListRemoverOrItemRemover,
	wishListUpdater,
} from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { WISHLIST_DETAILS_PAGE_SIZE } from '@/data/constants/wishlist';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ProductType } from '@/data/types/Product';
import { dFix } from '@/data/utils/floatingPoint';
import { processError } from '@/data/utils/processError';
import {
	WishlistWishlist,
	WishlistWishlistItem,
} from 'integration/generated/transactions/data-contracts';
import { ChangeEvent, useCallback, useState } from 'react';
import { KeyedMutator } from 'swr';
export { wishListUpdater };

type DialogState = 'list' | 'multi' | false;
type WishListProductSelection = {
	size: number;
	selected: Record<string, boolean>;
};

export const useWishListDetails = (
	wishList: WishlistWishlistItem,
	onDelete: (wishList: WishlistWishlistItem) => () => Promise<void>,
	mutateWishLists: KeyedMutator<WishlistWishlist | undefined>
) => {
	// state
	const [edit, setEdit] = useState<boolean>(false);
	const [editData, setEditData] = useState<CreateEditData>({
		name: wishList?.description,
	} as CreateEditData);
	const [selection, setSelection] = useState<WishListProductSelection>({ size: 0, selected: {} });
	const [pagination, setPagination] = useState<PageData>({
		pageNumber: 1,
		pageSize: WISHLIST_DETAILS_PAGE_SIZE,
	});
	const [dialogState, setDialogState] = useState<DialogState>(false);
	const [clicked, setClicked] = useState<boolean>(false);
	// wish list
	const items = wishList.item ?? [];
	const totalPages = dFix(Math.ceil(items.length / pagination.pageSize), 0);
	const start = pagination.pageSize * (pagination.pageNumber - 1);
	const displayedItems = items.slice(start, pagination.pageSize + start);

	// hooks
	const { mutateCart } = useCart();
	const localization = useLocalization('WishList');
	const router = useNextRouter();
	const route = useLocalization('Routes');
	const { settings } = useSettings();

	const params = useExtraRequestParameters();

	const success = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();

	const { storeLocator } = useStoreLocatorState();

	const itemsPartNumbers = items.map((item) => item.partNumber);
	const { availability } = useInventoryV2({
		partNumber: itemsPartNumbers?.toString(),
		physicalStore: storeLocator.selectedStore,
	});
	const { pickupInStoreShipMode } = useAllowableShippingModes();

	const onDialog = useCallback((state: DialogState) => () => setDialogState(state), []);

	const onEdit = useCallback((state: boolean) => () => setEdit(state), []);

	const _onDeleteItemsCommon = useCallback(
		async (...product: ProductType[]) => {
			const storeId = settings?.storeId as string;
			const wlId = wishList.uniqueID as string;
			const rc = await Promise.all(
				product.map((p) =>
					wishListRemoverOrItemRemover(true)(storeId, wlId, { productId: p.id }, params)
				)
			);

			// update pagination
			const numOfItems = items.length - rc.length;
			const newPageNum = Math.ceil(numOfItems / pagination.pageSize);
			if (newPageNum < totalPages && pagination.pageNumber > newPageNum) {
				setPagination((prev) => ({ ...prev, pageNumber: newPageNum }));
			}

			// reload wishlist
			mutateWishLists();

			return rc;
		},
		[
			items.length,
			mutateWishLists,
			pagination,
			params,
			settings?.storeId,
			totalPages,
			wishList.uniqueID,
		]
	);

	const onDeleteFromWishList = useCallback(
		(...product: ProductType[]) =>
			async () => {
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
			},
		[_onDeleteItemsCommon, notifyError, onDialog, showSuccessMessage, success]
	);

	const onAddToCart = useCallback(
		(...product: ProductType[]) =>
			async () => {
				setClicked(true);
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
					await addToCartFetcher(true)(settings?.storeId ?? '', {}, data, params);
					await mutateCart();
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
				setClicked(false);
			},
		[
			availability,
			pickupInStoreShipMode?.shipModeId,
			settings?.storeId,
			params,
			mutateCart,
			_onDeleteItemsCommon,
			showSuccessMessage,
			success,
			notifyError,
		]
	);

	const onDeleteWishList = useCallback(async () => {
		// use landing page's onDelete (we'll route there anyway and it handles its own pagination)
		onDelete(wishList)();
		router.push(route.WishLists.route.t());
	}, [onDelete, route.WishLists.route, router, wishList]);

	const selectAll = () =>
		setSelection({
			size: items.length,
			selected: items.reduce((agg, v) => {
				agg[v.partNumber] = true;
				return agg;
			}, {} as Record<string, boolean>),
		});

	const deSelectAll = () => setSelection({ size: 0, selected: {} });

	const toggle = useCallback(
		(product: ProductType) => () => {
			setSelection(({ size, selected }) => ({
				size: size + (selected[product.partNumber] ? -1 : 1),
				selected: { ...selected, [product.partNumber]: !selected[product.partNumber] },
			}));
		},
		[]
	);

	const onPage = (event: ChangeEvent<unknown>, page: number) => {
		setPagination((prev) => ({ ...prev, pageNumber: page }));
	};

	const invalidName = useCallback(
		(name: string) => !name?.trim().length || !WL_NAME_REGEX.test(name),
		[]
	);

	const onUpdateName = useCallback(async () => {
		try {
			const rc = await wishListUpdater(true)(
				settings?.storeId as string,
				wishList.uniqueID as string,
				{ description: editData.name },
				undefined,
				params
			);
			if (rc) {
				onEdit(false)();
				mutateWishLists();
				showSuccessMessage(success.UPDATE_WISHLIST_NAME_SUCCESS.t([editData.name]));
			}
		} catch (error) {
			notifyError(processError(error as TransactionErrorResponse));
		}
	}, [
		editData,
		mutateWishLists,
		notifyError,
		onEdit,
		params,
		settings,
		showSuccessMessage,
		success,
		wishList,
	]);

	const onEditData = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const newName = event.target.value;
			setEditData((prev) => ({ ...prev, name: newName, error: invalidName(newName) }));
		},
		[invalidName]
	);

	const getCardActions = useCallback(
		(product: ProductType) => [
			{
				text: localization.Actions.AddToCart.t(),
				handleClick: onAddToCart(product),
				disable: (selection.size > 1 && selection.selected[product.partNumber]) || clicked,
				variant: 'outlined',
			},
			{
				text: localization.Actions.Delete.t(),
				enableConfirmation: true,
				handleClick: onDeleteFromWishList(product),
				disable: selection.size > 1 && selection.selected[product.partNumber],
			},
		],
		[clicked, localization, onAddToCart, onDeleteFromWishList, selection]
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
		items,
		displayedItems,
		onDeleteWishList,
		edit,
		onEdit,
		editData,
		onEditData,
		onUpdateName,
		dialogState,
		onDialog,
	};
};
