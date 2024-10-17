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
import { useNotifications } from '@/data/Content/Notifications';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { useProductMulti } from '@/data/Content/ProductMulti';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	deleteItemFromSaveForLaterList,
	fetchSaveForLaterListOrCreateNew,
	saveForLaterListFetcher,
} from '@/data/Content/_SaveForLaterList';
import { CreateEditData as _CreateEditData } from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_SAVE_FOR_LATER_LIST } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	ACCESS,
	DESC,
	DESC_NAME,
	GIFT_CARD,
	LOCATION,
	ONE_QUANTITY,
	SAVE_FOR_LATER_STATE,
} from '@/data/constants/saveForLaterList';
import { EventsContext } from '@/data/context/events';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { keyBy } from 'lodash';
import { MouseEvent, useCallback, useContext, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

export type CreateEditData = _CreateEditData;

export const useSaveForLater = () => {
	const { user } = useUser();
	// save for later list only for registered users, not for generic users
	const isGenericUser = user?.isGeneric ?? false;
	const success = useLocalization('success-message');
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const { onRemoveFromCart } = useContext(EventsContext);
	const { showSuccessMessage, notifyError } = useNotifications();
	const router = useNextRouter();
	const { storeId } = useMemo(() => getClientSideCommon(settings, router), [settings, router]);

	// get save for later list items
	const { data, mutate: mutateList } = useSWR(
		user?.isLoggedIn && storeId ? [{ storeId }, DATA_KEY_SAVE_FOR_LATER_LIST] : null,
		async ([{ storeId }]) => saveForLaterListFetcher(true)(storeId, undefined, params),
		{ revalidateIfStale: true }
	);

	const itemList = useMemo(() => data?.GiftList?.at(0)?.item ?? [], [data]);

	// get partnumbers from save for later list items
	const partNumber = useMemo(() => itemList.map(({ partNumber }) => partNumber).sort(), [itemList]);
	const { data: products } = useProductMulti(partNumber);
	const productsByKey = useMemo(() => keyBy(products, 'partNumber'), [products]);
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { storeLocator } = useStoreLocatorState();
	const { availability } = useInventoryV2({
		partNumber: partNumber?.toString(),
		physicalStore: storeLocator.selectedStore,
	});
	const { pickupInStoreShipMode } = useAllowableShippingModes();

	const deleteItem = useCallback(
		async (partNumber: string) => {
			let id: string = EMPTY_STRING;
			let name: string = EMPTY_STRING;
			const product = productsByKey[partNumber];
			if (product) {
				const { uniqueID } = await deleteItemFromSaveForLaterList(true)(
					storeId as string,
					data?.GiftList ? (data?.GiftList[0].uniqueID as string) : '',
					{},
					{ productId: product.id }
				);
				if (uniqueID) {
					id = uniqueID;
					name = product.name;
				}
			}
			return { id, name };
		},
		[productsByKey, storeId, data?.GiftList]
	);

	const moveToCartHelper = useCallback(
		async (partNumber: string) => {
			const avail =
				availability?.find((a) => a.partNumber === partNumber && a.status) ??
				availability?.find((a) => a.partNumber === partNumber && a.physicalStoreStatus);

			const orderItem = [
				{
					partNumber,
					quantity: ONE_QUANTITY,
					...(avail?.physicalStoreId && {
						physicalStoreId: avail.physicalStoreId,
						shipModeId: pickupInStoreShipMode?.shipModeId,
					}),
				},
			];

			const body = { ...BASE_ADD_2_CART_BODY, orderItem };
			try {
				const orderId = await addToCartFetcher(isGenericUser)(
					settings?.storeId ?? '',
					{},
					body,
					params
				);
				// save for later list only for registered users, not for generic users
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
				if (orderId) {
					const { id, name } = await deleteItem(partNumber);
					if (id) {
						await mutateList();
						showSuccessMessage(success.ITEM_MOVED_TO_CART_FROM_SAVE_FOR_LATER_LIST.t({ name }));
					}
				}
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			availability,
			pickupInStoreShipMode,
			isGenericUser,
			settings,
			params,
			deleteItem,
			mutateList,
			showSuccessMessage,
			success,
			notifyError,
			currentCartSWRKey,
		]
	);
	const onMoveToCart = useCallback(
		(partNumber: string) => async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			await moveToCartHelper(partNumber);
		},
		[moveToCartHelper]
	);

	const onMoveAll = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			await Promise.all(partNumber.map((p: string) => moveToCartHelper(p)));
		},
		[moveToCartHelper, partNumber]
	);

	const onCreate = useCallback(
		(
				partialProduct: ReturnType<typeof useOrderItemTableRow>['details'],
				quantity: number,
				updateCart: (quantity: number | null) => Promise<void>
			) =>
			async (event: MouseEvent) => {
				event.preventDefault();
				if (partialProduct) {
					const { partNumber, id: productId, name, seller, sellerId, prices } = partialProduct;
					const { currency = EMPTY_STRING, offer } = prices;
					try {
						// fetch or create list
						const { wishlistId } = await fetchSaveForLaterListOrCreateNew(true)(
							settings?.storeId as string,
							{
								item: [
									{ partNumber, quantityRequested: ONE_QUANTITY, location: LOCATION, productId },
								],
								descriptionName: DESC_NAME,
								description: DESC,
								giftCardAccepted: GIFT_CARD,
								accessSpecifier: ACCESS,
								state: SAVE_FOR_LATER_STATE,
							}
						);

						if (wishlistId) {
							// remove item from cart
							await updateCart(0);
							onRemoveFromCart({
								gtm: {
									partNumber,
									name,
									price: `${offer}`,
									currency,
									quantity: `${quantity}`,
									seller,
									sellerId,
									orgName: '',
									orgId: '',
									storeName: settings.storeName,
									settings,
								},
							});
							mutateList();
							showSuccessMessage(success.ITEM_ADDED_TO_SAVE_FOR_LATER_LIST.t({ name }));
						}
					} catch (e) {
						notifyError(processError(e as TransactionErrorResponse));
					}
				}
			},
		[settings, onRemoveFromCart, mutateList, showSuccessMessage, success, notifyError]
	);

	const deleteFromListHelper = useCallback(
		async (partNumber: string, deleteAll?: boolean) => {
			try {
				const { id, name } = await deleteItem(partNumber);

				if (id) {
					await mutateList();
					!deleteAll
						? showSuccessMessage(success.ITEM_DELETED_FROM_SAVE_FOR_LATER_LIST.t({ name }))
						: null;
				}
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, mutateList, showSuccessMessage, success, deleteItem]
	);

	const onDelete = useCallback(
		(partNumber: string) => async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			await deleteFromListHelper(partNumber);
		},
		[deleteFromListHelper]
	);

	const onDeleteAll = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			await Promise.all(partNumber.map((p: string) => deleteFromListHelper(p, true)));
			showSuccessMessage(success.ALL_ITEMS_DELETED_FROM_SAVE_FOR_LATER_LIST.t());
		},
		[deleteFromListHelper, partNumber, showSuccessMessage, success]
	);

	return {
		products,
		onCreate,
		onDelete,
		onMoveToCart,
		onMoveAll,
		onDeleteAll,
	};
};
