/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import { PersonCheckoutProfile } from 'integration/generated/transactions/data-contracts';

export const checkoutProfileMapper = (
	response: PersonCheckoutProfile | undefined
): PersonCheckoutProfilesItem[] => {
	const list = (response?.CheckoutProfile ?? []) as PersonCheckoutProfilesItem[];
	const profileList = list.filter((p) => p.xchkout_ProfileId && p.xchkout_ProfileName);
	return profileList;
};
