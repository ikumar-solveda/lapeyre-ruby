/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { REGEX as REG_EX } from '@/data/constants/regex';
import { Address, AddressType, EditableAddress, PrintableAddress } from '@/data/types/Address';
import { Country, State } from '@/data/types/CountryState';
import { BasicAddress } from '@/data/types/Order';
import { PersonContact } from '@/data/types/Person';
export { REG_EX };

export const ADDRESS_SHIPPING = 'Shipping';
export const ADDRESS_BILLING = 'Billing';
export const ADDRESS_SHIPPING_BILLING = 'ShippingAndBilling';

export const PrintableAttrs = [
	'fullName',
	'addressLine',
	'physical',
	'country',
	'phone1',
	'email1',
];
export const ShippingTablePrintableAttrs = ['addressLine', 'physical', 'country'];

export const ADDRESS_INIT: EditableAddress = {
	firstName: '',
	lastName: '',
	city: '',
	state: '',
	zipCode: '',
	country: '',
	phone1: '',
	nickName: '',
	email1: '',
	addressType: ADDRESS_SHIPPING_BILLING,
	addressLine1: '',
	addressLine2: '',
};

export const mapCountryStateOption = (options: State[] | Country[]) =>
	options.map((option) => option.displayName);

export const validateInput = (type: keyof typeof REG_EX, value: string) => {
	const stringType = REG_EX[type];
	return value !== undefined && value.trim() !== '' && stringType.test(value);
};

/**
 * @param _addr
 * @returns true if `_addr` has a non-empty country field and non-empty first address-line
 */
export const validateAddress = (
	_address:
		| (BasicAddress & { address1?: string })
		| (PersonContact & { address1?: string })
		| undefined
) => Boolean(_address?.country && (_address.addressLine?.at(0) || _address.address1));

export const makeEditable = (address: Address): EditableAddress => {
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
		addressType = ADDRESS_SHIPPING_BILLING,
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
		isOrgAddress,
	};
};

export const makePrintable = (address: BasicAddress | EditableAddress): PrintableAddress => {
	const { firstName, lastName, city, state, zipCode } = address;
	const fullName = [firstName, lastName].filter(Boolean).join(' ');
	const physical = [city, state, zipCode].filter(Boolean).join(', ');
	if (isEditableAddress(address)) {
		// editableAddress print to show validated address suggestion
		const { isOrgAddress, addressLine1, addressLine2, email1, phone1, ...addr } = address;
		return { ...addr, addressLine: [addressLine1, addressLine2], physical };
	} else {
		return { ...address, fullName, physical };
	}
};

type AddressTypeKey = 'Shipping' | 'Billing' | 'Both';

export const AddressTypes: Record<AddressTypeKey, AddressType> = {
	Shipping: ADDRESS_SHIPPING,
	Billing: ADDRESS_BILLING,
	Both: ADDRESS_SHIPPING_BILLING,
};

export const maskCC = (card: string) => card.replace(REG_EX.CARD_NUMBER_MASK, '*');

export const isEditableAddress = (
	address: EditableAddress | BasicAddress | PrintableAddress | Address
): address is EditableAddress => (address as EditableAddress).addressLine1 !== undefined;
