/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useEffect, useMemo } from 'react';
import { useSettings } from '@/data/Settings';
import { orderByIdFetcher } from '@/data/Content/_Order';
import useSWR from 'swr';
import { uniq } from 'lodash';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

export const OrderStates: Record<string, Record<string, string>> = {
	pending: { P: 'PendingOrder' },
	approved: {
		I: 'Submitted',
		M: 'Approved',
	},
};

export const useOrderConfirmation = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { query } = router;
	const params = useExtraRequestParameters();
	const { orderId } = query;
	const { data, error } = useSWR(
		storeId ? [{ storeId, orderId: orderId as string, langId }, DATA_KEY_ORDER_BY_ID] : null,
		async ([{ storeId, orderId }]) => orderByIdFetcher(true)(storeId, orderId, undefined, params)
	);
	const orderStatus = useMemo(() => data?.orderStatus ?? '', [data]);
	const emails = useMemo(
		() => uniq(data?.paymentInstruction?.map((p) => p.email1).filter(Boolean) ?? []).join(', '),
		[data]
	);

	useEffect(() => {
		if (
			error ||
			!orderId ||
			(orderStatus && !(OrderStates.pending[orderStatus] || OrderStates.approved[orderStatus]))
		) {
			router.push('/');
		}
	}, [error, orderId, orderStatus, router]);

	return {
		orderId: orderId as string,
		error,
		orderStatus,
		emails,
		storeName: settings?.storeName as string,
	};
};
