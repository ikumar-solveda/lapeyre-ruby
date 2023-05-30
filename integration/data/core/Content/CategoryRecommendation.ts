/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getCategory } from '@/data/Content/_Category';
import {
	ESpotContainerType,
	getESpotDataFromName,
	useESpotDataFromName,
} from '@/data/Content/_ESpotDataFromName';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { ID } from '@/data/types/Basic';
import { EventData } from '@/data/types/Marketing';
import { ContentProps } from '@/data/types/ContentProps';
import { getMarketingDataWithEvent } from '@/data/utils/getMarketingEventFromESpot';
import { transactionsEvent } from 'integration/generated/transactions';
import { useCallback, useMemo } from 'react';
import { useSettings } from '@/data/Settings';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';

const getMarketingCategory = (container?: ESpotContainerType): EventData[] =>
	getMarketingDataWithEvent(container, [
		MARKETING_SPOT_DATA_TYPE.CATEGORY,
		MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID,
	]);

export const getCategoryRecommendation = async ({
	cache,
	id: _id,
	context,
	properties,
}: ContentProps) => {
	const spot = await getESpotDataFromName(cache, properties?.emsName ?? '', context);
	const categories = getMarketingCategory(spot);
	await Promise.all(categories.map(({ id }) => getCategory(cache, id, context)));
};

export const useCategoryRecommendation = (emsName: ID) => {
	const { data, error, loading } = useESpotDataFromName(emsName);
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const categories = useMemo(() => getMarketingCategory(data), [data]);
	const clickAction = useCallback(
		(clickedId: ID) => () => {
			const event = categories.find(({ id }) => id === clickedId)?.event;
			if (!event) return;
			transactionsEvent(true).eventHandleClickInfo(
				settings?.storeId ?? '',
				undefined,
				event,
				params
			);
		},
		[categories, params, settings]
	);
	return {
		categories,
		clickAction,
		loading,
		error,
	};
};
