/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ADDRESS_TYPES } from '@/data/constants/address';
import type { PersonSingleContact } from 'integration/generated/transactions/data-contracts';

const getPrimaryAddressOfType = (addresses: PersonSingleContact[], addressType: string) => {
	const primaryAddresses = addresses.filter((address) => address.primary === 'true');
	const primaryAddress =
		primaryAddresses.length > 1
			? primaryAddresses.find((address) => address.addressType === addressType)
			: primaryAddresses[0];
	return primaryAddress;
};

export const getPrimaryShippingAddress = (shippingAddress: PersonSingleContact[]) =>
	getPrimaryAddressOfType(shippingAddress, ADDRESS_TYPES.SHIPPING);

export const getPrimaryBillingAddress = (billingAddress: PersonSingleContact[]) =>
	getPrimaryAddressOfType(billingAddress, ADDRESS_TYPES.BILLING);
