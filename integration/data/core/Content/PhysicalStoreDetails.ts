/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DATA_KEY_STORE_LOCATOR_STORES } from '@/data/constants/dataKey';
import { ByPhysicalStoreIdParams } from '@/data/constants/storeLocator';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { byPhysicalStoreIdFetcher } from '@/data/Content/_StoreLocator';
import { useSettings } from '@/data/Settings';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';

export const usePhysicalStoreDetails = ({ id: physicalStoreId }: { id?: string }) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data: storeInCart } = useSWR(
		physicalStoreId && storeId && langId
			? [shrink({ storeId, physicalStoreId, query: { langId } }), DATA_KEY_STORE_LOCATOR_STORES]
			: null,
		async ([props]) => {
			const expanded = expand<ByPhysicalStoreIdParams>(props);
			return byPhysicalStoreIdFetcher(true)(expanded);
		}
	);
	return { storeInCart };
};
