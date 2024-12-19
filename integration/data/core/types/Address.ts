/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { BasicAddress } from '@/data/types/Order';
import { EditablePersonInfo } from '@/data/types/Person';
export type {
	PersonSingleContact,
	StoreOnlineStoreContactInfoType,
} from 'integration/generated/transactions/data-contracts';

/** The action names match the translation key in AddressForm.Actions section */
export type AddressFormActionLabels = 'Cancel' | 'SaveChanges' | 'CreateAddress' | 'SaveAndSelect';

export type Address = BasicAddress & {
	addressId: string;
	addressType?: string;
	primary?: string;
	isOrgAddress?: boolean;
};

export type PrintableAddress = Omit<
	BasicAddress,
	'middleName' | 'email2' | 'fax1' | 'personTitle' | 'phone2' | 'email1' | 'phone1'
> & {
	fullName?: string;
	physical: string;
	email1?: string;
	phone1?: string;
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
	addressLine3?: string;
	primary?: string;
	isOrgAddress?: boolean;
};

export type AddressType = 'Shipping' | 'Billing' | 'ShippingAndBilling';

export type MappedAddressInfo = Pick<
	EditableAddress,
	'city' | 'state' | 'country' | 'zipCode' | 'addressLine1' | 'addressLine2' | 'addressLine3'
>;

export type EditableVerifyAddress = EditableAddress | EditablePersonInfo;
export type VerifyCallbackFunc<T extends EditableVerifyAddress> = (address?: T) => Promise<void>;
