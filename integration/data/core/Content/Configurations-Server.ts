/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CONFIGURATION_QUERY } from '@/data/constants/configuration';
import { DATA_KEY_CONFIGURATIONS } from '@/data/constants/dataKey';
import { configurationByQueryFetcher, dataMap } from '@/data/Content/_ConfigurationFetcher';
import { getSettings } from '@/data/Settings-Server';
import { Cache } from '@/data/types/Cache';
import {
	CONFIGURATION_IDS,
	CurrencyConfiguration,
	LanguageConfiguration,
} from '@/data/types/Configuration';
import { getRequestId } from '@/data/utils/getRequestId';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { traceWithId } from '@/data/utils/loggerUtil';
import { Configuration } from 'integration/generated/transactions/Configuration';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize } from 'swr';

/**
 * Fetches the configurations at the server-side from transaction server.
 *
 * @param cache The cache object.
 * @param context The server side props context.
 * @returns The configurations.
 */
export const getConfigurations = async (cache: Cache, context: GetServerSidePropsContext) => {
	traceWithId(getRequestId(context), 'getConfigurations: start');
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = {
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
			],
			...(langId && { langId }),
		},
	};
	const key = unstable_serialize([shrink(props as any), DATA_KEY_CONFIGURATIONS]);
	const value = cache.get(key) as
		| Promise<Record<Partial<CONFIGURATION_IDS>, (LanguageConfiguration | CurrencyConfiguration)[]>>
		| undefined;
	if (value) {
		return await value;
	} else {
		const configurations = dataMap(await configurationByQueryFetcher(false, context)(props));
		cache.set(key, Promise.resolve(configurations));
		return await configurations;
	}
};
