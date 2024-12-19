/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Settings } from '@/data/_Settings';
import { URLKeywordQueryType, urlKeywordByFetcher } from '@/data/_StoreURLKeyword';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { DATA_KEY_PAGES_BY_TYPE } from '@/data/constants/dataKey';
import { ServerPageProps } from '@/data/types/AppRouter';
import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { findSAS } from '@/data/utils/findSASStoreId';
import { shrink } from '@/data/utils/keyUtil';
import type {
	PageIBMStoreDetailsItem,
	UrlkeywordUrlkeyword,
} from 'integration/generated/transactions/data-contracts';
import { unstable_serialize } from 'swr';

const dataMap = (responses: UrlkeywordUrlkeyword[]) => {
	const rc = responses.map((response) => {
		const result = (response?.resultList ?? []) as StoreURLKeyword[]; // bad typing in spec
		return result.at(0)?.desktopURLKeyword;
	});
	return rc;
};

export const getPageURLs = async (
	props: ServerPageProps,
	settings: Settings,
	...pages: PageIBMStoreDetailsItem[]
) => {
	const { cache, context, searchParams } = props;
	const { langId: languageId } = searchParams;
	const cacheScope = getServerCacheScope(context);
	const pageIds = pages.map(({ pageId }) => pageId);
	const params = constructRequestParamsWithPreviewToken({ context, settings });
	const { storeId } = settings;
	const sasStoreId = findSAS(settings);
	const promises = pageIds.map((tokenValue) => {
		const props = {
			storeId,
			sasStoreId,
			query: {
				q: 'byLanguageIdAndTokenNameValue',
				tokenName: 'StaticPagesToken',
				tokenValue,
				languageId,
			} as URLKeywordQueryType,
		};
		const key = unstable_serialize([shrink(props as any), DATA_KEY_PAGES_BY_TYPE]);

		const value = cache.get(key, cacheScope) || urlKeywordByFetcher(false)({ ...props, params });
		cache.set(key, value, cacheScope);
		return value as UrlkeywordUrlkeyword;
	});
	const urls = dataMap(await Promise.all(promises));
	return urls;
};
