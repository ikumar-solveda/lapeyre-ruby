/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useOrderReOrder } from '@/data/Content/OrderReOrder';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ORDER_HISTORY_REVALIDATION_INTERVAL } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import {
	SubscriptionIBMStoreSummary,
	SubscriptionIBMStoreSummaryItem,
} from 'integration/generated/transactions/data-contracts';
import { useMemo } from 'react';
import useSWR from 'swr';
import { DATA_KEY_SUBSCRIPTION } from '../constants/dataKey';
import { subscriptionFetcher, subscriptionFetcherCancelOrder } from './_Subscription';

export type { SubscriptionIBMStoreSummaryItem };

const dataMap = (subscriptions?: SubscriptionIBMStoreSummary) => subscriptions?.resultList ?? [];

export const useRecurringOrders = (buyerId: string) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const { onReOrder } = useOrderReOrder();
	const params = useExtraRequestParameters();
	const { notifyError, showSuccessMessage } = useNotifications();
	const { RecurringOrderCancelled } = useLocalization('success-message');
	const {
		data,
		mutate: mutateRecurringOrderTable,
		error,
	} = useSWR(
		storeId ? [{ storeId, buyerId }, DATA_KEY_SUBSCRIPTION] : null,
		async ([{ storeId, buyerId }]) =>
			subscriptionFetcher(true)(
				storeId,
				{
					q: 'byBuyerIdAndSubscriptionType',
					subscriptionTypeCode: 'RecurringOrder',
					subscriptionId: '',
					buyerId,
				},
				params
			),
		{ refreshInterval: ORDER_HISTORY_REVALIDATION_INTERVAL, revalidateOnMount: true }
	);
	const subscriptions = useMemo(() => dataMap(data), [data]);

	const handlerConfirm = async (orderId: string, subscriptionId: string) => {
		try {
			await subscriptionFetcherCancelOrder(true)(storeId, orderId, { subscriptionId }, params);
			mutateRecurringOrderTable();
			showSuccessMessage(RecurringOrderCancelled.t(), true);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		subscriptions,
		handlerConfirm,
		error,
		onReOrder,
	};
};
