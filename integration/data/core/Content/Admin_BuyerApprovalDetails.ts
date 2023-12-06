/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useAdmin_BuyerApprovalsManagementTableAction } from '@/data/Content/Admin_BuyerApprovalsManagementTableAction';
import { approvalsManagementFetch } from '@/data/Content/_Admin_ApprovalsManagement';
import { userRegistrationDetailsFetcher } from '@/data/Content/_Admin_UserRegistrationDetailsFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orgFetcher } from '@/data/Content/_Organization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_BUYER_APPROVAL_DETAILS } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { AdminBuyerApprovalDetailsResponse } from '@/data/types/Admin_ApprovalsManagement';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { ChangeEvent, useCallback, useState } from 'react';
import useSWR from 'swr';

const fetcher =
	(pub: boolean) =>
	async (
		props: {
			storeId: string;
			langId: string;
			approvalStatusId: number;
		},
		params: RequestParams
	): Promise<AdminBuyerApprovalDetailsResponse | undefined> => {
		const { storeId } = props;
		try {
			const res = await approvalsManagementFetch(pub)(props, params);
			const approvalDetails = res.resultList?.at(0);
			const userId = approvalDetails?.submitterId ?? EMPTY_STRING;
			const buyerDetails = await userRegistrationDetailsFetcher(pub)(storeId, userId, params);
			const organizationId = buyerDetails?.organizationId ?? EMPTY_STRING;
			const orgParams = {
				storeId,
				organizationId,
			};
			const orgDetails = await orgFetcher(pub)({ ...orgParams, params });
			return {
				orgDetails,
				approvalDetails,
				buyerDetails,
			} as AdminBuyerApprovalDetailsResponse;
		} catch (error) {
			if (pub) {
				throw error;
			} else {
				return undefined;
			}
		}
	};

export const useAdmin_BuyerApprovalsDetails = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { approvalStatusId } = router.query;
	const { onApproval, onReject } = useAdmin_BuyerApprovalsManagementTableAction();
	const [comments, setComments] = useState<string>(EMPTY_STRING);

	const {
		data,
		error,
		isLoading,
		mutate: muteBuyerApprovalDetails,
	} = useSWR(
		[
			{
				storeId,
				langId,
				approvalStatusId: Number(approvalStatusId),
				params,
			},
			DATA_KEY_BUYER_APPROVAL_DETAILS,
		],
		async ([{ params, ...props }]) => fetcher(true)(props, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setComments(event.target.value);
	}, []);

	const onApprovalAction = useCallback(async () => {
		await onApproval(comments);
		await muteBuyerApprovalDetails();
	}, [comments, muteBuyerApprovalDetails, onApproval]);

	const onRejectAction = useCallback(async () => {
		await onReject(comments);
		await muteBuyerApprovalDetails();
	}, [comments, muteBuyerApprovalDetails, onReject]);

	return {
		data,
		isLoading,
		error,
		comments,
		onChange,
		onApprovalAction,
		onRejectAction,
	};
};
