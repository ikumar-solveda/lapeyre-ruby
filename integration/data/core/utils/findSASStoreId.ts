/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Settings } from '@/data/Settings';
import { SAS_STORE_REL_TYPE } from '@/data/constants/environment';
import { keyBy } from 'lodash';

export const findSAS = (settings: Settings) => {
	const { relatedStores, storeId } = settings;
	const nonSelf = (relatedStores as Record<string, string>[]).filter(
		({ relatedStoreId }) => relatedStoreId !== storeId
	);
	const asMap = keyBy(nonSelf, 'relationshipType');
	return asMap[SAS_STORE_REL_TYPE]?.relatedStoreId;
};
