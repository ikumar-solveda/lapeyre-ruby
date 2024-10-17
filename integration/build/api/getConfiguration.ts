/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { keyBy } from 'lodash';
import { APIConfig, APIConfigFromFile } from './types';

export const getConfiguration = (config: APIConfigFromFile) => {
	const includeTags = keyBy(config.includeTags);
	const excludeTags = keyBy(config.excludeTags);
	return { ...config, includeTags, excludeTags } as APIConfig;
};
