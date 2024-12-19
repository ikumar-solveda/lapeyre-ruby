/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { AddressModify } from '@/components/content/AddressBook/Modify';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { useAddressBook } from '@/data/Content/AddressBook';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { ADDRESS_BILLING, ADDRESS_INIT, ADDRESS_SHIPPING, makeEditable } from '@/utils/address';
import { Add } from '@mui/icons-material';
import {
	Button,
	FormControl,
	FormHelperText,
	Grid,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { FC } from 'react';

export const AddressBook: FC<{ id: ID }> = () => {
	const addrBook = useAddressBook();
	const {
		onFilter,
		displayAddresses,
		addresses,
		type,
		getCardActions,
		editableAddress,
		onCreateOrEdit,
		openPrimaryConfirmDialog,
		onPrimaryConfirm,
		onCancelPrimaryConfirm,
	} = addrBook;
	const localization = useLocalization('AddressBook');

	return editableAddress ? (
		<ContentProvider value={{ ...addrBook }}>
			<AddressModify />
		</ContentProvider>
	) : (
		<Stack spacing={1}>
			<Typography variant="h4">{localization.Title.t()}</Typography>
			<Stack direction="row" justifyContent="space-between" alignItems="flex-end">
				<Button
					variant="contained"
					data-testid="address-book-add"
					id="address-book-add"
					startIcon={<Add />}
					onClick={onCreateOrEdit({ ...ADDRESS_INIT })}
				>
					{localization.AddButton.t()}
				</Button>
				<FormControl>
					<FormHelperText sx={{ mx: 0 }}>{localization.FilterLabel.t()}</FormHelperText>
					<Select
						size="small"
						data-testid="addresstype-filter"
						id="addresstype-filter"
						value={type}
						onChange={onFilter}
						displayEmpty
					>
						<MenuItem value="">{localization.ShowAllLabel.t()}</MenuItem>
						<MenuItem value={ADDRESS_SHIPPING}>{localization.ShippingLabel.t()}</MenuItem>
						<MenuItem value={ADDRESS_BILLING}>{localization.BillingLabel.t()}</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			{!addresses?.length ? (
				<Typography variant="subtitle2">{localization.NoAddrMsg.t()}</Typography>
			) : !displayAddresses?.length ? (
				<Typography variant="subtitle2">{localization.NoAddrForFilterMsg.t()}</Typography>
			) : (
				<Stack>
					<Grid container spacing={2} alignItems="stretch">
						{displayAddresses.map((address) => (
							<Grid item key={address.nickName}>
								<ContentProvider value={addrBook}>
									<AddressCard
										showType={true}
										address={address}
										actions={getCardActions(makeEditable(address))}
										shouldShowPrimary={true}
									/>
								</ContentProvider>
							</Grid>
						))}
					</Grid>
				</Stack>
			)}
			{openPrimaryConfirmDialog ? (
				<ConfirmationDialog
					open={openPrimaryConfirmDialog}
					onCancel={onCancelPrimaryConfirm}
					onConfirm={onPrimaryConfirm}
					text={
						{
							title: localization.SetPrimaryAddressDialog.title.t(),
							message: localization.SetPrimaryAddressDialog.message.t(),
							cancel: localization.SetPrimaryAddressDialog.cancel.t(),
							ok: localization.SetPrimaryAddressDialog.ok.t(),
						} as ConfirmationDialogText
					}
				/>
			) : null}
		</Stack>
	);
};
