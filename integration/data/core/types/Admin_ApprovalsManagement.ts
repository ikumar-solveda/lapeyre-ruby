/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrganizationResponse } from '@/data/types/Organization';
import { UserRegistrationDetailsResponse } from '@/data/types/Person';
import { ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList } from 'integration/generated/transactions/data-contracts';

export type Submitter = {
	firstName: string;
	lastName: string;
	middleName: string;
};
type Order = {
	orderTime?: string | null;
	description?: string | null;
	currency: string;
	orderTotal: string;
};
export type AdminApprovalsManagementTableData = {
	submitter?: Submitter;
	approvalStatusId?: string;
	approverGroupId?: string;
	submitTime?: string;
	flowTypeId?: string;
	stateId?: string;
	comment?: string | null;
	submitterId?: string;
	flowId?: string;
	approveTime?: string;
	status?: string;
	approverId?: string;
	entityId?: string;
	order?: Order;
};

export type AdminBuyerOrderSearchData = {
	submitterFirstName?: string;
	submitterLastName?: string;
	startSubmitTime?: Date;
	endSubmitTime?: Date;
	status?: string;
	entityId?: string;
	approvalStatusId?: string;
};

export type AdminBuyerOrOrder = {
	id: string;
	name: string;
	label: string;
	value: string | undefined;
	error: boolean | undefined;
};

export type AdminApprovalsStatusResponse = Omit<
	ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList,
	'resultList'
> & {
	resultList?: AdminApprovalsManagementTableData[];
};

export type AdminApprovalsManagementQueryParam = {
	storeId: string;
	q?: 'all' | 'buyerApprovals' | 'orderApprovals';
	submitterFirstName?: string;
	submitterLastName?: string;
	startSubmitTime?: string;
	endSubmitTime?: string;
	status?: 0 | 1 | 2;
	approvalStatusId?: number;
	entityId?: number;
	approverId?: number;
	orderBy?:
		| 'A-approvalStatusId'
		| 'A-entityId'
		| 'A-submitTime'
		| 'A-approveTime'
		| 'A-status'
		| 'A-flowTypeId'
		| 'A-stateId'
		| 'D-approvalStatusId'
		| 'D-entityId'
		| 'D-submitTime'
		| 'D-approveTime'
		| 'D-status'
		| 'D-flowTypeId'
		| 'D-stateId';
	pageNumber?: number;
	pageSize?: number;
};

export type AdminBuyerApprovalDetailsResponse = {
	orgDetails: OrganizationResponse;
	approvalDetails: AdminApprovalsManagementTableData;
	buyerDetails: UserRegistrationDetailsResponse;
};
