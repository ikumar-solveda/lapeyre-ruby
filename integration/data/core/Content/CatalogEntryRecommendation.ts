/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getProduct } from '@/data/Content/Product';
import {
	ESpotContainerType,
	getESpotDataFromName,
	useESpotDataFromName,
} from '@/data/Content/_ESpotDataFromName';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getMarketingDataWithEvent } from '@/data/utils/getMarketingEventFromESpot';
import { transactionsEvent } from 'integration/generated/transactions';
import { useCallback, useMemo } from 'react';
import { useSettings } from '@/data/Settings';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';

const dataMap = (spots?: ESpotContainerType): string[] =>
	(spots?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData || [])
		.filter(
			({ baseMarketingSpotDataType }) =>
				baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY ||
				baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID
		)
		.map(({ productPartNumber }) => productPartNumber || '')
		.filter(Boolean);

export const getCatalogEntryRecommendation = async ({
	cache,
	id: _id,
	context,
	properties,
}: ContentProps) => {
	const spot = await getESpotDataFromName(cache, properties?.emsName ?? '', context);
	const productPartNumbers = dataMap(spot);
	await Promise.all(productPartNumbers.map((partNumber) => getProduct(cache, partNumber, context)));
};

export const useCatalogEntryRecommendation = (emsName: ID) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { data, error, loading } = useESpotDataFromName(emsName);
	const partNumbers = useMemo(() => dataMap(data), [data]);
	const productEvents = useMemo(
		() =>
			getMarketingDataWithEvent(data, [
				MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY,
				MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID,
			]),
		[data]
	);

	const clickAction = useCallback(
		(partNumber: string) => {
			const event = productEvents.find((event) => event.id === partNumber)?.event;
			if (event) {
				transactionsEvent(true).eventHandleClickInfo(
					settings?.storeId ?? '',
					undefined,
					event,
					params
				);
			}
		},
		[productEvents, settings.storeId, params]
	);

	return {
		partNumbers,
		clickAction,
		loading,
		error,
	};
};
