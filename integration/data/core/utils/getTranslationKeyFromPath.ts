/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { DEFAULT_LANGUAGE } from '@/data/config/DEFAULTS';
import { LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import { requestTranslation } from 'integration/generated/translations';

export const getTranslationKeyFromPath = async ({
	localeId,
	path: _path,
	locale,
}: {
	localeId: string;
	path: string | string[] | undefined;
	locale?: string;
}) => {
	const path = _path as string[];
	const _locale =
		locale ||
		LANGUAGE_MAP_LOWERCASE[localeId as keyof typeof LANGUAGE_MAP_LOWERCASE] || // we should avoid use this
		LANGUAGE_MAP_LOWERCASE[DEFAULT_LANGUAGE];
	const translations = await requestTranslation({ locale: _locale, section: 'Routes' });
	const joinedPath = path ? path.join('/') : '';
	const foundEntry =
		Object.entries(translations).find(
			([_, value]) => typeof value === 'object' && value?.route === joinedPath
		) || [];
	return {
		translations,
		foundEntry,
	};
};
