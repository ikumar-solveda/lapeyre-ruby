/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { StoreLocale } from '@/data/types/StoreLocale';
import { getStoreLocaleFromSettingsAndNextLocale } from '@/data/utils/getStoreLocaleFromSettingsAndNextLocale';

/**
 * Custom hook to fetch the store locale based on the context locale.
 * If the context locale is the default locale, the store locale is retrieved from the store default language configuration.
 * Otherwise, the store locale is the same as the context locale.
 * The unsupported locales are handled by `@/data/utils/validateLocale.ts` at server-side with a NOT FOUND response to client.
 * @returns The store locale object that contains configuration information..
 */
export const useStoreLocale = (): StoreLocale => {
	const { locale } = useNextRouter();
	const { settings } = useSettings();
	return getStoreLocaleFromSettingsAndNextLocale({
		settings,
		nextLocale: locale,
	});
};
