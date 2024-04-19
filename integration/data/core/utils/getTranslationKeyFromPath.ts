/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { DEFAULT_LANGUAGE } from '@/data/config/DEFAULTS';
import { LANGUAGE_MAP } from '@/data/constants/environment';
import { requestTranslation } from 'integration/generated/translations';

export const getTranslationKeyFromPath = async ({
	localeId,
	path: _path,
}: {
	localeId: string;
	path: string | string[] | undefined;
}) => {
	const path = _path as string[];
	const locale =
		LANGUAGE_MAP[localeId as keyof typeof LANGUAGE_MAP] || LANGUAGE_MAP[DEFAULT_LANGUAGE];
	const translations = await requestTranslation({ locale, section: 'Routes' });
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
