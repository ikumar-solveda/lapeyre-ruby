/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import { ADDRESS_INIT, makeEditable, validateAddress } from '@/utils/address';
import { Home } from '@mui/icons-material';
import { Alert, Box, Button, Grid, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useContext } from 'react';

export const ShippingAddressSelection: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	const { availableAddress, selectedAddress, toggleEditCreateAddress, getCardActions, showError } =
		useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;

	return (
		<Stack spacing={2} pb={2}>
			<IconLabel
				icon={<Home color="primary" />}
				label={<Typography variant="h5">{shippingNLS.Labels.ShippingAddress.t()}</Typography>}
			/>
			<Box>
				<Button
					id="checkout-new-address-button"
					data-testid="checkout-new-address-button"
					color="secondary"
					variant="contained"
					onClick={toggleEditCreateAddress({ ...ADDRESS_INIT })}
				>
					{shippingNLS.Actions.CreateNew.t()}
				</Button>
			</Box>
			{availableAddress?.length > 0 ? (
				<Box>
					<Typography>{shippingNLS.Msgs.UseSavedAddress.t()}</Typography>
					<Grid container spacing={2} alignItems="stretch" my={2}>
						{(availableAddress as Address[])?.map((address) => (
							<Grid item xs={12} sm={6} md={4} key={address.nickName}>
								<AddressCard
									address={address}
									selectedAddressId={selectedAddress?.addressId ?? ''}
									actions={getCardActions(makeEditable(address), selectedAddress as Address)}
								/>
							</Grid>
						))}
					</Grid>
					{showError && selectedAddress?.addressId && !validateAddress(selectedAddress) ? (
						<Alert variant="outlined" severity="error">
							{shippingNLS.Msgs.Incomplete.t()}
						</Alert>
					) : null}
				</Box>
			) : null}
			{showError && isEmpty(selectedAddress) ? (
				<Alert variant="outlined" severity="error">
					{shippingNLS.Msgs.SelectOrCreateAddress.t()}
				</Alert>
			) : null}
		</Stack>
	);
};
