/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { contactFetcher } from '@/data/Content/_PersonContactFetcher';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { AddressType } from '@/data/types/Address';
import { PersonContact } from '@/data/types/Person';
import type { PersonPerson } from 'integration/generated/transactions/data-contracts';
import { useMemo } from 'react';
import useSWR from 'swr';

export { selfFetcher } from '@/data/Content/_Person';
export {
	contactCreator,
	contactRemover,
	contactUpdater,
} from '@/data/Content/_PersonContactFetcher';

const EMPTY_ADDRESSES: PersonContact[] = [];
const EMPTY_ADDRESS_RESPONSE: PersonPerson = { contact: EMPTY_ADDRESSES } as PersonPerson;
export const usePersonContact = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { primaryAddress } = usePersonInfo();

	const {
		data: { contact: _shippingAddress = EMPTY_ADDRESSES } = EMPTY_ADDRESS_RESPONSE,
		error: shippingAddressError,
		mutate: mutateShippingAddress,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
						query: {
							addressType: 'Shipping' as AddressType,
						},
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => contactFetcher(true)(props.storeId, props.query, params)
	);

	const {
		data: { contact: _billingAddress = EMPTY_ADDRESSES } = EMPTY_ADDRESS_RESPONSE,
		error: billingAddressError,
		mutate: mutateBillingAddress,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
						query: {
							addressType: 'Billing' as AddressType,
						},
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => contactFetcher(true)(props.storeId, props.query, params)
	);

	// include the primary address in the shipping-addresses -- it might not be included if it doesn't
	//   have an addressType set -- it is still a valid shipping-address though
	const shippingAddress = useMemo(
		() =>
			!primaryAddress || primaryAddress?.addressType
				? _shippingAddress
				: [primaryAddress, ..._shippingAddress],
		[_shippingAddress, primaryAddress]
	);

	// include the primary address in the billing-addresses -- it might not be included if it doesn't
	//   have an addressType set -- it is still a valid billing-address though
	const billingAddress = useMemo(
		() =>
			!primaryAddress || primaryAddress?.addressType
				? _billingAddress
				: [primaryAddress, ..._billingAddress],
		[_billingAddress, primaryAddress]
	);

	return {
		shippingAddress,
		mutateShippingAddress,
		billingAddress,
		mutateBillingAddress,
		billingAddressError,
		shippingAddressError,
	};
};
