/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EditableAddress, MappedAddressInfo } from '@/data/types/Address';
import type {
	AddressInfo,
	AddressValidationPluginOutput,
	ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier,
	PersonAdministratorToPerformActionOnUser,
} from 'integration/generated/transactions/data-contracts';
import { isEmpty, mapKeys } from 'lodash';

export const ADDRESS_KEY_MAP: Record<string, keyof EditableAddress> = {
	address1: 'addressLine1',
	address2: 'addressLine2',
	address3: 'addressLine3',
};

/**
 * AVS contact create and update service return two types of response.
 * If there are address suggestions resulting from address validation, the response type is `AddressValidationPluginOutput`
 * else the response type is ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier
 *
 * @returns boolean `True` if it is an `AddressValidationPluginOutput` type of response resulting from address validation, `False` otherwise
 */
export const isAddressesValidationResponse = (
	obj:
		| AddressValidationPluginOutput
		| ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier
): obj is AddressValidationPluginOutput =>
	!isEmpty((obj as AddressValidationPluginOutput).validatedAddresses);

/**
 * AVS contact create and update service return two types of response.
 * If the address was successfully created, the response object is type `ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier`
 * else the response type is `AddressValidationPluginOutput`
 *
 * @returns boolean `True` if it is an `ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier`
 * type of response resulting from address validation, `False` otherwise
 */
export const isContactCreatedResponse = (
	obj:
		| AddressValidationPluginOutput
		| ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier
): obj is ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier =>
	!isEmpty((obj as ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier).addressId);

/**
 * Helper function to map AVS response
 */
export const contactCreateUpdateResponseMap = (
	res:
		| AddressValidationPluginOutput
		| ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier
) => {
	if (isAddressesValidationResponse(res)) {
		return (
			res.validatedAddresses?.map<MappedAddressInfo>(
				(address: AddressInfo) =>
					mapKeys<AddressInfo>(
						address,
						(_, key) => ADDRESS_KEY_MAP[key] ?? key
					) as MappedAddressInfo
			) ?? ([] as MappedAddressInfo[])
		);
	} else {
		return res;
	}
};

export const isMappedAddressInfoArray = (
	obj:
		| MappedAddressInfo[]
		| ComIbmCommerceRestMemberHandlerPersonContactHandlerUserIdentifier
		| PersonAdministratorToPerformActionOnUser
): obj is MappedAddressInfo[] => Array.isArray(obj);
