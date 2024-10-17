/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ChevronRightBox } from '@/components/content/CheckOutV2/parts/ChevronRightBox';
import { CheckOutV2Title } from '@/components/content/CheckOutV2/parts/Title';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutV2ShippingCreateEditAddressHeader: FC = () => {
	const { selectedItems, addressToEdit, toggleEditCreateAddress } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckOutV2> & ReturnType<typeof useShipping>;
	const shippingNLS = useLocalization('Shipping');

	return selectedItems?.length > 0 && addressToEdit ? (
		<>
			<Grid item>
				<CheckOutV2Title onClick={toggleEditCreateAddress(null)} title={shippingNLS.Title.t()} />
			</Grid>
			<Grid item>
				<CheckOutV2ChevronRightBox />
			</Grid>
			<Grid item>
				<Typography variant="h4" component="p">
					{shippingNLS.Labels[addressToEdit.addressId ? 'EditAddress' : 'AddNewAddress'].t()}
				</Typography>
			</Grid>
		</>
	) : null;
};
