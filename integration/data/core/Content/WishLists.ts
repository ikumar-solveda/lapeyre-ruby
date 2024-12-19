/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import {
	WL_NAME_REGEX,
	CreateEditData as _CreateEditData,
	PageData as _PageData,
	wishListCreator,
	wishListRemoverOrItemRemover,
	wishListsFetcher,
	wishListsMapper,
} from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_WISH_LIST } from '@/data/constants/dataKey';
import { WISHLIST_PAGE_SIZE, WISHLIST_STATE } from '@/data/constants/wishlist';
import { TransactionErrorResponse } from '@/data/types/Basic';

import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { invalidWishListName } from '@/data/utils/invalidWishListName';
import { mapProductsByPN } from '@/data/utils/mapProductData';
import { processError } from '@/data/utils/processError';
import type {
	WishlistWishlist,
	WishlistWishlistItem,
} from 'integration/generated/transactions/data-contracts';
import { keyBy } from 'lodash';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../User';
export { WL_NAME_REGEX, wishListRemoverOrItemRemover, wishListsFetcher, wishListsMapper };
export type PageData = _PageData;
export type CreateEditData = _CreateEditData;

export const useWishLists = () => {
	const routes = useLocalization('Routes');
	const router = useNextRouter();
	const { user } = useUser();
	const { query } = router;
	const params = useExtraRequestParameters();
	const { id } = query;
	const [pagination, setPagination] = useState<PageData>({
		pageNumber: 1,
		pageSize: WISHLIST_PAGE_SIZE,
	});
	const [creationData, setCreationData] = useState<CreateEditData>({ name: '' } as CreateEditData);
	const { settings } = useSettings();
	const { langId } = getClientSideCommon(settings, router);

	const { showSuccessMessage, notifyError } = useNotifications();

	// get wishlists
	const {
		data,
		error,
		mutate: mutateWishLists,
	} = useSWR(
		user?.isLoggedIn && settings?.storeId
			? [{ storeId: settings.storeId, pagination }, DATA_KEY_WISH_LIST]
			: null,
		async ([{ storeId, pagination }]) =>
			wishListsFetcher(true)(storeId, pagination, undefined, params),
		{ revalidateIfStale: true }
	);

	// tidy
	const { wishLists, totalPages, totalLists } = useMemo(
		() => wishListsMapper(data as WishlistWishlist, pagination),
		[data, pagination]
	);

	// index wishLists by their ids
	const wishListMap = useMemo(() => keyBy(wishLists, 'uniqueID'), [wishLists]);

	// get products inside each wishlist
	const partNumber = useMemo(
		() =>
			wishLists.flatMap((wishList) => wishList?.item?.map(({ partNumber }) => partNumber) ?? []),
		[wishLists]
	);

	const { data: products } = useSWR(
		settings?.storeId && partNumber.length
			? [
					{
						storeId: settings.storeId,
						partNumber,
						langId,
						...getCurrencyParamFromContext(user?.context),
					},
					DATA_KEY_WISH_LIST,
			  ]
			: null,
		async ([{ storeId, partNumber, currency, langId }]) =>
			productFetcher(true)({ storeId, partNumber, currency, langId }, params)
	);
	// index those products by their partNumbers
	const productMap = useMemo(() => mapProductsByPN(products), [products]);

	const localization = useLocalization('WishList');
	const success = useLocalization('success-message');

	/** @deprecated use `invalidWishListName` */
	const invalidName = useCallback(
		(name: string) => !name?.trim().length || !WL_NAME_REGEX.test(name),
		[]
	);

	const onCreate = useCallback(
		async (_event: MouseEvent<HTMLButtonElement>) => {
			if (creationData.name.trim().length === 0) {
				setCreationData({ name: '', error: true });
			} else {
				try {
					await wishListCreator(true)(
						settings?.storeId as string,
						{
							description: creationData.name.trim(),
							registry: false,
							state: WISHLIST_STATE.ACTIVE,
						},
						undefined,
						params
					);

					const newPageNumber = Math.ceil((totalLists + 1) / pagination.pageSize);
					if (newPageNumber === pagination.pageNumber) {
						mutateWishLists();
					} else {
						setPagination((prev) => ({
							...prev,
							pageNumber: newPageNumber,
						}));
					}

					setCreationData({ name: '', error: false });
					showSuccessMessage(success.CREATE_WISHLIST_SUCCESS.t([creationData.name.trim()]));
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[
			creationData,
			mutateWishLists,
			notifyError,
			pagination,
			params,
			settings,
			showSuccessMessage,
			success,
			totalLists,
		]
	);

	/** @deprecated use `onNameV2` */
	const onName = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const newName = event.target.value;
			setCreationData((prev) => ({ ...prev, name: newName, error: invalidName(newName) }));
		},
		[invalidName]
	);

	const onNameV2 = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newName = event.target.value;
		setCreationData((prev) => ({ ...prev, name: newName, error: invalidWishListName(newName) }));
	}, []);

	const onPage = useCallback((event: ChangeEvent<unknown>, page: number) => {
		setPagination((prev) => ({ ...prev, pageNumber: page }));
	}, []);

	const onDelete = useCallback(
		(wishList: WishlistWishlistItem) => async () => {
			try {
				await wishListRemoverOrItemRemover(true)(
					settings?.storeId as string,
					wishList.uniqueID as string,
					undefined,
					params
				);

				// go back a page if this page will no longer exist
				if (
					pagination.pageNumber > 1 &&
					pagination.pageNumber === totalPages &&
					wishLists.length === 1
				) {
					setPagination((prev) => ({ ...prev, pageNumber: pagination.pageNumber - 1 }));
				} else {
					mutateWishLists();
				}
				showSuccessMessage(success.DELETE_WISHLIST_SUCCESS.t([wishList.description as string]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			mutateWishLists,
			notifyError,
			pagination,
			settings,
			showSuccessMessage,
			success,
			totalPages,
			wishLists,
			params,
		]
	);

	/** @deprecated use `onViewV2` */
	const onView = useCallback(
		(wishList: WishlistWishlistItem) => () =>
			router.push({
				pathname: routes.WishLists.route.t(),
				query: { id: wishList.uniqueID },
			}),
		[router, routes.WishLists.route]
	);

	const onViewV2 = useCallback(
		(wishList: WishlistWishlistItem) => () =>
			router.push({
				pathname: routes.WishListDetails.route.t(),
				query: { id: wishList.uniqueID },
			}),
		[router, routes.WishListDetails.route]
	);

	/** @deprecated use `getCardActionsV2` */
	const getCardActions = useCallback(
		(wishList: WishlistWishlistItem) => {
			const cardAction = [];
			cardAction.push({
				text: localization.ViewList.t(),
				handleClick: onView(wishList),
			});
			if (wishList.state !== WISHLIST_STATE.DEFAULT) {
				cardAction.push({
					text: localization.Actions.DeleteList.t(),
					enableConfirmation: true,
					handleClick: onDelete(wishList),
				});
			}

			return cardAction;
		},
		[localization, onDelete, onView]
	);

	const getCardActionsV2 = useCallback(
		(wishList: WishlistWishlistItem) => {
			const cardAction = [];
			cardAction.push({
				text: localization.ViewList.t(),
				handleClick: onViewV2(wishList),
			});
			if (wishList.state !== WISHLIST_STATE.DEFAULT) {
				cardAction.push({
					text: localization.Actions.DeleteList.t(),
					enableConfirmation: true,
					handleClick: onDelete(wishList),
				});
			}

			return cardAction;
		},
		[localization, onDelete, onViewV2]
	);

	return {
		pagination,
		totalPages,
		data,
		error,
		wishLists,
		onPage,
		getCardActions,
		productMap,
		invalidName,
		onName,
		onNameV2,
		creationData,
		onCreate,
		id,
		wishListMap,
		onDelete,
		mutateWishLists,
		getCardActionsV2,
	};
};
