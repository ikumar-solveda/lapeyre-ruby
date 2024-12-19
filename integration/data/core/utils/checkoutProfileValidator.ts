/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckoutProfileData, PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import type { PersonSingleContact } from 'integration/generated/transactions/data-contracts';
import { get, isEqual, keyBy, uniqWith } from 'lodash';

export const checkoutProfileValidator = (
	profiles: PersonCheckoutProfilesItem[],
	shipAddresses: PersonSingleContact[],
	billAddresses: PersonSingleContact[]
) => {
	const m = keyBy(uniqWith([...shipAddresses, ...billAddresses], isEqual), 'nickName');
	const allProfiles = profiles
		.filter((p) => p.xchkout_ProfileId && p.xchkout_ProfileName)
		.map((c) => ({
			...c,
			billingAddress: m[c.billing_nickName ?? ''] ?? null,
			shippingAddress: m[c.shipping_nickName ?? ''] ?? null,
			billingData: keyBy(get(c, 'protocolData', []), 'name'),
			isValid: m[c.billing_nickName ?? ''] && m[c.shipping_nickName ?? ''],
		})) as CheckoutProfileData[];
	const validProfiles = allProfiles.filter((p) => p.isValid);
	const validByKey = keyBy(validProfiles, 'xchkout_ProfileId');

	return { allProfiles, validProfiles, validByKey } as {
		allProfiles: CheckoutProfileData[];
		validProfiles: CheckoutProfileData[];
		validByKey: Record<string, CheckoutProfileData>;
	};
};
