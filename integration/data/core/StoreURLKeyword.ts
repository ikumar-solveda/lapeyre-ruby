/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_STORE_URL_KEYWORD, fetcher } from '@/data/_StoreURLKeyword';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';

export const useStoreURLKeyword = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId: languageId, defaultLanguage } = getClientSideCommon(settings, router);
	const { data, mutate, error } = useSWR(
		storeId
			? [
					shrink({
						tokenValue: `${storeId}:`,
						languageId,
						defaultLanguage,
					}),
					DATA_KEY_STORE_URL_KEYWORD,
			  ]
			: null,
		async ([props]) => fetcher(true)({ ...expand(props) })
	);

	return {
		storeUrlKeyword: data,
		mutateStoreUrlKeyword: mutate,
		error,
		loading: !error && !data,
	};
};
