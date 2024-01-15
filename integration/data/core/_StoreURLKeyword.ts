/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { extractResultList } from '@/data/utils/extractResultList';
import { error } from '@/data/utils/loggerUtil';
import { transactionsUrlKeyword } from 'integration/generated/transactions';
import { isEmpty } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export const DATA_KEY_STORE_URL_KEYWORD = 'STORE_URL_KEYWORD';

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
		const api = transactionsUrlKeyword(pub);
		try {
			let keyword = extractResultList(
				await api.urlKeywordFindByTokenName('0', {
					q: 'byLanguageIdAndTokenNameValue',
					tokenName: 'StoreToken:CatalogToken',
					tokenValue,
					languageId,
				})
			)
				.filter((k: StoreURLKeyword) => !isEmpty(k))
				.at(0) as StoreURLKeyword | undefined;
			if (!keyword) {
				// fallback to store default language
				keyword = extractResultList(
					await api.urlKeywordFindByTokenName('0', {
						q: 'byLanguageIdAndTokenNameValue',
						tokenName: 'StoreToken:CatalogToken',
						tokenValue,
						languageId: defaultLanguage,
					})
				)
					.filter((k: StoreURLKeyword) => !isEmpty(k))
					.at(0) as StoreURLKeyword | undefined;
			}
			return keyword;
		} catch (err) {
			error(context?.req, 'Settings: fetcher: error: %o', err);
			if (pub) {
				throw err;
			}
			return undefined;
		}
	};
