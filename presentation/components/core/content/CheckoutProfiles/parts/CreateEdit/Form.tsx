/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressForm } from '@/components/blocks/AddressForm';
import { useCheckoutProfileCreateEdit } from '@/data/Content/_CheckoutProfileCreateEdit';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const CheckoutProfilesCreateEditForm: FC = () => {
	const { addressToEdit, editableAddress, onAddressEditOrCreate, toggleEditCreateAddress } =
		useContext(ContentContext) as ReturnType<typeof useCheckoutProfileCreateEdit>;
	return editableAddress ? (
		<AddressForm
			addressInput={editableAddress}
			onSubmit={onAddressEditOrCreate}
			submitLabel={addressToEdit?.addressId ? 'SaveChanges' : 'CreateAddress'}
			showAddressType
			cancelLabel="Cancel"
			onCancel={toggleEditCreateAddress(null)}
		/>
	) : null;
};
