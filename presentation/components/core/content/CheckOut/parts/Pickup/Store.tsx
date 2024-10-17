/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { checkOutPickupButtonSX } from '@/components/content/CheckOut/styles/Pickup/pickupButton';
import { OrderStoreLocator } from '@/components/content/StoreLocator';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePickup } from '@/data/Content/Pickup';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { Button, Divider, Grid, Stack } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated */
export const PickupStore: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const {
		next,
		orderItems,
		usableShipping,
		data: order,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const pickup = usePickup({ orderItems, usableShipping, next });
	const { continueToPickupDetails } = pickup;
	const { storeLocator } = useStoreLocatorState();
	return orderItems?.length > 0 ? (
		<Stack gap={8}>
			<OrderStoreLocator order={order} />
			<Grid item container justifyContent="flex-end">
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item>
					<Button
						sx={checkOutPickupButtonSX}
						variant="contained"
						id="pickup-in-store"
						data-testid="pickup-in-store"
						onClick={continueToPickupDetails}
						disabled={!storeLocator.selectedStore?.id}
					>
						{pickupNLS.ContinuePickupDetails.t()}
					</Button>
				</Grid>
			</Grid>
		</Stack>
	) : null;
};
