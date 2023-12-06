/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { subscriptionHistoryFetcherById } from '@/data/Content/_Subscription';
import { useSettings } from '@/data/Settings';
import { ORDER_HISTORY_REVALIDATION_INTERVAL } from '@/data/constants/order';
import { PAGINATION } from '@/data/constants/tablePagination';
import { Order } from '@/data/types/Order';
import { SubscriptionResponse } from '@/data/types/RecurringOrder';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { PaginationState } from '@tanstack/react-table';

import { useMemo, useState } from 'react';
import useSWR from 'swr';

const dataMap = (data?: SubscriptionResponse) => (data?.Order ?? []) as Order[];

export const useRecurringOrderHistory = (parentOrderId: string) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);

	const params = useExtraRequestParameters();

	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

	const { data, error } = useSWR(
		storeId
			? [
					{
						storeId,
						query: {
							q: 'findByParentOrderId',
							orderId: parentOrderId,
							pageNumber: pageIndex + 1,
							pageSize,
						},
					},
			  ]
			: null,
		async ([{ storeId, query }]) =>
			subscriptionHistoryFetcherById(true)(storeId, query as any, params),
		{ refreshInterval: ORDER_HISTORY_REVALIDATION_INTERVAL }
	);
	const orders = useMemo(() => dataMap(data as SubscriptionResponse), [data]);
	const pageCount = Math.ceil((data?.recordSetTotal ?? 0) / pageSize);

	return {
		orders,
		error,
		pagination,
		setPagination,
		pageCount,
	};
};
