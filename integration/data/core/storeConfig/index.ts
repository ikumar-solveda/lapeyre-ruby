/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import type { StoreConfig } from '@/data/types/StoreConfig';
import { logger } from '@/logging/logger';
import fs from 'fs';
import json5 from 'json5';
import { isEmpty } from 'lodash';

const storeConfigJson: StoreConfig = (() => {
	try {
		let config: StoreConfig;
		if (!isEmpty(fs)) {
			config = json5.parse(
				fs.readFileSync(process.env.STORE_CONFIG_FILE || 'store.config.json5', 'utf-8')
			);
			logger.info('getStoreConfig env STORE_CONFIG_FILE: ' + process.env.STORE_CONFIG_FILE);
			logger.debug('getStoreConfig return config %o', config);
		} else {
			// `fs` will just be an empty object/module on client-side -- check and return an empty object
			config = {} as StoreConfig;
		}

		return config;
	} catch (e: unknown) {
		logger.warn('getStoreConfig fetch cache config json failed: ' + e);
		logger.info('getStoreConfig return empty config');
		return {} as StoreConfig;
	}
})();

export const storeConfig = storeConfigJson;
