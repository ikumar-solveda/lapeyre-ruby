/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useOrderReOrder } from '@/data/Content/OrderReOrder';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	STATUSES,
	orderByIdFetcher,
	ordersByStatus as ordersByStatusFetcher,
} from '@/data/Content/_Order';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ORDERS_BY_STATUS, DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';
import { ORDER_HISTORY_REVALIDATION_INTERVAL } from '@/data/constants/order';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { SelectChangeEvent } from '@mui/material';
import {
	OrderOrderSummary,
	OrderOrderSummaryItem,
} from 'integration/generated/transactions/data-contracts';
import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

export type { OrderOrderSummaryItem };

const dataMap = (orders?: OrderOrderSummary) => orders?.Order ?? [];

type NoArgFn = () => string;
type ApiPayload = {
	orderId?: string;
	statuses?: string;
};
export const useOrderHistory = () => {
	const { onReOrder } = useOrderReOrder();
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const localization = useLocalization('Order');
	const [apiPayload, setApiPayload] = useState<ApiPayload>({} as ApiPayload);
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId && !apiPayload.orderId
			? [{ storeId, statuses: apiPayload.statuses || undefined }, DATA_KEY_ORDERS_BY_STATUS]
			: null,
		async ([{ storeId, statuses }]) =>
			ordersByStatusFetcher(true)(storeId, statuses, undefined, params),
		{ refreshInterval: ORDER_HISTORY_REVALIDATION_INTERVAL }
	);
	const { data: orderIdData, error: errorOrderId } = useSWR(
		storeId && apiPayload.orderId
			? [{ storeId, orderId: apiPayload.orderId || undefined }, DATA_KEY_ORDER_BY_ID]
			: null,
		async ([{ storeId, orderId }]) =>
			orderByIdFetcher(true, false)(storeId, orderId as string, undefined, params),
		{ refreshInterval: ORDER_HISTORY_REVALIDATION_INTERVAL }
	);
	const orders = useMemo(
		() =>
			orderIdData
				? [orderIdData].filter((order) => STATUSES.includes(String(order.orderStatus)))
				: dataMap(data) ?? data,
		[data, orderIdData]
	);
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
	const [orderId, setOrderId] = useState<string>('');

	const statuses = useMemo(
		() =>
			STATUSES.split(',').reduce(
				(allByStatus, status) =>
					Object.assign(allByStatus, {
						[status]: (
							localization[`Status_${status}` as keyof typeof localization].t as NoArgFn
						)(),
					}),

				{} as Record<string, string>
			),
		[localization]
	);

	const onSetApi = useMemo(
		() =>
			debounce((value: ApiPayload) => {
				setApiPayload((previous) => {
					const orderId = value.orderId ?? previous.orderId;
					const statuses = value.statuses ?? previous.statuses;
					return { orderId, statuses };
				});
			}, 300),
		[]
	);

	const onStatus = useCallback(
		(event: SelectChangeEvent<string[]>) => {
			const newStatuses =
				typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
			setSelectedStatuses(newStatuses);
			onSetApi({ statuses: newStatuses.join(',') });
		},
		[onSetApi]
	);

	const onOrderId = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setOrderId(event.target.value);
			onSetApi({ orderId: event.target.value });
		},
		[onSetApi]
	);

	return {
		orders,
		error: error ?? errorOrderId,
		statuses,
		orderId,
		selectedStatuses,
		onStatus,
		onOrderId,
		apiPayload,
		onReOrder,
	};
};
