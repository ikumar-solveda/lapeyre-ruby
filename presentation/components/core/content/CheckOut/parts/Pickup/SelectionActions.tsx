/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, Stack } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated */
export const PickupSelectionActions: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const { back } = useContext(ContentContext) as ReturnType<typeof useCheckOut>;

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
			<Button
				variant="contained"
				id="pickup-details-back"
				data-testid="pickup-details-back"
				onClick={back}
				button-name="pickup-details-back"
			>
				{pickupNLS.BackToPickupStore.t()}
			</Button>

			<Button
				variant="contained"
				id="pickup-details-submit"
				data-testid="pickup-details-submit"
				type="submit"
				button-name="pickup-details-submit"
			>
				{pickupNLS.ProceedPayment.t()}
			</Button>
		</Stack>
	);
};
