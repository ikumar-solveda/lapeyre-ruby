/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { QUERY_BY_PARTNUMBERS, RANGE_PRICE_DETAILS_PROFILE_NAME } from '@/data/constants/price';
import { EntitledPriceData, PriceResponse, RangePriceItem } from '@/data/types/Price';
import { RequestQuery } from '@/data/types/RequestQuery';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPrice from 'integration/generated/transactions/transactionsPrice';
import { GetServerSidePropsContext } from 'next';

type RequestQueryForRangePrice = RequestQuery & {
	partNumber: string[];
};

export const priceListMapper = (data: PriceResponse) => {
	// api spec typing isn't accurate -- using custom type here
	const entitledPriceList: EntitledPriceData[] = data?.EntitledPrice ?? [];
	const rangePriceList: RangePriceItem[] = entitledPriceList[0]?.RangePrice ?? [];
	return { entitledPriceList, rangePriceList };
};

export const volumePriceListFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (storeId: string, query: RequestQueryForRangePrice, params: RequestParams) => {
		try {
			return (await transactionsPrice(pub).priceByPartNumbers(
				storeId,
				{
					q: QUERY_BY_PARTNUMBERS,
					profileName: RANGE_PRICE_DETAILS_PROFILE_NAME,
					catalogEntryId: [EMPTY_STRING],
					...query,
				},
				params
			)) as PriceResponse;
		} catch (error) {
			errorWithId(getRequestId(context), '_VolumePrice: volumePriceListFetcher: error', { error });
			if (pub) {
				throw error;
			} else {
				return undefined;
			}
		}
	};
