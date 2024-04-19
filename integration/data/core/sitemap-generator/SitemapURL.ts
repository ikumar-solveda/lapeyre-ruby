/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getAlternateURLs } from '@/data/sitemap-generator/AlternateURLs';
import { SiteMapURL } from '@/data/types/Sitemap';

export const getSitemapURL = ({
	languageId,
	generateAlternateLanguage,
	languageId2URLStore,
}: SiteMapURL) => {
	const alternates = generateAlternateLanguage
		? getAlternateURLs(languageId2URLStore, languageId)
		: '';

	return `	<url>
		<loc>
			${languageId2URLStore[languageId]}
		</loc>
${alternates}	</url>
`;
};
