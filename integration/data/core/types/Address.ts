/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BasicAddress } from '@/data/types/Order';

/** The action names match the translation key in AddressForm.Actions section */
export type AddressFormActionLabels = 'Cancel' | 'SaveChanges' | 'CreateAddress' | 'SaveAndSelect';

export type Address = BasicAddress & {
	addressId: string;
	addressType?: string;
	primary?: string;
	isOrgAddress?: boolean;
};

export type PrintableAddress = BasicAddress & {
	fullName: string;
	physical: string;
};

export type EditableAddress = {
	addressId?: string;
	firstName: string;
	lastName: string;
	city: string;
	country: string;
	state: string;
	zipCode: string;
	phone1: string;
	nickName: string;
	email1: string;
	addressType: string;
	addressLine1: string;
	addressLine2: string;
	primary?: string;
	isOrgAddress?: boolean;
};

export type AddressType = 'Shipping' | 'Billing' | 'ShippingAndBilling';
