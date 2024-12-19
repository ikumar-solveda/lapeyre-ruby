/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import commerceAIModelResults from 'integration/generated/commerceAI/commerceAIModelResults';
import type { ParamResult } from 'integration/generated/commerceAI/data-contracts';
import { RequestParams } from 'integration/generated/commerceAI/http-client';
import { ModelResults } from 'integration/generated/commerceAI/ModelResults';
import { GetServerSidePropsContext } from 'next';

type ModelResultsAPIProps = Parameters<ModelResults['modelResultsControllerFindOne']>;
const sorter = (a: ParamResult, b: ParamResult) => b.value - a.value;

export const dataMap = (data?: ParamResult[]) =>
	data?.sort(sorter).map(({ itemId, item_id }) => itemId || item_id);

export const externalParamMap = (externalParamsStringified: string, pageData?: IncomingContent) => {
	let rc: Record<string, string>;

	try {
		rc = JSON.parse(externalParamsStringified);
	} catch (e) {
		rc = {};
	}

	switch (pageData?.tokenName) {
		case 'ProductToken':
			const partNumber = pageData.tokenExternalValue;
			rc = Object.entries(rc).reduce(
				(agg, [key, value]) => ({
					...agg,
					[key]: value === 'productId' ? partNumber : value,
				}),
				{} as Record<string, string>
			);
			break;
		default:
			break;
	}

	return rc;
};

export const addExtraHeaders = (params: RequestParams, extra: Record<string, any>) => {
	const headers: HeadersInit = { ...params.headers, ...extra };
	const rc = { ...params, headers };
	return rc;
};

export type ModelResultsAPIFetcherProps = {
	projectExtKey: ModelResultsAPIProps[0];
	modelInterfaceExtKey: ModelResultsAPIProps[1];
	query: ModelResultsAPIProps[2];
	params: ModelResultsAPIProps[3];
	regionURL: string;
};
export const commerceAIModelResultsFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		projectExtKey,
		modelInterfaceExtKey,
		query,
		params,
		regionURL,
	}: ModelResultsAPIFetcherProps) => {
		try {
			return await commerceAIModelResults(pub, regionURL).modelResultsControllerFindOne(
				projectExtKey,
				modelInterfaceExtKey,
				query,
				params
			);
		} catch (error) {
			errorWithId(getRequestId(context), '_CommerceAI: commerceAIModelResultsFetcher: error', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
