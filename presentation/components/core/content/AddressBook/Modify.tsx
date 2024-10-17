/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressForm } from '@/components/blocks/AddressForm';
import { IconLabel } from '@/components/blocks/IconLabel';
import { useAddressBook } from '@/data/Content/AddressBook';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { EditableAddress } from '@/data/types/Address';
import { Edit } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';

export const AddressModify: FC = () => {
	const localization = useLocalization('AddressBook');
	const { editableAddress, onCreateOrEdit, onSave } = useContext(ContentContext) as ReturnType<
		typeof useAddressBook
	>;
	const buttonKey = editableAddress?.addressId ? 'SaveChanges' : 'CreateAddress';
	const titleKey = editableAddress?.addressId ? 'EditAddress' : 'AddrMsg';
	useEffect(() => {
		scrollTo(0, 0);
	}, []);
	return (
		<AddressForm
			addressInput={editableAddress as EditableAddress}
			onSubmit={onSave}
			submitLabel={buttonKey}
			formLabel={
				<IconLabel
					icon={<Edit color="primary" />}
					label={
						<Typography variant="subtitle1" component="h3">
							{localization[titleKey].t()}
						</Typography>
					}
				/>
			}
			cancelLabel="Cancel"
			onCancel={onCreateOrEdit()}
			showAddressType={true}
		/>
	);
};
