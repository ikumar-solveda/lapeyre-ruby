/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { MEMBER_GROUP_QUERY_TYPE } from '@/data/types/MemberGroup';
import { extractResultList } from '@/data/utils/extractResultList';
import { error as logError } from '@/data/utils/loggerUtil';
import { losslessParser } from '@/data/utils/losslessParser';
import type {
	ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary,
	ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsMemberGroup from 'integration/generated/transactions/transactionsMemberGroup';
import { GetServerSidePropsContext } from 'next';

export const memberGroupsFetcher =
	(pub: boolean, throwError = false, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: MEMBER_GROUP_QUERY_TYPE,
		params: RequestParams
	): Promise<
		ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList[] | undefined
	> => {
		try {
			return extractResultList(
				await transactionsMemberGroup(pub)
					.memberGroupDetail2(storeId, query, { ...params, format: 'text' })
					.then(
						(raw: unknown) =>
							losslessParser(
								raw as string
							) as ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary
					)
					.catch((e) => {
						e.error = losslessParser(e.error as string);
						throw e;
					})
			);
		} catch (error: any) {
			if (pub) {
				throw error;
			}
			logError(context?.req, '_Admin_MemberGroup: memberGroupsFetcher: error: %o', error);
			if (throwError) {
				throw error;
			}
			return undefined;
		}
	};
