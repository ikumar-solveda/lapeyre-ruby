/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getContentRecommendation } from '@/data/Content/ContentRecommendation-Server';
import { useESpotDataFromName } from '@/data/Content/_ESpotDataFromName';
import { ID } from '@/data/types/Basic';
import { dataMapContent as dataMap, dataMapTitleContent } from '@/data/utils/dataMapContent';
import { useMemo } from 'react';
export { dataMap, getContentRecommendation };

export const useContentRecommendation = (emsName: ID) => {
	const { data: _data, error, loading } = useESpotDataFromName(emsName);
	const data = useMemo(() => dataMap(_data), [_data]);
	const title = useMemo(() => dataMapTitleContent(_data), [_data]);

	return {
		data,
		loading,
		error,
		title,
	};
};
