/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SKIP_ERROR_LOGGING } from '@/data/constants/common';
import { WISHLIST_STATE } from '@/data/constants/wishlist';
import { RequestQuery } from '@/data/types/RequestQuery';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import type { WishlistWishlist } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsWishlist from 'integration/generated/transactions/transactionsWishlist';
import { GetServerSidePropsContext } from 'next';

export type PageData = {
	pageNumber: number; // ordinal
	pageSize: number;
};

export const createSaveForLaterList =
	(pub: boolean) =>
	async (
		storeId: string,
		data: Record<string, string | boolean | number | string[] | Record<string, string>[]>,
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsWishlist(pub).wishlistCreateWishlist(storeId, query, data, params);

export const saveForLaterListFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (storeId: string, query: RequestQuery | undefined, params?: RequestParams) => {
		let rc;
		try {
			rc = await transactionsWishlist(pub).findSaveForLaterWishlistForCurrentUser(
				storeId,
				query ?? {},
				{
					skipErrorLogging: SKIP_ERROR_LOGGING,
					...params,
				}
			);
		} catch (e: any) {
			// 404 error is received in response if no wish list is present for the current user.
			if (e.status !== 404) {
				errorWithId(getRequestId(context), '_SaveForLaterList: saveForLaterListFetcher', {
					error: e,
				});
				throw e;
			}
			rc = {} as WishlistWishlist;
		}
		return rc;
	};

export const deleteItemFromSaveForLaterList =
	(pub: boolean) =>
	async (
		storeId: string,
		externalId: string,
		data: Record<string, string | boolean | number | string[] | Record<string, string>[]>,
		query: RequestQuery = {}
	) =>
		await transactionsWishlist(pub).wishlistDeleteWishlist(storeId, externalId, query, data);

export const updateListAddNewItem =
	(pub: boolean) =>
	async (
		storeId: string,
		externalId: string,
		data: Record<string, string | boolean | number | string[] | Record<string, string>[]>,
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsWishlist(pub).wishlistUpdateWishlist(
			storeId,
			externalId,
			query,
			data,
			params
		);

export const fetchSaveForLaterListOrCreateNew =
	(pub: boolean) =>
	async (
		storeId: string,
		data: Record<string, string | boolean | number | string[] | Record<string, string>[]>,
		params?: RequestParams
	) => {
		const { GiftList = [] } = await saveForLaterListFetcher(pub)(storeId, undefined, params);
		let wishlistId = '';
		if (GiftList.length) {
			wishlistId = GiftList[0].uniqueID as string;
			delete data.descriptionName;
			delete data.description;
			delete data.giftCardAccepted;
			delete data.accessSpecifier;
			delete data.state;
			await updateListAddNewItem(true)(storeId, wishlistId, data, { addItem: true }, params ?? {});
		} else {
			const list = await createSaveForLaterList(true)(
				storeId,
				data,
				{ state: WISHLIST_STATE.SAVE_FOR_LATER },
				params ?? {}
			);
			wishlistId = list.uniqueID;
		}
		return { wishlistId };
	};
