/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CONFIGURATION_QUERY } from '@/data/constants/configuration';
import { DATA_KEY_CONFIGURATIONS } from '@/data/constants/dataKey';
import { configurationByQueryFetcher, dataMap } from '@/data/Content/_ConfigurationFetcher';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { CONFIGURATION_IDS } from '@/data/types/Configuration';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { Configuration } from 'integration/generated/transactions/Configuration';
import useSWR from 'swr';

/**
 * Custom hook to fetch configurations based on the store and language settings.
 * @returns An object containing the fetched configurations and any error that occurred during the fetch.
 */
export const useConfigurations = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router); // get the language ID from the router
	const { data, error } = useSWR(
		storeId
			? [
					shrink({
						storeId,
						query: {
							q: CONFIGURATION_QUERY.BY_CONFIGURATION_IDS as Parameters<
								Configuration['configurationFindByQuery']
							>['1']['q'],
							configurationId: [
								CONFIGURATION_IDS.SUPPORTED_LANGUAGES,
								CONFIGURATION_IDS.DEFAULT_CURRENCY,
								CONFIGURATION_IDS.DEFAULT_LANGUAGE,
								CONFIGURATION_IDS.SUPPORTED_CURRENCIES,
							] as any,
							...(langId && { langId }),
						},
					}),
					DATA_KEY_CONFIGURATIONS,
			  ]
			: null,
		async ([props]) => dataMap(await configurationByQueryFetcher(true)(expand(props)))
	);
	return {
		configurations: data,
		error,
	};
};
