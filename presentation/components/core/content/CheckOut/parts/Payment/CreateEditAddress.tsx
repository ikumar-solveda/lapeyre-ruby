/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressForm } from '@/components/blocks/AddressForm';
import { IconLabel } from '@/components/blocks/IconLabel';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { PaymentToEdit } from '@/data/types/Order';
import { Contacts } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

type Props = {
	onSelect?: (name: keyof PaymentToEdit, _addressId: string) => void;
};

/** @deprecated */
export const PaymentCreateEditAddress: FC<Props> = ({ onSelect }) => {
	const paymentNLS = useLocalization('Payment');
	/**
	 * addressToEdit is the original address to edit
	 * editableAddress is the address fit into form without addressId
	 * if addressToEdit contains addressId means it is to update
	 */
	const { editableAddress, onAddressEditOrCreate, toggleEditCreateAddress } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckOut> & ReturnType<typeof usePayment>;

	return editableAddress ? (
		<AddressForm
			addressInput={editableAddress}
			onSubmit={onAddressEditOrCreate(onSelect)}
			submitLabel="SaveAndSelect"
			formLabel={
				<IconLabel
					icon={<Contacts color="primary" />}
					label={<Typography variant="h5">{paymentNLS.Labels.BillingAddress.t()}</Typography>}
				/>
			}
			cancelLabel="Cancel"
			onCancel={toggleEditCreateAddress(null)}
		/>
	) : null;
};
