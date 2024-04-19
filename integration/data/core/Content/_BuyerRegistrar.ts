/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ID } from '@/data/types/Basic';
import { transactionsPerson } from 'integration/generated/transactions';
import {
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
	ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';

const TEXT = 'abcdefghijklmnopqrstuvwxyz01234567890_';
const TEXT_LEN = TEXT.length;
const PW_LEN = 8;

export const buyerRegistrar =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
		params: RequestParams
	): Promise<
		ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddResponse & {
			registrationApprovalStatus?: string | undefined;
		}
	> =>
		await transactionsPerson(pub).personRegisterPersonOnUserRegistrationAdminAdd(
			storeId,
			query,
			data,
			params
		);

export const nDigitRandom = () =>
	new Array(PW_LEN)
		.fill(0)
		.map(() => TEXT[Math.floor(Math.random() * TEXT_LEN)])
		.join('');
