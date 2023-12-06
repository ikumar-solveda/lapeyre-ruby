/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useAdmin_OrderApprovalsManagementTableAction } from '@/data/Content/Admin_OrderApprovalsManagementTableAction';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orderByIdFetcherFull } from '@/data/Content/_Order';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ORDER_APPROVAL_BY_ID } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { Order, OrderItem } from '@/data/types/Order';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

export const useAdmin_OrderApprovalDetails = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const { entityId: orderId } = router.query;
	const { onApproval, onReject } = useAdmin_OrderApprovalsManagementTableAction();
	const [comments, setComments] = useState<string>(EMPTY_STRING);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setComments(event.target.value);
	}, []);

	const {
		data: orderData,
		error,
		mutate: mutateOrderApprovalDetails,
		isLoading,
	} = useSWR(
		settings?.storeId
			? [{ storeId: settings.storeId, orderId, params }, DATA_KEY_ORDER_APPROVAL_BY_ID]
			: null,
		async ([{ storeId, orderId, params }]) =>
			orderByIdFetcherFull(true)({ storeId, orderId: orderId as string, params }),
		{ revalidateIfStale: true }
	);

	const onApprovalAction = useCallback(async () => {
		await onApproval(comments);
		await mutateOrderApprovalDetails();
	}, [comments, mutateOrderApprovalDetails, onApproval]);

	const onRejectAction = useCallback(async () => {
		await onReject(comments);
		await mutateOrderApprovalDetails();
	}, [comments, mutateOrderApprovalDetails, onReject]);

	return {
		orderId,
		order: orderData as any as Order,
		orderItems: orderData?.orderItem as any as OrderItem[],
		mutateOrderApprovalDetails,
		error,
		locale,
		comments,
		onChange,
		onApprovalAction,
		onRejectAction,
		isLoading,
	};
};
