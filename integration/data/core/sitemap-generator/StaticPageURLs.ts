/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { dFix } from '@/data/Settings-Server';
import { getStoreURLKeyword } from '@/data/StoreURLKeyword-Server';
import { Settings } from '@/data/_Settings';
import { getPageURLs } from '@/data/sitemap-generator/PageURLs';
import { getSitemapURL } from '@/data/sitemap-generator/SitemapURL';
import { getStaticPages } from '@/data/sitemap-generator/StaticPages';
import { getURL } from '@/data/sitemap-generator/URL';
import { ServerPageProps } from '@/data/types/AppRouter';
import { KnownLanguageId, KnownLanguageId2URL, StaticPage } from '@/data/types/Sitemap';
import { StoreURLKeyword } from '@/data/types/URLKeyword';

const generateStaticPageURLs = async (
	serverProps: ServerPageProps,
	settings: Settings,
	storeToken: StoreURLKeyword | undefined,
	page: Required<StaticPage>,
	languageIds: KnownLanguageId[]
) => {
	const { searchParams: _searchParams } = serverProps;
	const searchParams = _searchParams as Record<string, string>;

	const urls = await Promise.all(
		languageIds.map(async (languageId) => {
			const path = (await getPageURLs(serverProps, settings, page))?.at(0) ?? '';
			const url = await getURL({ path, languageId, searchParams, settings, storeToken });
			return { languageId, url };
		})
	);
	return { pageId: page.pageId, urls };
};

export const getStaticPageURLs = async (
	serverProps: ServerPageProps,
	settings: Settings,
	_counter = 0
) => {
	const { cache, context, searchParams: _searchParams } = serverProps;
	const searchParams = _searchParams as Record<string, string>;
	const storeToken = await getStoreURLKeyword(cache, context);

	let counter = _counter;
	const rc: string[] = [];
	const { supportedLanguages } = settings;
	const {
		numberUrlsToGenerate = 50_000,
		beginIndex = 0,
		generateAlternateLanguage: _alternateLangsParam,
	} = searchParams;
	const generateAlternateLanguage = _alternateLangsParam === 'true';
	const start = dFix(beginIndex, 0);
	const end = dFix(numberUrlsToGenerate, 0) + start;
	const page2LangId: Record<string, KnownLanguageId2URL> = {};
	const languageIds = supportedLanguages as KnownLanguageId[];
	const staticPages = (await getStaticPages(serverProps)) as Required<StaticPage>[];
	const langIdPageTuples = languageIds
		.map((languageId) => staticPages.map(({ pageId }) => ({ languageId, pageId })))
		.flat(1);

	// first get all the data: index of page-ids to an array of urls with corresponding language-id
	const pageUrls = await Promise.all(
		staticPages.map(
			async (page) =>
				await generateStaticPageURLs(
					serverProps,
					settings,
					storeToken,
					page as Required<StaticPage>,
					languageIds
				)
		)
	);

	// convert into an index of page-ids mapped to index of language-ids to urls
	pageUrls.forEach(({ pageId, urls }) => {
		if (!page2LangId[pageId]) {
			page2LangId[pageId] = {} as KnownLanguageId2URL;
		}
		urls.forEach(({ languageId, url }) => {
			page2LangId[pageId][languageId] = url;
		});
	});

	langIdPageTuples.forEach(({ languageId, pageId }) => {
		if (counter >= start && counter < end) {
			rc.push(
				getSitemapURL({
					languageId,
					generateAlternateLanguage,
					languageId2URLStore: page2LangId[pageId],
				})
			);
		}
		counter++;
	});
	return rc;
};
