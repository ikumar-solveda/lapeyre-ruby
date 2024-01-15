/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useLocalization } from '@/data/Localization';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';

type TranslatedRoutes = ReturnType<typeof useLocalization<'Routes'>>;

export const buildCanonicalUrl = ({
	path,
	locale,
	urlKeywordName,
	staticRoutes,
}: {
	path: string[] | string | undefined;
	locale: string;
	urlKeywordName?: string;
	staticRoutes: TranslatedRoutes;
}) => {
	const localePath = `/${locale}`;
	const storePath = urlKeywordName ? `/${urlKeywordName}` : '';
	const normalizedPath = [normalizeStoreTokenPath({ path, storeUrlKeyword: urlKeywordName })]
		.flat()
		.filter(Boolean)
		.join('/');
	const found = Object.entries(staticRoutes).some(
		([_, value]) =>
			typeof value === 'object' && normalizedPath && value.route.t() === normalizedPath
	);
	if (found) {
		// static route doesn't need
		return '';
	} else {
		return `${localePath}${storePath}${normalizedPath ? '/' + normalizedPath : ''}`;
	}
};
