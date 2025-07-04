/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMS_DATA_TYPE_FEATURE_ENABLED } from '@/data/constants/flexFlowStoreFeature';
import type { EspotEspot } from 'integration/generated/transactions/data-contracts';

export const flexFlowStoreFeatureDataMap = (eSpot?: EspotEspot) => ({
	featureMissing:
		undefined ===
		(eSpot?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData ?? [])
			.filter(
				({ baseMarketingSpotDataType }) =>
					baseMarketingSpotDataType === EMS_DATA_TYPE_FEATURE_ENABLED
			)
			.at(0),
	featureEnabled:
		(eSpot?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData ?? [])
			.filter(
				({ baseMarketingSpotDataType }) =>
					baseMarketingSpotDataType === EMS_DATA_TYPE_FEATURE_ENABLED
			)
			.at(0)
			?.baseMarketingSpotActivityName.toUpperCase() === 'TRUE',
});
