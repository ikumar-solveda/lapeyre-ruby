/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getSettings } from '@/data/Settings-Server';
import { Settings } from '@/data/_Settings';
import { Cache } from '@/data/types/Cache';
import { GetServerSidePropsContext } from 'next';

const STORE_ZERO_SETTINGS = {
	storeId: '0',
	userData: {},
} as Settings;

export const getEmailSettings = async (cache: Cache, context: GetServerSidePropsContext) => {
	const { query = {} } = context;
	const { storeId } = query;
	return storeId === STORE_ZERO_SETTINGS.storeId
		? STORE_ZERO_SETTINGS
		: await getSettings(cache, context);
};
