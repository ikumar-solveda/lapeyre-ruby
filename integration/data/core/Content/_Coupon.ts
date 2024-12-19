/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { PROMOTION_STATUS_ACTIVE } from '@/data/constants/order';
import {
	CouponAppliedProps,
	CouponIssuerProps,
	CouponItem,
	CouponRemoverProps,
	CouponsFetcherProps,
} from '@/data/types/Coupon';
import { CartAppliedCoupon } from '@/data/types/Order';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import type {
	CouponCoupon,
	CouponCouponItem,
} from 'integration/generated/transactions/data-contracts';
import transactionsAssignedCoupon from 'integration/generated/transactions/transactionsAssignedCoupon';
import transactionsCoupon from 'integration/generated/transactions/transactionsCoupon';
import { GetServerSidePropsContext } from 'next';

export const issuedCouponsDataMap = (couponListResponse: CouponCoupon) => {
	const coupons: CouponCouponItem[] = couponListResponse?.Coupon ?? [];
	const couponList: CouponItem[] = coupons.map((coupon: CouponCouponItem) => {
		const description = coupon.couponDescription?.at(0)
			? coupon.couponDescription[0].shortDescription ?? coupon.couponDescription[0].longDescription
			: undefined;
		const adminName = coupon.userData?.userDataField?.find(
			({ key }) => key === 'promotionAdministrativeDescription'
		)?.value;
		return { ...coupon, description: description || adminName || EMPTY_STRING };
	});
	return couponList;
};

export const appliedCouponsDataMap = (couponListResponse: CartAppliedCoupon) => {
	const coupons: CartAppliedCoupon[] =
		(couponListResponse?.couponCode as CartAppliedCoupon[]) ?? [];
	const couponList: CartAppliedCoupon[] = coupons
		.filter((coupon) => coupon.xcpcd_promotionStatus === PROMOTION_STATUS_ACTIVE)
		.map((coupon: CartAppliedCoupon) => {
			const description = coupon.description?.at(0)
				? coupon.description[0].shortDescription ?? coupon.description[0].longDescription
				: undefined;
			const adminName = coupon.xcpcd_promotionAdministrativeDescription ?? EMPTY_STRING;
			return { ...coupon, couponDescription: description || adminName };
		});
	return couponList;
};

export const couponIssuer =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, query = {}, promotionName, params }: CouponIssuerProps) => {
		try {
			const data = { promotionName };
			await transactionsCoupon(pub).couponIssueCoupon(storeId, query, data, params);
		} catch (error) {
			errorWithId(getRequestId(context), 'Error in issue coupon %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const issuedCouponsFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, query = {}, params }: CouponsFetcherProps) => {
		try {
			return await transactionsCoupon(pub).couponGetCoupon(storeId, query, params);
		} catch (error) {
			errorWithId(getRequestId(context), '_Coupon: issuedCouponsFetcher: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const appliedCouponsFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, query = {}, params }: CouponsFetcherProps) => {
		try {
			return await transactionsAssignedCoupon(pub).cartSelfAssignedCouponDetail(
				storeId,
				query,
				params
			);
		} catch (error) {
			errorWithId(getRequestId(context), '_Coupon: appliedCouponsFetcher: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const couponApplier =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, couponId, query = {}, params }: CouponAppliedProps) => {
		try {
			const data = { couponId };
			await transactionsAssignedCoupon(pub).applyCoupon(storeId, data, query, params);
		} catch (error) {
			errorWithId(getRequestId(context), '_Coupon: couponApplied: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const assignedCouponRemover =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, couponId, query = {}, params }: CouponAppliedProps) => {
		try {
			await transactionsAssignedCoupon(pub).cartSelfAssignedCouponDelete(
				storeId,
				couponId,
				query,
				params
			);
		} catch (error) {
			errorWithId(getRequestId(context), '_Coupon: assignedCouponRemover: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const couponRemover =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, couponId, query = {}, params }: CouponRemoverProps) => {
		try {
			await transactionsCoupon(pub).couponDeleteCouponById(storeId, couponId, query, params);
		} catch (error) {
			errorWithId(getRequestId(context), '_Coupon: couponRemover: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
