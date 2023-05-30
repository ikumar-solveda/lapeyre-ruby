/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Grid, Stack, Divider } from '@mui/material';
import { FC, useContext } from 'react';
import { PickupOrderInstructions } from '@/components/content/CheckOut/parts/Pickup/OrderInstructions';
import { PickupChoice } from '@/components/content/CheckOut/parts/Pickup/Choice';
import { PickupForm } from '@/components/content/CheckOut/parts/Pickup/Form';
import { PickupSelectionActions } from '@/components/content/CheckOut/parts/Pickup/SelectionActions';
import { useForm } from '@/utils/useForm';
import { selfPickupFormInitValues, nonSelfPickupFormInitValues } from '@/data/constants/checkout';
import { usePickup } from '@/data/Content/Pickup';

export const Pickup: FC = () => {
	const checkout = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { orderItems, usableShipping, next } = checkout;
	const pickup = usePickup({ orderItems, usableShipping, next });
	const { selfPickup, submitPickupDetails } = pickup;
	const selfForm = useForm(selfPickupFormInitValues);
	const nonSelfForm = useForm(nonSelfPickupFormInitValues);

	return (
		<ContentProvider value={{ ...checkout, ...pickup, form: selfPickup ? selfForm : nonSelfForm }}>
			<Stack
				component="form"
				noValidate
				onSubmit={(selfPickup ? selfForm : nonSelfForm).handleSubmit(submitPickupDetails)}
				ref={(selfPickup ? selfForm : nonSelfForm).formRef}
				spacing={2}
			>
				<Grid justifyContent="flex-start" alignItems="flex-start" container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Stack spacing={2}>
							<PickupChoice />
							<PickupForm />
						</Stack>
					</Grid>
					<Grid item sm={6}>
						<PickupOrderInstructions />
					</Grid>
				</Grid>
				<Divider />
				<PickupSelectionActions />
			</Stack>
		</ContentProvider>
	);
};
