/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ADDRESS_TYPES } from '@/data/constants/address';
import { Address, EditableAddress } from '@/data/types/Address';

export const makeEditableAddress = (address: Address): EditableAddress => {
	const {
		addressLine,
		firstName = '',
		lastName = '',
		city = '',
		country = '',
		state = '',
		zipCode = '',
		phone1 = '',
		nickName = '',
		email1 = '',
		addressType = ADDRESS_TYPES.SHIPPING_AND_BILLING,
		addressId,
		primary,
		isOrgAddress,
	} = address;
	return {
		firstName,
		lastName,
		city,
		country,
		state,
		zipCode,
		phone1,
		nickName,
		email1,
		addressType,
		addressId,
		primary,
		addressLine1: addressLine?.at(0) ?? '',
		addressLine2: addressLine?.at(1) ?? '',
		addressLine3: addressLine?.at(2) ?? '',
		isOrgAddress,
	};
};
