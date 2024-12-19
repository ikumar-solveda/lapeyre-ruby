/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import type { ComIbmCommerceCatalogCommandsSearchDisplayCmd } from 'integration/generated/transactions/data-contracts';
import { SearchDisplay } from 'integration/generated/transactions/SearchDisplay';
import transactionsSearchDisplay from 'integration/generated/transactions/transactionsSearchDisplay';
import { GetServerSidePropsContext } from 'next';

type Props = Parameters<SearchDisplay['searchdisplayBySearchTermDetail']>;
type SearchDisplayResponse = ComIbmCommerceCatalogCommandsSearchDisplayCmd & {
	redirecturl?: string;
};

export const searchTermAssociationFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		searchTerm,
		params = {},
	}: {
		storeId: Props[0];
		searchTerm: string;
		params: Props[2];
	}): Promise<SearchDisplayResponse | undefined> => {
		try {
			return await transactionsSearchDisplay(pub).searchdisplayBySearchTermDetail(
				storeId,
				{ searchTerm },
				params
			);
		} catch (error) {
			errorWithId(getRequestId(context), 'SearchNavigation: searchDisplayFetcher: error', {
				error,
			});
			if (pub) {
				throw error;
			}
		}
	};
