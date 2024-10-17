/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	CONFIGURATION_IDS,
	CurrencyConfiguration,
	LanguageConfiguration,
} from '@/data/types/Configuration';
import { getConfigurationEntries } from '@/data/utils/getConfigurationEntries';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsConfiguration } from 'integration/generated/transactions';
import { Configuration } from 'integration/generated/transactions/Configuration';
import { ConfigurationConfiguration } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

/**
 * Maps the configurations response to a record of configuration items.
 *
 * @param configurationsResponse The configurations response object.
 * @returns A record of configuration items.
 */
export const dataMap = (configurationsResponse?: ConfigurationConfiguration) =>
	(configurationsResponse?.resultList ?? []).reduce((acc, re) => {
		const { configurationId, configurationAttribute } = re;
		const configurationItem = getConfigurationEntries(configurationAttribute ?? []);
		return { ...acc, [configurationId]: configurationItem } as Record<
			Partial<CONFIGURATION_IDS>,
			(LanguageConfiguration | CurrencyConfiguration)[]
		>;
	}, {} as Record<Partial<CONFIGURATION_IDS>, (LanguageConfiguration | CurrencyConfiguration)[]>);

export const configurationByQueryFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query,
		params,
	}: {
		storeId: string;
		query: Parameters<Configuration['configurationFindByQuery']>['1'] & {
			langId?: string;
		};
		params?: RequestParams;
	}): Promise<ConfigurationConfiguration | undefined> => {
		try {
			return await transactionsConfiguration(pub).configurationFindByQuery(storeId, query, params);
		} catch (error) {
			errorWithId(
				getRequestId(context),
				'_ConfigurationFetcher: configurationByQueryFetcher: error: %o',
				{ error }
			);
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
