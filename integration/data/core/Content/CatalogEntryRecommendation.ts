/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCommerceAI } from '@/data/Content/CommerceAI';
import { getCommerceAI } from '@/data/Content/CommerceAI-Server';
import { getProduct } from '@/data/Content/Product';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import {
	ESpotContainerType,
	getESpotDataFromName,
	useESpotDataFromName,
} from '@/data/Content/_ESpotDataFromName';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getLocalization } from '@/data/Localization-Server';
import { useSettings } from '@/data/Settings';
import { ACTIVITY_PRODUCT } from '@/data/constants/gtm';
import { MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ESpotActivityContainer } from '@/data/types/Marketing';
import { WidgetProperties } from '@/data/types/Slot';
import { dataMapTitleContent } from '@/data/utils/dataMapContent';
import { getESpotBaseData } from '@/data/utils/getESpotBaseData';
import { getMarketingDataWithEvent } from '@/data/utils/getMarketingEventFromESpot';
import { transactionsEvent } from 'integration/generated/transactions';
import { keyBy } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

const dataMap = (spots?: ESpotContainerType) => {
	const baseMarketingSpotActivityData =
		spots?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData || [];
	const partNumbers = baseMarketingSpotActivityData
		.filter(
			({ baseMarketingSpotDataType }) =>
				baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY ||
				baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID
		)
		.map(({ productPartNumber }) => productPartNumber as string)
		.filter(Boolean);

	const aiModelData = baseMarketingSpotActivityData
		.filter(
			({ baseMarketingSpotDataType }) =>
				baseMarketingSpotDataType === MARKETING_SPOT_DATA_TYPE.AI_ML_MODEL
		)
		.map(({ baseMarketingSpotActivityName: modelId }) => ({ modelId }))
		.filter(Boolean);
	return { partNumbers, aiModelData };
};

export const getCatalogEntryRecommendation = async ({
	cache,
	id: _id,
	context,
	properties,
}: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const spot = await getESpotDataFromName(cache, properties?.emsName ?? '', context);
	if (spot) {
		let partNumbers: string[];
		const { partNumbers: _partNumbers, aiModelData } = dataMap(spot);
		if (aiModelData?.length) {
			partNumbers =
				(await getCommerceAI({
					cache,
					context,
					properties,
					id: aiModelData.at(0)?.modelId as string,
				})) ?? [];
		} else {
			partNumbers = _partNumbers;
		}
		await Promise.all(partNumbers.map((partNumber) => getProduct(cache, partNumber, context)));
	}
	await getLocalization(cache, locale, 'productDetail');
};

export const useCatalogEntryRecommendation = (emsName: ID, properties?: WidgetProperties) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { data, error, loading } = useESpotDataFromName(emsName);
	const { onPromotionClick } = useContext(EventsContext);

	const { partNumbers: _partNumbers, aiModelData } = useMemo(() => dataMap(data), [data]);
	const { aiModelResults } = useCommerceAI(aiModelData?.at(0)?.modelId, properties);
	const partNumbers = useMemo(() => {
		if (aiModelData?.length) {
			return aiModelResults ?? [];
		} else {
			return _partNumbers;
		}
	}, [_partNumbers, aiModelData, aiModelResults]);

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
	const title = useMemo(() => dataMapTitleContent(data), [data]);

	return {
		partNumbers,
		clickAction,
		loading,
		error,
		title,
		aiModelData,
	};
};
