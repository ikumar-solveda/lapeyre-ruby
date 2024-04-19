/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Address } from '@/data/types/Address';
import {
	PersonCheckoutProfile,
	PersonCheckoutProfileUpdateById,
} from 'integration/generated/transactions/data-contracts';

export type PersonCheckoutProfilesItem = NonNullable<
	PersonCheckoutProfile['CheckoutProfile']
>[number] & {
	xchkout_ProfileId: string;
};

export type CheckoutProfileData = PersonCheckoutProfilesItem & {
	billingAddress: Address;
	shippingAddress: Address;
	isValid: Address;
	billingData: Record<string, Record<string, string>>;
};

export type CheckoutProfileShippingType = {
	profileName?: string;
	shipping_nickName?: string;
	shipping_modeId?: string;
};

export type CheckoutProfileBillingType = {
	billing_nickName?: string;
	pay_cc_brand?: string;
	pay_payment_method?: string;
	pay_account?: string;
	pay_expire_month?: string;
	pay_expire_year?: string;
};

export type CheckoutProfileType = CheckoutProfileShippingType &
	CheckoutProfileBillingType &
	PersonCheckoutProfileUpdateById & {
		profileId?: string;
	};

// TODO: remove this post 9.1.14.0
/**
 * @deprecated Global state `selectedProfile` is deprecated in 9.1.14.0, will be removed in future release.
 */
export type SelectedProfile = {
	profile: string;
};

export type PaginationData = {
	pageNumber: number; // ordinal
	pageSize: number;
};
