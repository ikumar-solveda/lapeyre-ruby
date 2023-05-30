/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { Person } from '@/data/types/Person';
import { transactionsPerson } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const selfFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: boolean | ID | ID[];
		} = {},
		params: RequestParams
	): Promise<Person | undefined> => {
		try {
			return await transactionsPerson(pub).personFindPersonBySelf(storeId, query, params);
		} catch (e) {
			if (pub) {
				console.log(e);
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

export const selfUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: boolean | ID | ID[] | string;
		} = {},
		data: any, // the spec is wrong
		params: RequestParams
	) =>
		await transactionsPerson(pub).personUpdatePersonOnUserRegistrationUpdate(
			storeId,
			query,
			data,
			params
		);
