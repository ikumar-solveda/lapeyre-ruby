/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_WISH_LIST } from '@/data/constants/dataKey';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ProductQueryResponse, ResponseProductType } from '@/data/types/Product';
import { RequestQuery } from '@/data/types/RequestQuery';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { dFix } from '@/data/utils/floatingPoint';
import { error as logError } from '@/data/utils/loggerUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { processError } from '@/data/utils/processError';
import { transactionsWishlist } from 'integration/generated/transactions';
import {
	WishlistWishlist,
	WishlistWishlistItem,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../User';

export const WL_NAME_REGEX = /^[a-zA-Z0-9 ]*$/;

export type PageData = {
	pageNumber: number; // ordinal
	pageSize: number;
};

export type CreateEditData = {
	name: string;
	error: boolean;
};

export const wishListsFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		pagination: PageData,
		query: RequestQuery = {},
		params: RequestParams
	) => {
		try {
			return await transactionsWishlist(pub).wishlistFindWishlist(
				storeId,
				{ ...query, ...pagination },
				params
			);
		} catch (e: any) {
			if (pub) {
				if (e?.status === 404) {
					return {};
				} else {
					logError(context?.req, 'WishLists: wishListsFetcher: error: %o', e);
					throw e;
				}
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};
export const wishListRemoverOrItemRemover =
	(pub: boolean) =>
	async (storeId: string, wlId: string, query: RequestQuery = {}, params: RequestParams) =>
		await transactionsWishlist(pub).wishlistDeleteWishlist(storeId, wlId, query, params);

const wishListCreator =
	(pub: boolean) =>
	async (storeId: string, wlName: string, query: RequestQuery = {}, params: RequestParams) =>
		await transactionsWishlist(pub).wishlistCreateWishlist(
			storeId,
			query,
			{ description: wlName, registry: false } as any,
			params
		);

export const wishListsMapper = (wishListResponse: WishlistWishlist, pagination?: PageData) => {
	const wishLists: WishlistWishlistItem[] = wishListResponse?.GiftList ?? [];
	const totalLists: number = dFix(`${wishListResponse?.recordSetTotal ?? 0}`, 0);
	const totalPages = pagination ? dFix(Math.ceil(totalLists / pagination.pageSize), 0) : 1;
	return { wishLists, totalPages };
};

const mapProductsByPN = (response?: ProductQueryResponse) => {
	const contents = extractContentsArray(response) as ResponseProductType[];
	return keyBy(contents.map(mapProductData), 'partNumber');
};

export const useWishLists = () => {
	const routes = useLocalization('Routes');
	const router = useNextRouter();
	const { user } = useUser();
	const { query } = useNextRouter();
	const params = useExtraRequestParameters();
	const { id } = query;
	const [pagination, setPagination] = useState<PageData>({
		pageNumber: 1,
		pageSize: 4,
	});
	const [creationData, setCreationData] = useState<CreateEditData>({ name: '' } as CreateEditData);
	const { settings } = useSettings();

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
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	// tidy
	const { wishLists, totalPages } = wishListsMapper(data as WishlistWishlist, pagination);

	// index wishLists by their ids
	const wishListMap = keyBy(wishLists, 'uniqueID');

	// get products inside each wishlist
	const partNumber = wishLists.flatMap(
		(wishList) => wishList?.item?.map(({ partNumber }) => partNumber) ?? []
	);
	const { data: products } = useSWR(
		settings?.storeId && partNumber.length
			? [
					{ storeId: settings.storeId, partNumber, currency: settings.defaultCurrency },
					DATA_KEY_WISH_LIST,
			  ]
			: null,
		async ([{ storeId, partNumber, currency }]) =>
			productFetcher(true)({ storeId, partNumber, currency }, params)
	);
	// index those products by their partNumbers
	const productMap = mapProductsByPN(products);

	const localization = useLocalization('WishList');
	const success = useLocalization('success-message');

	const invalidName = useCallback(
		(name: string) => !name?.trim().length || !WL_NAME_REGEX.test(name),
		[]
	);

	const onCreate = async (_event: MouseEvent<HTMLButtonElement>) => {
		if (creationData.name.trim().length === 0) {
			setCreationData({ name: '', error: true });
		} else {
			try {
				await wishListCreator(true)(
					settings?.storeId as string,
					creationData.name.trim(),
					undefined,
					params
				);
				// scroll to last page (if new wishlist will be on that page)
				if (pagination.pageNumber < totalPages || wishLists.length === pagination.pageSize) {
					setPagination((prev) => ({ ...prev, pageNumber: pagination.pageNumber + 1 }));
				} else {
					mutateWishLists();
				}
				setCreationData({ name: '', error: false });
				showSuccessMessage(success.CREATE_WISHLIST_SUCCESS.t([creationData.name.trim()]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		}
	};

	const onName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newName = event.target.value;
		setCreationData((prev) => ({ ...prev, name: newName, error: invalidName(newName) }));
	};

	const onPage = (event: ChangeEvent<unknown>, page: number) => {
		setPagination((prev) => ({ ...prev, pageNumber: page }));
	};

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
			pagination.pageNumber,
			settings?.storeId,
			showSuccessMessage,
			success.DELETE_WISHLIST_SUCCESS,
			totalPages,
			wishLists.length,
			params,
		]
	);

	const onView = useCallback(
		(wishList: WishlistWishlistItem) => () =>
			router.push({
				pathname: routes.WishLists.route.t(),
				query: { id: wishList.uniqueID },
			}),
		[router, routes.WishLists.route]
	);

	const getCardActions = useCallback(
		(wishList: WishlistWishlistItem) => [
			{
				text: localization.ViewList.t(),
				handleClick: onView(wishList),
			},
			{
				text: localization.Actions.DeleteList.t(),
				enableConfirmation: true,
				handleClick: onDelete(wishList),
			},
		],
		[localization, onDelete, onView]
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
		creationData,
		onCreate,
		id,
		wishListMap,
		onDelete,
		mutateWishLists,
	};
};
