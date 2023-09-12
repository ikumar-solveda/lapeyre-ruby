/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Settings } from '@/data/Settings';

export const getStateKey = (context: string, settings: Settings) => {
	const storeId = settings?.storeId;
	const rc = `${context}-${storeId}`;
	return rc;
};
