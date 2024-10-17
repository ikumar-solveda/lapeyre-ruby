/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getSettings } from '@/data/Settings-Server';
import { Cache } from '@/data/types/Cache';
import { StoreLocale } from '@/data/types/StoreLocale';
import { getStoreLocaleFromSettingsAndNextLocale } from '@/data/utils/getStoreLocaleFromSettingsAndNextLocale';
import { GetServerSidePropsContext } from 'next';

/**
 * Retrieves the store locale based on the context locale.
 * If the context locale is undefined or is the default locale, the store locale is retrieved from the store default language configuration.
 * Otherwise, the store locale is the same as the context locale.
 * The unsupported locales are handled by `@/data/utils/validateLocale.ts` at server-side with a NOT FOUND response to client.
 * @param cache - The cache object.
 * @param context - The GetServerSidePropsContext object.
 * @returns The store locale object that contains configuration information.
 */
export const getStoreLocale = async ({
	cache,
	context,
}: {
	cache: Cache;
	context: GetServerSidePropsContext;
}): Promise<StoreLocale> => {
	const settings = await getSettings(cache, context);
	return getStoreLocaleFromSettingsAndNextLocale({
		settings,
		nextLocale: context.locale,
	});
};
