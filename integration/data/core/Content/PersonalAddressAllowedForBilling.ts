/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DATA_KEY_PAYMENT_INFO } from '@/data/constants/dataKey';
import { PROFILE_IS_PERSONAL_ADDRESS_ALLOW_FOR_BILLING } from '@/data/constants/payment';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { usableBillingAddressFetcher } from '@/data/Content/_UsableBillingAddressFetcher';
import { useSettings } from '@/data/Settings';
import useSWR from 'swr';

const dataMap = (data: Awaited<ReturnType<ReturnType<typeof usableBillingAddressFetcher>>>) =>
	data?.resultList?.[0]?.isPersonalAddressAllowForBilling ?? true;

export const usePersonalAddressAllowedForBilling = (orderId?: string) => {
	const { settings } = useSettings();
	const storeId = settings.storeId;
	const params = useExtraRequestParameters();
	const { data: isUsePersonalAddressAllowedForBilling } = useSWR(
		storeId && orderId
			? [
					{
						storeId,
						orderId,
						query: { profileName: PROFILE_IS_PERSONAL_ADDRESS_ALLOW_FOR_BILLING },
					},
					DATA_KEY_PAYMENT_INFO,
			  ]
			: null,
		async ([{ storeId, orderId, query }]) =>
			dataMap(await usableBillingAddressFetcher(true)(storeId, orderId, query, params))
	);
	return isUsePersonalAddressAllowedForBilling;
};
