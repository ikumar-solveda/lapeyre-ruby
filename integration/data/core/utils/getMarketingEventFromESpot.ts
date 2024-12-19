/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DISPLAY_SEQ, MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { ESpotContainerType } from '@/data/Content/_ESpotDataFromName';
import { EventData } from '@/data/types/Marketing';
import { dFix } from '@/data/utils/floatingPoint';
import type {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer,
	EspotBaseMarketingSpotActivityData,
} from 'integration/generated/transactions/data-contracts';
import { keyBy } from 'lodash';

type ESpotBaseItem =
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainerMarketingSpotDataContainerBaseMarketingSpotActivityDataContainer &
		EspotBaseMarketingSpotActivityData;

const getEventData = (item: ESpotBaseItem, identifier: string): EventData => {
	const {
		activityIdentifierID: intv_id = '',
		baseMarketingSpotDataType: expDataType = '',
		baseMarketingSpotActivityID: expDataUniqueID = '',
		experimentResult,
		productPartNumber,
	} = item;
	const productId = [
		MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY_ID,
		MARKETING_SPOT_DATA_TYPE.CATALOG_ENTRY,
	].includes(expDataType)
		? expDataUniqueID
		: '';
	const CategoryId = [
		MARKETING_SPOT_DATA_TYPE.CATALOG_GROUP_ID,
		MARKETING_SPOT_DATA_TYPE.CATEGORY,
	].includes(expDataType)
		? expDataUniqueID
		: '';

	const {
		experimentResultId: experimentId,
		experimentResultTestElementId: testElementId,
		controlElement,
	} = experimentResult?.at(0) || ({} as any);
	return {
		id: productPartNumber || expDataUniqueID,
		event: {
			expDataType,
			mpe_id: identifier,
			intv_id,
			expDataUniqueID,
			productId,
			CategoryId,
			experimentId,
			testElementId,
			controlElement,
			evtype: 'CpgnClick',
			DM_ReqCmd: '',
		},
	};
};

export const getMarketingDataWithEvent = (
	container?: ESpotContainerType,
	filterTypes?: string[]
): EventData[] => {
	const marketingSpotIdentifier =
		container?.MarketingSpotData?.at(0)?.marketingSpotIdentifier || '';

	let elements = container?.MarketingSpotData?.at(0)?.baseMarketingSpotActivityData;
	if (filterTypes) {
		const filters = keyBy(filterTypes);
		elements = elements?.filter((ele) => filters[ele.baseMarketingSpotDataType as string]);
	}

	elements?.sort((a, b) => {
		const seqA = a.properties?.find(
			({ baseMarketingKey }) => baseMarketingKey === DISPLAY_SEQ
		)?.baseMarketingValue;
		const seqB = b.properties?.find(
			({ baseMarketingKey }) => baseMarketingKey === DISPLAY_SEQ
		)?.baseMarketingValue;

		return seqA && seqB
			? dFix(seqA) - dFix(seqB)
			: // only one or neither has the displaySequence prop and value -- return that as "earlier" or return equal
			seqA
			? -1
			: seqB
			? 1
			: 0;
	});

	return (
		elements?.map((item) => getEventData(item as ESpotBaseItem, marketingSpotIdentifier)) || []
	);
};
