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
import {
	OrderOrderDetail,
	OrderOrderSummary,
	OrderOrderSummaryItem,
} from 'integration/generated/transactions/data-contracts';
import { debounce } from 'lodash';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { DATA_KEY_ORDERS_BY_STATUS, DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';
import { useCart } from '@/data/Content/Cart';
import { dFix } from '@/data/utils/floatingPoint';
import { Order } from '@/data/types/Order';
import { cartCalculator, orderCopier } from '@/data/Content/_Cart';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useNotifications } from '@/data/Content/Notifications';
import { generateCopyOrderMessage } from '@/data/utils/generateCopyOrderMessage';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { processError } from '@/data/utils/processError';
import { ORDER_HISTORY_REVALIDATION_INTERVAL } from '@/data/constants/order';

export type { OrderOrderSummaryItem };

const dataMap = (orders?: OrderOrderSummary) => orders?.Order ?? [];
const countItems = (order: Order | OrderOrderDetail | undefined) =>
	order?.orderItem
		?.map(({ quantity }) => dFix(quantity ?? 0, 0))
		.reduce((tally, current) => tally + current, 0) ?? 0;

type NoArgFn = () => string;
type ApiPayload = {
	orderId?: string;
	statuses?: string;
};
export const useOrderHistory = () => {
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data: cart, mutateCart } = useCart();
	const localization = useLocalization('Order');
	const errorMessages = useLocalization('error-message');
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

	const onReOrder = (fromOrderId: string) => async (_e: MouseEvent<HTMLButtonElement>) => {
		try {
			// fetch order to get access to its order-items
			const sourceOrder = await orderByIdFetcher(true)(storeId, fromOrderId, undefined, params);

			// count how many items are in the order
			const itemCount = countItems(sourceOrder);

			// also count how many items are in the current cart
			const cartItemsBefore = countItems(cart);

			// try to copy the order
			const copiedCart = await orderCopier(true)({
				fromOrderId,
				storeId,
				langId,
				query: undefined,
				params,
			});

			// now count items in copied-cart
			const cartItemsAfter = countItems(copiedCart);

			if (cartItemsAfter > cartItemsBefore) {
				// also need to call calculate -- since the copy_order API doesn't
				await cartCalculator(true)({ storeId, query: undefined, params });

				// notify everyone else of the update
				mutateCart();

				const fullCopy = cartItemsAfter === cartItemsBefore + itemCount;
				const { text } = generateCopyOrderMessage({ fullCopy });
				showSuccessMessage(text, true);
			} else {
				// nothing was copied -- notify with an error
				showErrorMessage(errorMessages.NoCopyOrderItems.t());
			}
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

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
