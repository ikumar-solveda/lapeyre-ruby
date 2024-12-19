/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ADDRESS_TYPES } from '@/data/constants/address';
import { Address } from '@/data/types/Address';

export const getPrimaryAddresses = (addresses: Address[]) => {
	const primaryAddresses = addresses.filter((address) => address.primary === 'true');
	const primaryShippingAddress = primaryAddresses.find(
		(address) => address.addressType === ADDRESS_TYPES.SHIPPING
	);
	const primaryBillingAddress = primaryAddresses.find(
		(address) => address.addressType === ADDRESS_TYPES.BILLING
	);
	const primaryShippingAndBillingAddress = primaryAddresses.find(
		(address) => address.addressType === ADDRESS_TYPES.SHIPPING_AND_BILLING
	);

	if (primaryShippingAddress && primaryBillingAddress) {
		return {
			primaryShippingAddress,
			primaryBillingAddress,
			areSame: primaryShippingAddress?.nickName === primaryBillingAddress?.nickName,
		};
	} else if (primaryShippingAndBillingAddress && primaryBillingAddress) {
		return {
			primaryShippingAddress: primaryShippingAndBillingAddress,
			primaryBillingAddress,
			areSame: primaryBillingAddress?.nickName === primaryShippingAndBillingAddress?.nickName,
		};
	} else if (primaryShippingAndBillingAddress && primaryShippingAddress) {
		return {
			primaryShippingAddress,
			primaryBillingAddress: primaryShippingAndBillingAddress,
			areSame: primaryShippingAddress?.nickName === primaryShippingAndBillingAddress?.nickName,
		};
	} else {
		return {
			primaryShippingAddress: primaryShippingAndBillingAddress,
			primaryBillingAddress: primaryShippingAndBillingAddress,
			areSame: true,
		};
	}
};
