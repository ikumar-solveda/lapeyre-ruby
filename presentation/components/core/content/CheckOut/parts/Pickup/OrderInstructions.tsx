/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

/** @deprecated */
export const PickupOrderInstructions: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	return (
		<Stack spacing={2}>
			<Typography variant="subtitle1">{pickupNLS.HowPickupOrderMsg.t()}</Typography>
			<Typography>{pickupNLS.EmailMsg.t()}</Typography>
			<Typography>{pickupNLS.ContinueMsg.t()}</Typography>
		</Stack>
	);
};
