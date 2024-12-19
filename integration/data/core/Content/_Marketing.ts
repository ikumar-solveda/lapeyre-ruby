/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ID } from '@/data/types/Basic';
import type {
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger,
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsEvent from 'integration/generated/transactions/transactionsEvent';
import { GetServerSidePropsContext } from 'next';

export const marketingClickInfoInvoker =
	(pub: boolean, _context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query = {},
		data,
		params,
	}: {
		storeId?: string;
		query?: Record<string, string | boolean | ID[] | number | undefined>;
		data: Record<string, string>;
		params: RequestParams;
	}) =>
		await transactionsEvent(pub).eventHandleClickInfo(
			storeId as string,
			query,
			data as unknown as ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
			params
		);

export const triggerMarketingEvent =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: Record<string, string>,
		params: RequestParams
	) =>
		await transactionsEvent(pub).eventTriggerMarketing(
			storeId,
			query,
			data as unknown as ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger,
			params
		);
