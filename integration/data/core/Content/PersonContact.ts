/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { transactionsContact } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Person, PersonContact } from '@/data/types/Person';
import { useSettings } from '@/data/Settings';
import useSWR from 'swr';
import { AddressType } from '@/data/types/Address';
import { PersonPerson } from 'integration/generated/transactions/data-contracts';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';

export { selfFetcher } from '@/data/Content/_Person';

const contactFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			addressType?: AddressType;
			[key: string]: string | undefined;
		},
		params: RequestParams
	): Promise<Person | undefined> => {
		try {
			return await transactionsContact(pub).contactGetAllPersonContact(storeId, query, params);
		} catch (error: any) {
			console.log(error);
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

const EMPTY_ADDRESSES: PersonContact[] = [];
const EMPTY_ADDRESS_RESPONSE: PersonPerson = { contact: EMPTY_ADDRESSES } as PersonPerson;
export const usePersonContact = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const {
		data: { contact: shippingAddress = EMPTY_ADDRESSES } = EMPTY_ADDRESS_RESPONSE,
		error: shippingAddressError,
		mutate: mutateShippingAddress,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
						query: {
							addressType: 'Shipping' as AddressType,
						},
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => contactFetcher(true)(props.storeId, props.query, params)
	);

	const {
		data: { contact: billingAddress = EMPTY_ADDRESSES } = EMPTY_ADDRESS_RESPONSE,
		error: billingAddressError,
		mutate: mutateBillingAddress,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
						query: {
							addressType: 'Billing' as AddressType,
						},
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => contactFetcher(true)(props.storeId, props.query, params)
	);

	return {
		shippingAddress,
		mutateShippingAddress,
		billingAddress,
		mutateBillingAddress,
		billingAddressError,
		shippingAddressError,
	};
};
