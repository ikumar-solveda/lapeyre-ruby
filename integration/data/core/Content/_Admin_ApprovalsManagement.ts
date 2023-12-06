/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	AdminApprovalsManagementQueryParam,
	AdminApprovalsStatusResponse,
} from '@/data/types/Admin_ApprovalsManagement';
import { transactionsApprovalStatus } from 'integration/generated/transactions';
import { ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusParameterDescription } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';

/**
 * fetch the result of order or user approvals
 * @param pub
 * @returns
 */
export const approvalsManagementFetch =
	(pub: boolean) =>
	async (
		{ storeId, q = 'buyerApprovals', ...query }: AdminApprovalsManagementQueryParam,
		params: RequestParams
	): Promise<AdminApprovalsStatusResponse> =>
		await transactionsApprovalStatus(pub).approvalStatusFindByQuery(
			storeId,
			{ q, ...query },
			params
		);

/**
 * Update buyer or order approval status.
 */
export const approvalStatusUpdater =
	(pub: boolean) =>
	async (
		{
			storeId,
			approvalStatusId,
			comments,
			aprv_act,
			...query
		}: {
			storeId: string;
			approvalStatusId: string;
			comments?: string;
			aprv_act: '1' | '2';
			action?: 'updateApprovalStatus';
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) =>
		await transactionsApprovalStatus(pub).approvalStatusUpdateApprovalStatus(
			storeId,
			approvalStatusId,
			{
				comments,
				aprv_act,
			} as ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusParameterDescription,
			{
				action: 'updateApprovalStatus',
				...query,
			},
			params
		);
