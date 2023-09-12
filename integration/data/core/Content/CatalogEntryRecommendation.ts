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
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import { ACTIVITY_PRODUCT } from '@/data/constants/gtm';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ESpotActivityContainer } from '@/data/types/Marketing';
import { getESpotBaseData } from '@/data/utils/getESpotBaseData';
import { getMarketingDataWithEvent } from '@/data/utils/getMarketingEventFromESpot';
import { transactionsEvent } from 'integration/generated/transactions';
import { keyBy } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

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
	const { onPromotionClick } = useContext(EventsContext);
	const partNumbers = useMemo(() => dataMap(data), [data]);
	const contentByPartNumber = useMemo(
		() =>
			keyBy(
				getESpotBaseData(data)?.filter(({ productPartNumber }) => productPartNumber) ?? [],
				'productPartNumber'
			),
		[data]
	);

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
			const spot = contentByPartNumber[partNumber];
			if (spot) {
				const activity = spot as Required<ESpotActivityContainer>;
				onPromotionClick({ gtm: { activity, type: ACTIVITY_PRODUCT, settings } });
			}
		},
		[productEvents, contentByPartNumber, onPromotionClick, settings, params]
	);

	return {
		partNumbers,
		clickAction,
		loading,
		error,
	};
};
