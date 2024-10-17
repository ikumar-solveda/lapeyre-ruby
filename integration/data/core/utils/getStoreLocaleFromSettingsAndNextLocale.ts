/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { DEFAULT_LANGUAGE, DEFAULT_LOCALE, NEXT_DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { REVERSE_LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import { Settings } from '@/data/Settings';
import { CONFIGURATION_IDS } from '@/data/types/Configuration';
import { StoreLocale } from '@/data/types/StoreLocale';

type Props = { settings: Settings; nextLocale?: string };

export const getStoreLocaleFromSettingsAndNextLocale = ({
	settings,
	nextLocale,
}: Props): StoreLocale => {
	const {
		[CONFIGURATION_IDS.SUPPORTED_LANGUAGES]: supportedLanguages = [],
		[CONFIGURATION_IDS.DEFAULT_LANGUAGE]: defaultLanguage = [],
	} = settings;
	return !nextLocale || nextLocale === NEXT_DEFAULT_LOCALE
		? // store default language configuration
		  defaultLanguage.at(0) ?? {
				// this fallback should never be reached
				localeName: DEFAULT_LOCALE,
				languageId: DEFAULT_LANGUAGE,
		  }
		: // one of the store supported languages
		  supportedLanguages.find((conf) => conf.localeName === nextLocale) ?? {
				// this fallback should never be reached
				localeName: nextLocale,
				languageId:
					REVERSE_LANGUAGE_MAP_LOWERCASE[nextLocale as keyof typeof REVERSE_LANGUAGE_MAP_LOWERCASE],
		  };
};
