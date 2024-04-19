/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { flexFlowStoreFeatureFetcher } from '@/data/Content/_FlexFlowStoreFeature';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_FLEX_FLOW_STORE_FEATURE } from '@/data/constants/dataKey';
import { flexFlowStoreFeatureDataMap } from '@/data/utils/flexFlowStoreFeatureDataMap';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';

type FlexFlowStoreFeatureProps = {
	id: string;
};

export const useFlexFlowStoreFeature = ({ id: feature }: FlexFlowStoreFeatureProps) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const key = storeId ? [shrink({ storeId, feature }), DATA_KEY_FLEX_FLOW_STORE_FEATURE] : null;
	const { data, error } = useSWR(key, async ([props]) =>
		flexFlowStoreFeatureFetcher(true)({
			...expand<{ storeId: string; feature: string }>(props as any),
			params,
		})
	);

	return {
		data: flexFlowStoreFeatureDataMap(data),
		loading: !data || error,
		error,
	};
};
