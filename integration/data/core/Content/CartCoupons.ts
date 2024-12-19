/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import {
	appliedCouponsDataMap,
	appliedCouponsFetcher,
	assignedCouponRemover,
	couponApplier,
	issuedCouponsDataMap,
	issuedCouponsFetcher,
} from '@/data/Content/_Coupon';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_APPLIED_COUPON, DATA_KEY_ISSUED_COUPON } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { COUPON_STATUS_ACTIVE, PROMOTION_STATUS_ACTIVE } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CartAppliedCoupon } from '@/data/types/Order';
import { generateHTMLMessage } from '@/data/utils/generateHTMLMessage';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { CouponCoupon } from 'integration/generated/transactions/data-contracts';
import { useCallback, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

export const useCartCoupons = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { showSuccessMessage, notifyError } = useNotifications();
	const success = useLocalization('success-message');
	const { data, mutate: mutateIssuedCouponList } = useSWR(
		user?.isLoggedIn && storeId ? [{ storeId, query: { langId } }, DATA_KEY_ISSUED_COUPON] : null,
		async ([{ storeId, query = { langId } }]) =>
			issuedCouponsFetcher(true)({ storeId, query, params }),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const { data: appliedData, mutate: mutateAppliedCouponList } = useSWR(
		user?.isLoggedIn && storeId ? [{ storeId, query: { langId } }, DATA_KEY_APPLIED_COUPON] : null,
		async ([{ storeId, query = { langId } }]) =>
			appliedCouponsFetcher(true)({ storeId, query, params }),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const activeIssuedCoupons = useMemo(
		() =>
			issuedCouponsDataMap(data as CouponCoupon)?.filter(
				(coupon) =>
					coupon.userData?.userDataField?.find((o) => o.key === 'promotionStatus')?.value ===
						PROMOTION_STATUS_ACTIVE && coupon.status === COUPON_STATUS_ACTIVE
			),
		[data]
	);

	const activeAppliedCoupons = useMemo(
		() => appliedCouponsDataMap(appliedData as CartAppliedCoupon),
		[appliedData]
	);

	const couponAppliedAction = useCallback(
		(couponId: string) => async () => {
			try {
				await couponApplier(true)({
					storeId,
					couponId,
					params,
				});
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutateIssuedCouponList();
				await mutateAppliedCouponList();
				const html = [
					activeIssuedCoupons.find((coupon) => coupon?.couponId === couponId)?.description,
				];
				const { text } = generateHTMLMessage({
					translated: success.COUPON_APPLIED_SUCCESS as any,
					html,
				});
				showSuccessMessage(text);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			activeIssuedCoupons,
			mutateAppliedCouponList,
			mutateIssuedCouponList,
			notifyError,
			params,
			showSuccessMessage,
			storeId,
			success,
		]
	);

	const assignedCouponRemoverAction = useCallback(
		(couponId: string) => async () => {
			try {
				await assignedCouponRemover(true)({
					storeId,
					couponId,
					params,
				});
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutateIssuedCouponList();
				await mutateAppliedCouponList();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[mutateAppliedCouponList, mutateIssuedCouponList, notifyError, params, storeId]
	);

	return {
		activeIssuedCoupons,
		mutateIssuedCouponList,
		couponAppliedAction,
		activeAppliedCoupons,
		mutateAppliedCouponList,
		assignedCouponRemoverAction,
	};
};
