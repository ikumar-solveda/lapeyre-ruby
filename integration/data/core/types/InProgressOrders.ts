/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import type { useCart } from '@/data/Content/Cart';
import type { useInProgressOrders } from '@/data/Content/InProgressOrders';
import type { RequestQuery } from '@/data/types/RequestQuery';
import type {
	ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest,
	OrderOrderSummaryItem,
} from 'integration/generated/transactions/data-contracts';
import type { RequestParams } from 'integration/generated/transactions/http-client';

export type InProgressOrderSummaryItem = OrderOrderSummaryItem;

export type InProgressOrdersContextValues = ReturnType<typeof useInProgressOrders> & {
	view: string;
	cartData: ReturnType<typeof useCart>;
};

export type CreateNewOrderProps = {
	name: string;
	status: string;
};

export type CreateNewOrderDialogProps = {
	open: boolean;
	onClose: () => void;
};

type RequestQueryForInProgressOrders = RequestQuery & {
	description: string;
	isSharedOrder?: boolean;
};

export type InProgressOrdersDialogStateType = (typeof DIALOG_STATES)[keyof typeof DIALOG_STATES];

export type InProgressOrdersCreatorProps = {
	storeId: string;
	query: RequestQueryForInProgressOrders;
	params: RequestParams;
};

export type CopyOrderProps = {
	name: string;
	orderId: string;
};

export type InProgressOrdersCopyCreatorProps = {
	storeId: string;
	data: ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest;
	params: RequestParams;
};

export type InProgressOrdersRemoverProps = {
	storeId: string;
	orderId: string;
	params: RequestParams;
};

export type InProgressOrderNameForm = {
	name: string;
};
