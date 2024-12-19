/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMS_USAGE_TYPE_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { ID } from '@/data/types/Basic';
import { error } from '@/data/utils/loggerUtil';
import { omitKeys_ESpot } from '@/data/utils/omitKeys_ESpot';
import type { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsSpot from 'integration/generated/transactions/transactionsSpot';
import { GetServerSidePropsContext } from 'next';

export const flexFlowStoreFeatureFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * Data fetcher for Store feature eSpot data
	 * @param storeId the store Id.
	 * @param feature the feature name.
	 * @param query the request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched Store feature E Marketing Spot data.
	 */
	async ({
		storeId,
		feature,
		query = {},
		params,
	}: {
		storeId: string;
		feature: string;
		query?: {
			[key: string]: string | boolean | ID[] | number;
		};
		params: RequestParams;
	}) => {
		if (pub) {
			return omitKeys_ESpot(
				await transactionsSpot(pub).eSpotFindESpotData(
					storeId,
					feature,
					EMS_USAGE_TYPE_STORE_FEATURE,
					query,
					params
				)
			);
		} else {
			try {
				return omitKeys_ESpot(
					await transactionsSpot(pub).eSpotFindESpotData(
						storeId,
						feature,
						EMS_USAGE_TYPE_STORE_FEATURE,
						query,
						params
					)
				);
			} catch (e) {
				error(context?.req, 'flexFlowStoreFeatureFetcher: fetcher: error: %o', e);
				return undefined;
			}
		}
	};
