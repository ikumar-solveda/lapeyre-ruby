/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Settings } from '@/data/_Settings';
import { StoreConfig } from '@/data/types/StoreConfig';
import { get } from 'lodash';

export const getStoreConfigValue = <T>(
	storeConfig: StoreConfig,
	configId: string,
	storeId: string
) => {
	const configEntry = get(storeConfig, `${storeId}.${configId}`) as T;
	if (configEntry) {
		return configEntry;
	} else {
		return get(storeConfig, `default.${configId}`) as T;
	}
};

export const getStoreConfig = <T>(settings: Settings, configId: string) =>
	getStoreConfigValue<T>(settings.storeConfig ?? {}, configId, settings.storeId);
