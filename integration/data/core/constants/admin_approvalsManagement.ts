/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { AdminBuyerOrderSearchData } from '@/data/types/Admin_ApprovalsManagement';

export const BUYER_APPROVALS_MANAGEMENT_TABLE = 'buyer-approvals-management-table';
export const ORDER_APPROVALS_MANAGEMENT_TABLE = 'order-approvals-management-table';

export const APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS = {
	approvalId: 'approvalId',
	buyer: 'buyer',
	status: 'status',
	submitted: 'submitted',
	approvedOrRejected: 'approvedOrRejected',
	actions: 'actions',
	orderId: 'orderId',
	totalPrice: 'totalPrice',
	orderName: 'orderName',
};

export const APPROVALS_STATUS_MAP = {
	'0': 'Pending',
	'1': 'Approved',
	'2': 'Rejected',
};

export const APPROVALS_STATUS_COLOR_MAP = {
	'0': 'orange',
	'1': 'green',
	'2': 'crimson',
};

export const DEFAULT_APPROVALS_STATUS = '0';

export const BUYER_APPROVALS = 'buyer';
export const ORDER_APPROVALS = 'order';
export const BUYER_APPROVALS_ID = '1';
export const ORDER_APPROVALS_ID = '2';

export const APPROVALS_STATUS = {
	all: 'all',
	pending: '0',
	approved: '1',
	rejected: '2',
};

type ApprovalStatusPayload = {
	value: (typeof APPROVALS_STATUS)[keyof typeof APPROVALS_STATUS];
	key: keyof ReturnType<typeof useLocalization<'ApprovalsManagement'>>;
};
export const APPROVALS_LIST: ApprovalStatusPayload[] = [
	{ value: APPROVALS_STATUS.all, key: 'ViewAll' },
	{ value: APPROVALS_STATUS.pending, key: 'ViewPending' },
	{ value: APPROVALS_STATUS.approved, key: 'ViewApproved' },
	{ value: APPROVALS_STATUS.rejected, key: 'ViewRejected' },
];

export const APPROVALS_TYPES = {
	'1': 'buyer',
	'2': 'order',
};

export const initialValues: AdminBuyerOrderSearchData = {
	submitterFirstName: EMPTY_STRING,
	submitterLastName: EMPTY_STRING,
	startSubmitTime: undefined,
	endSubmitTime: undefined,
	status: 'all',
	entityId: EMPTY_STRING,
	approvalStatusId: EMPTY_STRING,
};

export const APPROVALS_MANAGEMENT_APPROVE_ACTION = '1';
export const APPROVALS_MANAGEMENT_REJECT_ACTION = '2';

export const USER_REGISTRATION_DETAILS_PROFILE_NAME = 'IBM_User_Registration_Details';

export const END_TIME_HOURS = 23;
export const END_TIME_MINUTES = 59;
export const END_TIME_SECONDS = 59;
