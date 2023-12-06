/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { subscriptionFetcherById } from '@/data/Content/_Subscription';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { DATA_KEY_SUBSCRIPTION } from '@/data/constants/dataKey';
import { ORDER_HISTORY_REVALIDATION_INTERVAL } from '@/data/constants/order';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import {
	SubscriptionIBMStoreSummary,
	SubscriptionIBMStoreSummaryItem,
} from 'integration/generated/transactions/data-contracts';
import { useMemo } from 'react';
import useSWR from 'swr';

export type { SubscriptionIBMStoreSummaryItem };
const NEXT_STATE = ['Active', 'InActive', 'PendingCancel'];

export const getSubscriptionNextDelivery = (
	sub: SubscriptionIBMStoreSummaryItem | undefined,
	formatter: Intl.DateTimeFormat
) => {
	const subInfo = sub?.subscriptionInfo;
	let nextDelivery;
	if (subInfo) {
		const freqInfo = subInfo.fulfillmentSchedule?.frequencyInfo;
		if (freqInfo?.nextOccurence && NEXT_STATE.includes(sub?.state as string)) {
			nextDelivery = formatter.format(new Date(freqInfo.nextOccurence));
		}
	}
	return nextDelivery;
};

export const getSubscriptionStart = (sub?: SubscriptionIBMStoreSummaryItem) =>
	sub?.subscriptionInfo?.fulfillmentSchedule?.startInfo?.startDate;

export const getSubscriptionFrequency = (
	sub: SubscriptionIBMStoreSummaryItem | undefined,
	localization: ReturnType<typeof useLocalization<'Order'>>
) => {
	let schedule;
	if (sub) {
		const subInfo = sub.subscriptionInfo;
		let frequency;
		if (subInfo) {
			const duration = subInfo.fulfillmentSchedule?.endInfo?.duration?.value;
			const freqInfo = subInfo.fulfillmentSchedule?.frequencyInfo;
			if (1 === duration) {
				frequency = { unit: 1 };
			} else {
				const uom = freqInfo?.frequency?.uom?.trim();
				frequency = { unit: dFix(freqInfo?.frequency?.value ?? '', 0), uom };
			}

			const { unit, uom } = frequency;
			if (!uom) {
				schedule = localization.Once.t();
			} else {
				const freqAtN = localization[`EveryX${uom}` as keyof typeof localization];
				schedule = freqAtN.t({ frequency: unit } as any);
			}
		}
	}
	return schedule;
};

const dataMap = (subscriptionId: string, subscriptions?: SubscriptionIBMStoreSummary) =>
	subscriptions?.resultList?.find(
		({ subscriptionIdentifier }) => subscriptionIdentifier?.subscriptionId === subscriptionId
	);

export const useRecurringOrderDetails = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const subscriptionId = router.query?.subscriptionId as string;
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId && subscriptionId ? [{ storeId, subscriptionId }, DATA_KEY_SUBSCRIPTION] : null,
		async ([{ storeId, subscriptionId }]) =>
			subscriptionFetcherById(true)(storeId, subscriptionId, {}, params),
		{ refreshInterval: ORDER_HISTORY_REVALIDATION_INTERVAL }
	);

	const subscription = useMemo(() => dataMap(subscriptionId, data), [data, subscriptionId]);

	return {
		subscription,
		error,
	};
};
