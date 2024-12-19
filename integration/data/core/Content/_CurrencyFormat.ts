/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import type { ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails } from 'integration/generated/transactions/data-contracts';
import transactionsCurrencyFormat from 'integration/generated/transactions/transactionsCurrencyFormat';
import { GetServerSidePropsContext } from 'next';

const dataMap = (data: {
	resultList?: ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails[];
}) => data?.resultList?.at(0)?.decimalPlaces;

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: {
			[key: string]: string;
		} = {}
	) => {
		try {
			return dataMap(
				await transactionsCurrencyFormat(pub).currencyFormatFindByCurrency(storeId, {
					q: 'byCurrency',
					...query,
				})
			);
		} catch (error) {
			errorWithId(getRequestId(context), '_CurrencyFormat: fetcher: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
