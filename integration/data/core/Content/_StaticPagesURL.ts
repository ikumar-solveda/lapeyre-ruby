/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { pagesUrlFetcher } from '@/data/Content/_Page';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_PAGES_URL } from '@/data/constants/dataKey';
import { findSAS } from '@/data/utils/findSASStoreId';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useStaticPageURL = (pageName: string) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { langId, storeId } = getClientSideCommon(settings, router);
	const sasStoreId = findSAS(settings);
	const props = { storeId, sasStoreId, langId };

	const { data, error, mutate } = useSWR(
		storeId ? [shrink(props as any), DATA_KEY_PAGES_URL] : null,
		async ([props]) => pagesUrlFetcher(true)({ ...expand(props), params })
	);

	const pageUrl = useMemo(() => (data ? data[pageName] : null), [data, pageName]);

	return { pageUrl, error, mutate };
};
