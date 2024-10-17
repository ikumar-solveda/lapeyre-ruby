/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutChevronRightBox } from '@/components/content/CheckOut/parts/ChevronRightBox';
import { CheckOutTitle } from '@/components/content/CheckOut/parts/Title';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated */
export const ShippingCreateEditAddressHeader: FC = () => {
	const { selectedItems, addressToEdit, toggleEditCreateAddress } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');

	return selectedItems?.length > 0 && addressToEdit ? (
		<>
			<Grid item>
				<CheckOutTitle onClick={toggleEditCreateAddress(null)} title={shippingNLS.Title.t()} />
			</Grid>
			<Grid item>
				<CheckOutChevronRightBox />
			</Grid>
			<Grid item>
				<Typography variant="h4" component="p">
					{shippingNLS.Labels[addressToEdit.addressId ? 'EditAddress' : 'AddNewAddress'].t()}
				</Typography>
			</Grid>
		</>
	) : null;
};
