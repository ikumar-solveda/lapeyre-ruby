/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CREATE_QUOTE_STEP, DISCOUNT_TYPE } from '@/data/types/Quote';

export const AVAILABLE_QUOTES_LIST_TABLE = 'available-quotes-list-table';

export const PRODUCTS_TABLE = 'products-table';
export const ATTACHMENTS_TABLE = 'attachments-table';

export const MAX_LENGTH_COMMENTS_REQUESTS = 250;

export const STEPS: Record<CREATE_QUOTE_STEP, CREATE_QUOTE_STEP> = {
	details: 'details',
	products: 'products',
	attachments: 'attachments',
	requests: 'requests',
	comments: 'comments',
};

export const STEP_LABELS: Record<CREATE_QUOTE_STEP, string> = {
	details: 'Details',
	products: 'Products',
	attachments: 'Attachments',
	requests: 'Requests',
	comments: 'Comments',
};

export const STEP_OPTIONAL: Record<CREATE_QUOTE_STEP, boolean> = {
	details: false,
	products: true,
	attachments: true,
	requests: true,
	comments: true,
};

export const CREATE_QUOTE_STEPS: CREATE_QUOTE_STEP[] = [
	STEPS.details,
	STEPS.products,
	STEPS.attachments,
	STEPS.requests,
	STEPS.comments,
];

export const State = {
	DRAFT: 0,
	PENDING: 1,
	READY: 2,
	ACCEPTED: 3,
	DECLINED: 4,
	CANCELED: 5,
	EXPIRED: 6,
};

export const StateLabels: Record<string, string> = {
	'0': 'Draft',
	'1': 'Pending',
	'2': 'Ready',
	'3': 'Accepted',
	'4': 'Declined',
	'5': 'Canceled',
	'6': 'Expired',
};

export const DiscountType: Record<DISCOUNT_TYPE, DISCOUNT_TYPE> = {
	UNIT: 'UNIT',
	PERCENTAGE: 'PERCENTAGE',
	AMOUNT: 'AMOUNT',
};

export const DISCOUNT_LABELS: Record<DISCOUNT_TYPE, string> = {
	UNIT: 'Unit',
	PERCENTAGE: 'Percentage',
	AMOUNT: 'Amount',
};

export const QUOTEITEMS = 'QUOTEITEMS';
export const ATTACHMENTS = 'ATTACHMENTS';

export const DIALOG_STATES = {
	CANCEL: 0,
	DELETE: 1,
	SUBMIT: 2,
	ACCEPT: 3,
	DECLINE: 4,
};

export const FIELD_LENGTHS = {
	title: 255,
	description: 6000,
};

export const DEFAULT_SORT = '-createdAt';

export const ORDER_BY = {
	quoteID: (desc: boolean) => (desc ? '-id' : '+id'),
	quoteTitle: (desc: boolean) => (desc ? '-name' : '+name'),
	quoteDate: (desc: boolean) => (desc ? '-createdAt' : '+createdAt'),
	quoteContract: (desc: boolean) => (desc ? '-contractId' : '+contractId'),
	quoteStatus: (desc: boolean) => (desc ? '-status' : '+status'),
};

export const FILE_UPLOAD_STATUS_REFRESH_INTERVAL = 2000;
