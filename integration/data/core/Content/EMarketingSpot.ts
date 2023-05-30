/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	ESpotContainerType,
	getESpotDataFromName,
	useESpotDataFromName,
} from '@/data/Content/_ESpotDataFromName';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { getCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { getCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';

const dataMap = (
	spots?: ESpotContainerType
): {
	hasContent: boolean;
	hasCatEntry: boolean;
	hasCategory: boolean;
	hasContentCarousel: boolean;
} => {
	let hasContent = false;
	let hasCatEntry = false;
	let hasCategory = false;
	let contentCount = 0;

	const elements = spots?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData ?? [];

	elements.forEach((element) => {
		if (element.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CONTENT) {
			hasContent = true;
			contentCount++;
		} else if (
			element.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY ||
			element.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID
		) {
			hasCatEntry = true;
		} else if (
			element.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATEGORY ||
			element.baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID
		) {
			hasCategory = true;
		}
	});

	const hasContentCarousel = contentCount > 1;

	return { hasContent, hasCatEntry, hasCategory, hasContentCarousel };
};

export const getEMarketingSpot = async ({ cache, id, context, properties }: ContentProps) => {
	const spot = await getESpotDataFromName(cache, properties?.emsName ?? '', context);
	const { hasCatEntry, hasCategory } = dataMap(spot);
	if (hasCatEntry) {
		await getCatalogEntryRecommendation({ cache, id, context, properties });
	}
	if (hasCategory) {
		await getCategoryRecommendation({ cache, id, context, properties });
	}
};

export const useEMarketingSpot = (emsName: ID) => {
	const { data, error, loading } = useESpotDataFromName(emsName);
	return {
		data: dataMap(data),
		loading,
		error,
	};
};
