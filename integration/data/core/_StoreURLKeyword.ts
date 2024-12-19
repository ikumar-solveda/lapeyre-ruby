/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { extractResultList } from '@/data/utils/extractResultList';
import { getRequestId } from '@/data/utils/getRequestId';
import { error } from '@/data/utils/loggerUtil';
import { type UrlkeywordUrlkeyword } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsUrlKeyword from 'integration/generated/transactions/transactionsUrlKeyword';
import { UrlKeyword } from 'integration/generated/transactions/UrlKeyword';
import { isEmpty } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export const DATA_KEY_STORE_URL_KEYWORD = 'STORE_URL_KEYWORD';
export type URLKeywordQueryType = Parameters<UrlKeyword['urlKeywordFindByTokenName']>[1];

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		tokenValue,
		languageId,
		defaultLanguage,
	}: {
		tokenValue: string;
		languageId: string;
		defaultLanguage: string;
	}) => {
		const params = { _requestId: getRequestId(context) } as RequestParams;
		const api = transactionsUrlKeyword(pub);
		try {
			let keyword = extractResultList(
				await api.urlKeywordFindByTokenName(
					'0',
					{
						q: 'byLanguageIdAndTokenNameValue',
						tokenName: 'StoreToken:CatalogToken',
						tokenValue,
						languageId,
					},
					params
				)
			)
				.filter((k: StoreURLKeyword) => !isEmpty(k))
				.at(0) as StoreURLKeyword | undefined;
			if (!keyword) {
				// fallback to store default language
				keyword = extractResultList(
					await api.urlKeywordFindByTokenName(
						'0',
						{
							q: 'byLanguageIdAndTokenNameValue',
							tokenName: 'StoreToken:CatalogToken',
							tokenValue,
							languageId: defaultLanguage,
						},
						params
					)
				)
					.filter((k: StoreURLKeyword) => !isEmpty(k))
					.at(0) as StoreURLKeyword | undefined;
			}
			return keyword;
		} catch (err) {
			error(context?.req, '_StoreURLKeyword: fetcher: error: %o', err);
			if (pub) {
				throw err;
			}
			return undefined;
		}
	};

export const urlKeywordByFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		sasStoreId,
		query,
		params,
	}: {
		storeId: string;
		sasStoreId: string;
		query: URLKeywordQueryType;
		params: RequestParams;
	}): Promise<UrlkeywordUrlkeyword | undefined> => {
		try {
			let rc = await transactionsUrlKeyword(pub).urlKeywordFindByTokenName(storeId, query, params);
			if (sasStoreId && (isEmpty(rc.resultList) || isEmpty(rc.resultList?.at(0)))) {
				// try with SAS
				rc = await transactionsUrlKeyword(pub).urlKeywordFindByTokenName(sasStoreId, query, params);
			}
			return rc;
		} catch (e: any) {
			error(context?.req, '_StoreURLKeyword: urlKeywordByFetcher: error %o', e);
			if (pub) {
				throw e;
			} else {
				return undefined;
			}
		}
	};
