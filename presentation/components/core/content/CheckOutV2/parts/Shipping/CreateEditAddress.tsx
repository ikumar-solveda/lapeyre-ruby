/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressForm } from '@/components/blocks/AddressForm';
import { IconLabel } from '@/components/blocks/IconLabel';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Home } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutV2ShippingCreateEditAddress: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	/**
	 * addressToEdit is the original address to edit
	 * editableAddress is the address fit into form without addressId
	 * if addressToEdit contains addressId means it is to update
	 */
	const { editableAddress, onAddressEditOrCreate, toggleEditCreateAddress } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckOutV2> & ReturnType<typeof useShipping>;

	return editableAddress ? (
		<AddressForm
			addressInput={editableAddress}
			onSubmit={onAddressEditOrCreate}
			submitLabel="SaveAndSelect"
			formLabel={
				<IconLabel
					icon={<Home color="primary" />}
					label={<Typography variant="h5">{shippingNLS.Labels.ShippingAddress.t()}</Typography>}
				/>
			}
			cancelLabel="Cancel"
			onCancel={toggleEditCreateAddress(null)}
		/>
	) : null;
};
