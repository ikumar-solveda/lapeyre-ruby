/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { LANGUAGE_MAP } from '@/data/constants/environment';
import { KnownLanguageId, KnownLanguageId2URL } from '@/data/types/Sitemap';

export const getAlternateURLs = (
	languageId2URLStore: KnownLanguageId2URL,
	languageId: KnownLanguageId
) =>
	(Object.entries(languageId2URLStore) as [KnownLanguageId, string][])
		.filter(([langId]) => languageId !== langId)
		.map(
			([
				langId,
				url,
			]) => `		<xhtml:link rel="alternate" hreflang="${LANGUAGE_MAP[langId]}" href="${url}" />
`
		)
		.join('');
