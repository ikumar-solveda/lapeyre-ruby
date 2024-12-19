/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { URLKeywordQueryType, urlKeywordByFetcher } from '@/data/_StoreURLKeyword';
import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { extractResultList } from '@/data/utils/extractResultList';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { Page } from 'integration/generated/transactions/Page';
import type {
	PageIBMStoreDetailsItem,
	PageIBMStoreDetailsSEO,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPage from 'integration/generated/transactions/transactionsPage';
import { Dictionary, keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export type PagesFetcherQueryType = Parameters<Page['pageByCategoryIds']>[1];

export const pagesByTypeFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query,
		params,
	}: {
		storeId: string;
		query: PagesFetcherQueryType;
		params: RequestParams;
	}): Promise<PageIBMStoreDetailsSEO | undefined> => {
		try {
			return await transactionsPage(pub).pageByCategoryIds(storeId, query, params);
		} catch (error: any) {
			errorWithId(getRequestId(context), '_Page: pagesByTypeFetcher: error', { error });
			if (pub) {
				throw error;
			} else {
				return undefined;
			}
		}
	};

export const pagesUrlFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		sasStoreId,
		langId,
		params,
	}: {
		storeId: string;
		sasStoreId: string;
		langId: string;
		params: RequestParams;
	}): Promise<
		| Dictionary<
				StoreURLKeyword & {
					name: string;
					id: string;
				}
		  >
		| undefined
	> => {
		try {
			const query = { q: 'byUrlConfigurable', urlConfigurable: true } as PagesFetcherQueryType;
			const pages = extractResultList(
				await transactionsPage(pub).pageByCategoryIds(storeId, query, params)
			);
			return keyBy(
				(
					await Promise.all(
						pages.map(({ pageId }: PageIBMStoreDetailsItem) => {
							const props = {
								storeId,
								sasStoreId,
								query: {
									q: 'byLanguageIdAndTokenNameValue',
									tokenName: 'StaticPagesToken',
									tokenValue: pageId,
									languageId: langId,
								} as URLKeywordQueryType,
							};
							return urlKeywordByFetcher(pub)({ ...props, params });
						})
					)
				)
					.map((response, index) => ({
						name: pages[index].name,
						id: pages[index].pageId,
						...extractResultList(response).at(0),
					}))
					.filter(({ name, id, desktopURLKeyword }) => name && id && desktopURLKeyword),
				'name'
			) as Dictionary<
				StoreURLKeyword & {
					name: string;
					id: string;
				}
			>;
		} catch (error) {
			errorWithId(getRequestId(context), '_Page: staticPageUrlFetcher: error', { error });
			if (pub) {
				throw error;
			} else {
				return undefined;
			}
		}
	};
