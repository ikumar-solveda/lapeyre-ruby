/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { dFix } from '@/data/Settings-Server';
import { getStoreURLKeyword } from '@/data/StoreURLKeyword-Server';
import { Settings } from '@/data/_Settings';
import { getSitemapURL } from '@/data/sitemap-generator/SitemapURL';
import { getURL } from '@/data/sitemap-generator/URL';
import { ServerPageProps } from '@/data/types/AppRouter';
import { KnownLanguageId, KnownLanguageId2URL } from '@/data/types/Sitemap';
import { StoreURLKeyword } from '@/data/types/URLKeyword';

type CatalogIdLanguageIdTuple = {
	catalogId: string;
	languageId: KnownLanguageId;
};

const generateHomePageURLs = async (
	serverProps: ServerPageProps,
	settings: Settings,
	storeToken: StoreURLKeyword | undefined,
	catIdLangIdTuples: CatalogIdLanguageIdTuple[]
) => {
	const { searchParams: _searchParams } = serverProps;
	const searchParams = _searchParams as Record<string, string>;
	const catId2LangId: Record<string, KnownLanguageId2URL> = {};
	let prevCatId = '';

	const urls = await Promise.all(
		catIdLangIdTuples.map(async ({ catalogId, languageId }) => {
			const url = await getURL({
				path: '/',
				languageId,
				query: { catalogId },
				searchParams,
				settings,
				storeToken,
			});
			return { catalogId, languageId, url };
		})
	);

	urls.forEach(({ url, catalogId, languageId }) => {
		if (prevCatId !== catalogId) {
			catId2LangId[catalogId] = {} as KnownLanguageId2URL;
		}
		catId2LangId[catalogId][languageId] = url;
		prevCatId = catalogId;
	});

	return catId2LangId;
};

export const getHomePageURLs = async (
	serverProps: ServerPageProps,
	settings: Settings,
	_counter = 0
) => {
	const { cache, context, searchParams: _searchParams } = serverProps;
	const searchParams = _searchParams as Record<string, string>;
	const storeToken = await getStoreURLKeyword(cache, context);

	let counter = _counter;
	const rc: string[] = [];
	const { defaultCatalogId, supportedLanguages } = settings;
	const {
		numberUrlsToGenerate = 50_000,
		beginIndex = 0,
		catalogIdCSV = defaultCatalogId,
		generateAlternateLanguage: _alternateLangsParam,
	} = searchParams;
	const generateAlternateLanguage = _alternateLangsParam === 'true';
	const start = dFix(beginIndex, 0);
	const end = dFix(numberUrlsToGenerate, 0) + start;
	const catalogIds = catalogIdCSV.split(',');
	const languageIds = supportedLanguages as KnownLanguageId[];

	const catIdLangIdTuples = catalogIds
		.map((catalogId) => languageIds.map((languageId) => ({ catalogId, languageId })))
		.flat(1);
	const mappedData = await generateHomePageURLs(
		serverProps,
		settings,
		storeToken,
		catIdLangIdTuples
	);
	catIdLangIdTuples.forEach(({ catalogId, languageId }) => {
		if (counter >= start && counter < end) {
			rc.push(
				getSitemapURL({
					languageId,
					generateAlternateLanguage,
					languageId2URLStore: mappedData[catalogId],
				})
			);
		}
		counter++;
	});

	return rc;
};
