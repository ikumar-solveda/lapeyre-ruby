/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	ESpotContainerType,
	getESpotDataFromName,
	useESpotDataFromName,
} from '@/data/Content/_ESpotDataFromName';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { processMarketingContent } from '@/data/utils/processMarketingContent';

const dataMap = (contents?: ESpotContainerType) =>
	contents?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData?.map(processMarketingContent);

export const getContentRecommendation = async ({
	cache,
	id: _id,
	context,
	properties,
}: ContentProps) => await getESpotDataFromName(cache, properties?.emsName ?? '', context);

export const useContentRecommendation = (emsName: ID) => {
	const { data, error, loading } = useESpotDataFromName(emsName);
	return {
		data: dataMap(data),
		loading,
		error,
	};
};
