/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { couponRemover, issuedCouponsDataMap, issuedCouponsFetcher } from '@/data/Content/_Coupon';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_COUPONS } from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { couponsKeyMatcher } from '@/data/utils/mutatorKeyMatchers/couponsKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState } from '@tanstack/react-table';
import type { CouponCoupon } from 'integration/generated/transactions/data-contracts';
import { useCallback, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export const useCoupons = () => {
	const { mutate } = useSWRConfig();
	const { settings } = useSettings();
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const success = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

	const swrKey = useMemo<[any, string] | null>(
		() =>
			user?.isLoggedIn && storeId
				? [
						{
							storeId,
							query: { pageNumber: pageIndex + 1, pageSize, langId },
						},
						DATA_KEY_COUPONS,
				  ]
				: null,
		[user?.isLoggedIn, storeId, langId, pageIndex, pageSize]
	);

	/** get couponsList */
	const {
		data,
		error,
		isLoading,
		mutate: mutateCouponsList,
	} = useSWR(
		swrKey,
		async ([{ storeId, query }]) => issuedCouponsFetcher(true)({ storeId, query, params }),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const couponsList = useMemo(() => issuedCouponsDataMap(data as CouponCoupon), [data]);
	const pageCount = Math.ceil(dFix(data?.recordSetTotal ?? 0, 0) / pageSize);

	const deleteCoupons = useCallback(
		async (couponIds: string[]) => {
			try {
				await Promise.all(
					couponIds.map((couponId) =>
						couponRemover(true)({
							storeId,
							couponId: couponId as string,
							params,
						})
					)
				);

				// go back a page if this page will no longer exist
				if (
					pageIndex > 0 &&
					pageIndex === pageCount - 1 &&
					data?.Coupon?.length === couponIds.length
				) {
					setPagination((prev: any) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
				}
				await mutateCouponsList();
				await mutate(couponsKeyMatcher(swrKey), undefined);
				showSuccessMessage(success.DELETE_COUPON_SUCCESS.t({ count: couponIds.length }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			mutate,
			notifyError,
			params,
			storeId,
			mutateCouponsList,
			showSuccessMessage,
			success.DELETE_COUPON_SUCCESS,
			pageIndex,
			pageCount,
			swrKey,
			data?.Coupon?.length,
		]
	);

	return {
		data: data as CouponCoupon | undefined,
		couponsList,
		deleteCoupons,
		pageCount,
		pagination,
		setPagination,
		error,
		isLoading,
	};
};
