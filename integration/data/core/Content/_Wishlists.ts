/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SKIP_ERROR_LOGGING } from '@/data/constants/common';
import { WISHLIST_STATE } from '@/data/constants/wishlist';
import { RequestQuery } from '@/data/types/RequestQuery';
import { dFix } from '@/data/utils/floatingPoint';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsWishlist } from 'integration/generated/transactions';
import {
	ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescription,
	WishlistWishlist,
	WishlistWishlistItem,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export type PageData = {
	pageNumber: number; // ordinal
	pageSize: number;
};

export type CreateEditData = {
	name: string;
	error: boolean;
};

export const WL_NAME_REGEX = /^[a-zA-Z0-9 ]*$/;

export const wishListsMapper = (wishListResponse: WishlistWishlist, pagination?: PageData) => {
	const wishLists: WishlistWishlistItem[] = wishListResponse?.GiftList ?? [];
	const totalLists: number = dFix(`${wishListResponse?.recordSetTotal ?? 0}`, 0);
	const totalPages = pagination ? dFix(Math.ceil(totalLists / pagination.pageSize), 0) : 1;
	return { wishLists, totalPages, totalLists };
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
				{ skipErrorLogging: SKIP_ERROR_LOGGING, ...params }
			);
		} catch (e: any) {
			if (pub) {
				if (e?.status === 404) {
					return {};
				} else {
					errorWithId(getRequestId(context), '_Wishlists: wishListsFetcher', { error: e });
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

export const wishListCreator =
	(pub: boolean) =>
	async (
		storeId: string,
		data: Record<string, string | boolean | number | string[] | Record<string, string>[]>,
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsWishlist(pub).wishlistCreateWishlist(storeId, query, data, params);

export const wishListUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		wlId: string,
		data: ComIbmCommerceRestWishlistHandlerWishlistHandlerUpdateBodyParameterDescription,
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsWishlist(pub).wishlistUpdateWishlist(storeId, wlId, query, data, params);

export const defaultWishlistFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (storeId: string, query: RequestQuery | undefined, params?: RequestParams) => {
		let rc;
		try {
			rc = await transactionsWishlist(pub).wishlistFindWishlistByUserIdDefault(
				storeId,
				query ?? {},
				{ skipErrorLogging: SKIP_ERROR_LOGGING, ...params }
			);
		} catch (e: any) {
			// 404 error is received in response if no wish list is present for the current user.
			if (e.status !== 404) {
				errorWithId(getRequestId(context), '_Wishlists: defaultWishlistCreator', { error: e });
				throw e;
			}
			rc = {} as WishlistWishlist;
		}
		return rc;
	};

export const fetchDefaultWishlistOrCreateNew =
	(pub: boolean) =>
	async (
		storeId: string,
		query: RequestQuery | undefined,
		defaultWishlistName: string,
		params?: RequestParams
	) => {
		const { GiftList = [] } = await defaultWishlistFetcher(pub)(storeId, undefined, params);
		let wishlistName = defaultWishlistName;
		let wishlistId = '';
		if (GiftList.length) {
			wishlistId = GiftList[0].uniqueID as string;
			wishlistName = GiftList[0].description as string;
		} else {
			const list = await wishListCreator(true)(
				storeId,
				{ description: wishlistName, registry: false, state: WISHLIST_STATE.DEFAULT },
				undefined,
				params ?? {}
			);
			wishlistId = list.uniqueID;
		}
		return { wishlistId, wishlistName };
	};
