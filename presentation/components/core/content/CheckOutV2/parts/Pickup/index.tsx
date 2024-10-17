/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2PickupChoice } from '@/components/content/CheckOutV2/parts/Pickup/Choice';
import { CheckOutV2PickupForm } from '@/components/content/CheckOutV2/parts/Pickup/Form';
import { CheckOutV2PickupOrderInstructions } from '@/components/content/CheckOutV2/parts/Pickup/OrderInstructions';
import { CheckOutV2PickupSelectionActions } from '@/components/content/CheckOutV2/parts/Pickup/SelectionActions';
import { nonSelfPickupFormInitValues, selfPickupFormInitValues } from '@/data/constants/checkout';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { usePickup } from '@/data/Content/Pickup';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { isSelfPickup } from '@/utils/pickup';
import { useForm } from '@/utils/useForm';
import { Divider, Grid, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CheckOutV2Pickup: FC = () => {
	const checkout = useContext(ContentContext) as ReturnType<typeof useCheckOutV2>;
	const { pickupOrderItems: orderItems, usableShipping, next } = checkout;
	const pickup = usePickup({ orderItems, usableShipping, next });
	const { selfPickup, submitPickupDetails, shipInstruction } = pickup;
	const selfFormInitValue = useMemo(
		() =>
			shipInstruction && isSelfPickup(shipInstruction) ? shipInstruction : selfPickupFormInitValues,
		[shipInstruction]
	);
	const nonSelfFormInitValue = useMemo(
		() =>
			shipInstruction && !isSelfPickup(shipInstruction)
				? shipInstruction
				: nonSelfPickupFormInitValues,
		[shipInstruction]
	);
	const selfForm = useForm(selfFormInitValue);
	const nonSelfForm = useForm(nonSelfFormInitValue);

	return (
		<ContentProvider value={{ ...checkout, ...pickup, form: selfPickup ? selfForm : nonSelfForm }}>
			<Stack
				component="form"
				noValidate
				onSubmit={(selfPickup ? selfForm : nonSelfForm).handleSubmit(submitPickupDetails)}
				ref={(selfPickup ? selfForm : nonSelfForm).formRef}
				spacing={2}
			>
				<Grid
					justifyContent="flex-start"
					alignItems="flex-start"
					container
					rowSpacing={{ xs: 2, sm: 0 }}
					columnSpacing={{ xs: 0, sm: 2 }}
				>
					<Grid item xs={12} sm={6}>
						<Stack spacing={2}>
							<CheckOutV2PickupChoice />
							<CheckOutV2PickupForm />
						</Stack>
					</Grid>
					<Grid item sm={6}>
						<CheckOutV2PickupOrderInstructions />
					</Grid>
				</Grid>
				<Divider />
				<CheckOutV2PickupSelectionActions />
			</Stack>
		</ContentProvider>
	);
};
