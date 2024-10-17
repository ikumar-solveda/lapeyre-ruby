/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orderByIdFetcherFull } from '@/data/Content/_Order';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { Order } from '@/data/types/Order';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { partition } from 'lodash';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

export const useOrderHistoryDetailsV2 = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const routes = useLocalization('Routes');
	const { orderId } = router.query;
	const { data, error } = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
						orderId,
						query: { langId },
					},
					DATA_KEY_ORDER_BY_ID,
			  ]
			: null,
		async ([{ storeId, orderId, query }]) =>
			orderByIdFetcherFull(true)({ storeId, orderId: orderId as string, query, params }),
		{ revalidateOnMount: true }
	);
	const [pickupOrderItems, deliveryOrderItems] = useMemo(
		() => partition(data?.orderItem ?? [], (e) => e.shipModeCode === SHIP_MODE_CODE_PICKUP),
		[data]
	);

	useEffect(() => {
		if (!orderId || error) {
			router.push(routes.OrderHistory.route.t()); // TODO: route to a 404 page instead
		}
	}, [orderId, error, router, routes]);

	return {
		orderId,
		order: data as any as Order,
		pickupOrderItems,
		deliveryOrderItems,
		error,
		locale,
	};
};
