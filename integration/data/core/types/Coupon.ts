/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import type { useCoupons } from '@/data/Content/Coupons';
import { RequestQuery } from '@/data/types/RequestQuery';
import type { CouponCouponItem } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';

export type CouponItem = CouponCouponItem & {
	description: string;
};

export type CouponContextValues = ReturnType<typeof useCoupons> & {
	view: string;
	onToggle: (callback?: () => Promise<unknown>) => () => void;
};

export type CouponsConfirmationDialogProps = {
	onConfirm: () => Promise<unknown>;
	onToggle: CouponContextValues['onToggle'];
	open: boolean;
};

export type CouponIssuerProps = {
	storeId: string;
	query: { responseFormat?: 'xml' | 'json' } | undefined;
	promotionName: string;
	params?: RequestParams;
};

export type CouponsFetcherProps = {
	storeId: string;
	query?: RequestQuery;
	params: RequestParams;
};

export type CouponAppliedProps = {
	storeId: string;
	couponId: string;
	query?: RequestQuery;
	params: RequestParams;
};

export type CouponRemoverProps = {
	storeId: string;
	couponId: string;
	query?: RequestQuery;
	params: RequestParams;
};
