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
import { dataMapTitleContent } from '@/data/utils/dataMapContent';
import { processMarketingContent } from '@/data/utils/processMarketingContent';
import { useMemo } from 'react';

const dataMap = (contents?: ESpotContainerType) =>
	contents?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData?.map(processMarketingContent);

export const getContentCarousel = async ({ cache, id: _id, context, properties }: ContentProps) =>
	await getESpotDataFromName(cache, properties?.emsName ?? '', context);

export const useContentCarousel = (emsName: ID) => {
	const { data: _data, error, loading } = useESpotDataFromName(emsName);
	const data = useMemo(() => dataMap(_data), [_data]);
	const title = useMemo(() => dataMapTitleContent(_data), [_data]);

	return {
		data,
		title,
		loading,
		error,
	};
};
