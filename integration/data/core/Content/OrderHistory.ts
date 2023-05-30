/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	STATUSES,
	orderByIdFetcher,
	ordersByStatus as ordersByStatusFetcher,
} from '@/data/Content/_Order';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { SelectChangeEvent } from '@mui/material';
import { OrderOrderSummary } from 'integration/generated/transactions/data-contracts';
import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { DATA_KEY_ORDERS_BY_STATUS, DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';

const dataMap = (orders?: OrderOrderSummary) => orders?.Order ?? [];
type NoArgFn = () => string;
type ApiPayload = {
	orderId?: string;
	statuses?: string;
};
export const useOrderHistory = () => {
	const { settings } = useSettings();
	const localization = useLocalization('Order');
	const [apiPayload, setApiPayload] = useState<ApiPayload>({} as ApiPayload);
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		settings?.storeId && !apiPayload.orderId
			? [
					{ storeId: settings.storeId, statuses: apiPayload.statuses || undefined },
					DATA_KEY_ORDERS_BY_STATUS,
			  ]
			: null,
		async ([{ storeId, statuses }]) =>
			ordersByStatusFetcher(true)(storeId, statuses, undefined, params)
	);
	const { data: orderIdData, error: errorOrderId } = useSWR(
		settings?.storeId && apiPayload.orderId
			? [
					{ storeId: settings.storeId, orderId: apiPayload.orderId || undefined },
					DATA_KEY_ORDER_BY_ID,
			  ]
			: null,
		async ([{ storeId, orderId }]) =>
			orderByIdFetcher(true, false)(storeId, orderId as string, undefined, params)
	);
	const orders = useMemo(
		() => (orderIdData ? [orderIdData] : dataMap(data) ?? data),
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
	};
};
