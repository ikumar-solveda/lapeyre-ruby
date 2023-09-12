/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ESpotContainerType } from '@/data/Content/_ESpotDataFromName';

export const getESpotBaseData = (container?: ESpotContainerType) =>
	container?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData;
