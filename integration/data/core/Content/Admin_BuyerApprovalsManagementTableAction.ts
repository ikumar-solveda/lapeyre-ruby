/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { approvalStatusUpdater } from '@/data/Content/_Admin_ApprovalsManagement';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import {
	APPROVALS_MANAGEMENT_APPROVE_ACTION,
	APPROVALS_MANAGEMENT_REJECT_ACTION,
} from '@/data/constants/admin_approvalsManagement';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { buyerApprovalsManagementMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/buyerApprovalsManagementMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { Row } from '@tanstack/react-table';
import { useCallback } from 'react';
import { mutate } from 'swr';

const EMPTY_PROPS = {};
export const useAdmin_BuyerApprovalsManagementTableAction = ({
	row,
}: {
	row?: Row<AdminApprovalsManagementTableData>;
} = EMPTY_PROPS) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId } = getClientSideCommon(settings, router);
	const approvalStatusId = row?.original?.approvalStatusId
		? row?.original?.approvalStatusId
		: router?.query?.approvalStatusId
		? (router?.query?.approvalStatusId as unknown as string)
		: EMPTY_STRING;

	const extraParams = useExtraRequestParameters();
	const successMessageNLS = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();

	const onApproval = useCallback(
		async (comments?: string | undefined) => {
			try {
				await approvalStatusUpdater(true)(
					{
						storeId,
						approvalStatusId,
						aprv_act: APPROVALS_MANAGEMENT_APPROVE_ACTION,
						comments,
					},
					extraParams
				);
				await mutate(buyerApprovalsManagementMutatorKeyMatcher(EMPTY_STRING), undefined);
				showSuccessMessage(successMessageNLS.BUYER_APPROVAL_APPROVE_SUCCESS.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			approvalStatusId,
			extraParams,
			notifyError,
			showSuccessMessage,
			storeId,
			successMessageNLS.BUYER_APPROVAL_APPROVE_SUCCESS,
		]
	);

	const onReject = useCallback(
		async (comments?: string | undefined) => {
			try {
				await approvalStatusUpdater(true)(
					{
						storeId,
						approvalStatusId,
						aprv_act: APPROVALS_MANAGEMENT_REJECT_ACTION,
						comments,
					},
					extraParams
				);
				await mutate(buyerApprovalsManagementMutatorKeyMatcher(EMPTY_STRING), undefined);
				showSuccessMessage(successMessageNLS.BUYER_APPROVAL_REJECT_SUCCESS.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			approvalStatusId,
			extraParams,
			notifyError,
			showSuccessMessage,
			storeId,
			successMessageNLS.BUYER_APPROVAL_REJECT_SUCCESS,
		]
	);

	return {
		onApproval,
		onReject,
	};
};
