/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BasicAddress } from '@/data/types/Order';
import { PersonContact } from '@/data/types/Person';
/**
 * @param _addr
 * @returns true if `_addr` has a non-empty country field and non-empty first address-line
 */
export const validateAddress = (
	_address: (BasicAddress & { address1?: string }) | (PersonContact & { address1?: string })
) => Boolean(_address?.country && (_address.addressLine?.at(0) || _address.address1));
