/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ESpotContainerType } from '@/data/types/ESpot';
import { processMarketingContent } from '@/data/utils/processMarketingContent';

export const dataMapContent = (contents?: ESpotContainerType) =>
	contents?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData?.map(processMarketingContent);

export const dataMapTitleContent = (contents?: ESpotContainerType) =>
	contents?.MarketingSpotData?.at(0)?.marketingSpotDataTitle?.map(processMarketingContent);
