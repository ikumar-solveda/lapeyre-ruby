/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { Meta } from '@/data/Meta';
import { isB2BStore, useSettings } from '@/data/Settings';
import { useStoreURLKeyword } from '@/data/StoreURLKeyword';
import { fetcher, getPageDataFromId } from '@/data/_PageDataFromId-Server';
import { DEFAULT_LANGUAGE, DEFAULT_META } from '@/data/config/DEFAULTS';
import { DATA_KEY_PAGE_DATA_FROM_ID } from '@/data/constants/dataKey';
import { Token } from '@/data/types/Token';
import { buildCanonicalUrl } from '@/data/utils/buildCanonicalUrl';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { expand, shrink } from '@/data/utils/keyUtil';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { setDefaultLayoutIfNeeded } from '@/data/utils/setDefaultLayoutIfNeeded';
import { useMemo } from 'react';
import useSWR from 'swr';
export { getPageDataFromId };

const OMIT_FOR_KEY = {
	relatedStores: true,
	locationInfo: true,
	contactInfo: true,
	defaultCatalog: true,
	userData: true,
	supportedLanguages: true,
	supportedCurrencies: true,
	storeName: true,
	state: true,
	ownerId: true,
	mapApiKey: true,
	inventorySystem: true,
	currencySymbol: true,
};

const EMPTY_TOKEN_CONTAINER: Token = {};

const metaDataMap = (contents: any): Meta =>
	[contents].reduce(
		(meta, item) => ({
			...meta,
			title: item?.page?.title || meta.title,
			description: item?.page?.metaDescription || meta.description,
			keywords: item?.page?.metaKeyword || meta.keywords,
		}),
		DEFAULT_META
	);

export const usePageDataFromId = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeUrlKeyword } = useStoreURLKeyword();
	const staticRoutes = useLocalization('Routes');
	const urlKeyword = storeUrlKeyword?.desktopURLKeyword;
	const {
		query: { path, searchTerm },
		locale = '',
	} = router;
	const { storeId, storeToken, langId } = getClientSideCommon(settings, router);
	const { storeToken: { urlKeywordName = '' } = EMPTY_TOKEN_CONTAINER } = settings;
	const iPath = useMemo(
		() => normalizeStoreTokenPath({ path, storeUrlKeyword: urlKeywordName }),
		[urlKeywordName, path]
	);
	const params = useExtraRequestParameters();
	const {
		data: _data,
		error,
		isLoading,
	} = useSWR(
		// user specific info is not needed to determine the route protection logic,
		// once the page landed on client, means it pass the server side validation.
		[
			shrink(
				{
					storeId,
					path: iPath,
					identifier: getIdFromPath(path, storeToken),
					localeId: langId || DEFAULT_LANGUAGE,
					...(searchTerm && { searchTerm: decodeURIComponent([searchTerm].flat().at(0) ?? '') }),
				},
				OMIT_FOR_KEY
			),
			DATA_KEY_PAGE_DATA_FROM_ID,
		],
		async ([props]) => fetcher(true)(expand(props), params),
		{
			revalidateOnFocus: false,
		}
	);
	const isB2B = isB2BStore(settings);
	const canonical = buildCanonicalUrl({ path, locale, urlKeywordName: urlKeyword, staticRoutes });
	const { data, meta } = useMemo(() => {
		const data = _data ? setDefaultLayoutIfNeeded(_data, isB2B) : _data;
		const meta = {
			...(data ? metaDataMap(data) : DEFAULT_META),
			...(canonical && { canonical }),
		};
		return { meta, data };
	}, [_data, canonical, isB2B]);
	return {
		data,
		meta,
		loading: isLoading,
		error,
	};
};
