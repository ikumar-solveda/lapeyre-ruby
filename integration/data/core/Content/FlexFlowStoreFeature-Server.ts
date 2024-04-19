/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { flexFlowStoreFeatureFetcher } from '@/data/Content/_FlexFlowStoreFeature';
import { getSettings } from '@/data/Settings-Server';
import { DATA_KEY_FLEX_FLOW_STORE_FEATURE } from '@/data/constants/dataKey';
import { ContentProps } from '@/data/types/ContentProps';
import { constructPreviewTokenHeaderRequestParams } from '@/data/utils/constructRequestParams';
import { flexFlowStoreFeatureDataMap } from '@/data/utils/flexFlowStoreFeatureDataMap';
import { getServerCacheScope } from '@/data/utils/getServerCacheScope';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { unstable_serialize } from 'swr';

type FlexFlowStoreFeatureProps = ContentProps & {
	id: string;
};

export const getFlexFlowStoreFeature = async ({
	cache,
	id: feature,
	context,
}: FlexFlowStoreFeatureProps) => {
	const settings = await getSettings(cache, context);
	const { storeId } = getServerSideCommon(settings, context);
	const params = constructPreviewTokenHeaderRequestParams({ context });
	const props = { storeId, feature }; // not include params in key, params only used when there is preview token.
	const key = unstable_serialize([shrink(props), DATA_KEY_FLEX_FLOW_STORE_FEATURE]);
	const cacheScope = getServerCacheScope(context);
	const value =
		cache.get(key, cacheScope) || flexFlowStoreFeatureFetcher(false)({ storeId, feature, params });
	cache.set(key, value, cacheScope);
	return flexFlowStoreFeatureDataMap(await value);
};
