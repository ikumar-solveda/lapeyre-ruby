/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	getESpotDataFromName,
	getESpotDataFromNameForEmails,
} from '@/data/Content/_ESpotDataFromName-Server';
import { ContentProps, EmailContentProps } from '@/data/types/ContentProps';
import { getRequestId } from '@/data/utils/getRequestId';
import { debugWithId, loggerCan } from '@/data/utils/loggerUtil';

export { dataMapContent as dataMap } from '@/data/utils/dataMapContent';

export const getContentRecommendation = async ({
	cache,
	id: _id,
	context,
	properties,
}: ContentProps) => await getESpotDataFromName(cache, properties?.emsName ?? '', context);

const EMPTY_MAP = {};
export const getContentRecommendationForEmails = async ({
	cache,
	context,
	properties,
	substitutionMap = EMPTY_MAP,
	maskedMap = EMPTY_MAP,
}: EmailContentProps) => {
	const content = await getESpotDataFromNameForEmails(
		properties?.emsName ?? '',
		substitutionMap,
		maskedMap,
		cache,
		context
	);
	if (loggerCan('debug')) {
		debugWithId(
			getRequestId(context),
			'getContentRecommendationForEmails: fetched e-spot for properties with content',
			{ properties, content }
		);
	}
	return content;
};
