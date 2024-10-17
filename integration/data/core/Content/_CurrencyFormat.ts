/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { transactionsCurrencyFormat } from 'integration/generated/transactions';
import { ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails } from 'integration/generated/transactions/data-contracts';

const dataMap = (data: {
	resultList?: ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails[];
}) => data?.resultList?.at(0)?.decimalPlaces;

export const fetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string;
		} = {}
	) =>
		dataMap(
			await transactionsCurrencyFormat(pub).currencyFormatFindByCurrency(storeId, {
				q: 'byCurrency',
				...query,
			})
		);
