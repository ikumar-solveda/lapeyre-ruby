/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListsFetcher } from '@/data/Content/_RequisitionList';
import { PageData, wishListsFetcher, wishListsMapper } from '@/data/Content/_Wishlists';
import { isB2BStore, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_REQUISITION_LIST, DATA_KEY_WISH_LIST } from '@/data/constants/dataKey';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { WishlistWishlist } from 'integration/generated/transactions/data-contracts';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useWishRequisitionList = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const router = useNextRouter();
	const isB2B = isB2BStore(settings);
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const loginStatus = user?.isLoggedIn;
	const shouldFetchRequisitionList = useMemo(() => isB2B && loginStatus, [isB2B, loginStatus]);
	const { data: requisitionListData } = useSWR(
		shouldFetchRequisitionList
			? [
					{
						langId,
						storeId: settings.storeId,
						orderBy: 'D-lastUpdate',
						pageNumber: 1,
						pageSize: -1,
					},
					params,
					DATA_KEY_REQUISITION_LIST,
			  ]
			: null,
		async ([props, params]) => requisitionListsFetcher(true)(props, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const requisitionLists = useMemo(
		() => requisitionListData?.resultList?.filter((r) => r.memberId === user?.userId) ?? [],
		[requisitionListData, user]
	);

	const shouldFetchWishList = useMemo(() => !isB2B && loginStatus, [isB2B, loginStatus]);

	const { data: wishListData } = useSWR(
		shouldFetchWishList
			? [{ storeId: settings.storeId, pagination: {} as PageData }, DATA_KEY_WISH_LIST]
			: null,
		async ([{ storeId, pagination }]) =>
			wishListsFetcher(true)(storeId, pagination, undefined, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const wishLists = useMemo(
		() => wishListsMapper(wishListData as WishlistWishlist).wishLists ?? [],
		[wishListData]
	);

	return { requisitionLists, wishLists };
};
