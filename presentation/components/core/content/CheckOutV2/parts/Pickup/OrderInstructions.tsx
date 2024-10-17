/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useLocalization } from '@/data/Localization';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const CheckOutV2PickupOrderInstructions: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const {
		storeLocator: { selectedStore },
	} = useStoreLocatorState();
	return (
		<Stack spacing={2}>
			<Typography variant="subtitle1">{pickupNLS.HowPickupOrderMsg.t()}</Typography>
			<Typography>{pickupNLS.EmailMsg.t()}</Typography>
			<Typography>
				{pickupNLS.SelectedStore.t({ storeName: selectedStore.physicalStoreName ?? '' })}
			</Typography>
			<Typography>{pickupNLS.ContinueMsg.t()}</Typography>
		</Stack>
	);
};
