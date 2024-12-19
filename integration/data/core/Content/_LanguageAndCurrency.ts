/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Person } from 'integration/generated/transactions/Person';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { GetServerSidePropsContext } from 'next';

export type LanguageCurrencyBody = Parameters<Person['personChangeLanguageCurrency']>['1'];
export const languageAndCurrencyUpdater =
	(pub = true, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		data,
		params,
	}: {
		storeId: string;
		data: LanguageCurrencyBody;
		params: RequestParams;
	}) => {
		try {
			return await transactionsPerson(pub).personChangeLanguageCurrency(storeId, data, {}, params);
		} catch (error) {
			errorWithId(
				getRequestId(context),
				'_LanguageAndCurrency: languageAndCurrencyUpdater: error: %o',
				{ error }
			);
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
