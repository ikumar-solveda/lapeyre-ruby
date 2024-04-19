/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressType } from '@/data/types/Address';
import { ID } from '@/data/types/Basic';
import { contactCreateUpdateResponseMap } from '@/data/utils/contact';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId as logError } from '@/data/utils/loggerUtil';
import { transactionsContact } from 'integration/generated/transactions';
import {
	PersonContact,
	PersonPerson,
	PersonSingleContact,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export const contactFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: {
			addressType?: AddressType;
			[key: string]: string | undefined;
		},
		params: RequestParams
	): Promise<PersonPerson | undefined> => {
		try {
			return await transactionsContact(pub).contactGetAllPersonContact(storeId, query, params);
		} catch (error: any) {
			logError(getRequestId(context), 'PersonContact: contactFetcher: error: %o', error);
			return undefined;
		}
	};

export const contactUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		nickName: string,
		query: {
			[key: string]: string;
		} = {},
		data: PersonContact,
		params: RequestParams
	) =>
		await transactionsContact(pub).contactUpdatePersonContact(
			storeId,
			nickName,
			query,
			data,
			params
		);

export const contactCreator =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string;
		} = {},
		data: PersonContact,
		params: RequestParams
	) =>
		await transactionsContact(pub).contactAddPersonContact(storeId, query, data, params);

export const contactRemover =
	(pub: boolean) =>
	async (
		storeId: string,
		nickName: string,
		query: Record<string, boolean | ID | ID[]>,
		params: RequestParams
	) =>
		await transactionsContact(pub).contactDeletePersonContact(storeId, nickName, query, params);

export const avsContactCreator =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string;
		} = {},
		data: PersonSingleContact,
		params: RequestParams
	) =>
		contactCreateUpdateResponseMap(
			await transactionsContact(pub).contactAddPersonContact(storeId, query, data, params)
		);

export const avsContactUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		nickName: string,
		query: {
			[key: string]: string;
		} = {},
		data: PersonSingleContact,
		params: RequestParams
	) =>
		contactCreateUpdateResponseMap(
			await transactionsContact(pub).contactUpdatePersonContact(
				storeId,
				nickName,
				query,
				data,
				params
			)
		);

type AVSUpdateOrCreateArgs = {
	storeId: string;
	nickName: string;
	query: {
		[key: string]: string;
	};
	data: PersonSingleContact;
	params: RequestParams;
};
export const avsContactUpdateOrCreate =
	(pub: boolean, update = false) =>
	async ({ storeId, nickName, query, data, params }: AVSUpdateOrCreateArgs) =>
		update
			? await avsContactUpdater(pub)(storeId, nickName, query, data, params)
			: await avsContactCreator(pub)(storeId, query, { ...data, nickName }, params);
