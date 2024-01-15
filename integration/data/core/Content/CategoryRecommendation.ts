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
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import { ACTIVITY_CATEGORY } from '@/data/constants/gtm';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ESpotActivityContainer, EventData } from '@/data/types/Marketing';
import { dataMapTitleContent } from '@/data/utils/dataMapContent';
import { getESpotBaseData } from '@/data/utils/getESpotBaseData';
import { getMarketingDataWithEvent } from '@/data/utils/getMarketingEventFromESpot';
import { transactionsEvent } from 'integration/generated/transactions';
import { keyBy } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

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

const CATEGORY_TYPES: Record<string, boolean> = {
	[MARKETING_SPOT_DATA_TYPE.CATEGORY]: true,
	[MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID]: true,
};

export const useCategoryRecommendation = (emsName: ID) => {
	const { data, error, loading } = useESpotDataFromName(emsName);
	const { onPromotionClick } = useContext(EventsContext);
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const categories = useMemo(() => getMarketingCategory(data), [data]);
	const contentByCategoryId = useMemo(
		() =>
			keyBy(
				getESpotBaseData(data)?.filter(
					({ baseMarketingSpotDataType }) => CATEGORY_TYPES[baseMarketingSpotDataType as string]
				) ?? [],
				'baseMarketingSpotActivityID'
			),
		[data]
	);

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
			const spot = contentByCategoryId[clickedId];
			if (spot) {
				const activity = spot as Required<ESpotActivityContainer>;
				onPromotionClick({ gtm: { activity, type: ACTIVITY_CATEGORY, settings } });
			}
		},
		[categories, contentByCategoryId, onPromotionClick, params, settings]
	);

	const title = useMemo(() => dataMapTitleContent(data), [data]);

	return {
		categories,
		clickAction,
		loading,
		error,
		title,
	};
};
