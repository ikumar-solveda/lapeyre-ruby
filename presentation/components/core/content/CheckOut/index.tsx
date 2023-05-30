/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Payment } from '@/components/content/CheckOut/parts/Payment';
import { Review } from '@/components/content/CheckOut/parts/Review';
import { Pickup } from '@/components/content/CheckOut/parts/Pickup';
import { Shipping } from '@/components/content/CheckOut/parts/Shipping';
import { CheckOutStepper } from '@/components/content/CheckOut/parts/Stepper';
import { checkOutPaperSX } from '@/components/content/CheckOut/styles/paper';
import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper } from '@mui/material';
import { FC } from 'react';
import { CheckOutTypeSelector } from '@/components/content/CheckOut/parts/TypeSelector';
import { PickupStore } from '@/components/content/CheckOut/parts/Pickup/Store';

export const CheckOut: FC<{ id: ID }> = () => {
	const checkoutValues = useCheckOut();
	const { loading, steps, activeStep, profileUsed } = checkoutValues;

	return loading ? null : (
		<ContentProvider value={{ ...checkoutValues }}>
			{profileUsed ? (
				<Paper sx={checkOutPaperSX}>
					<Review />
				</Paper>
			) : (
				<>
					<CheckOutTypeSelector />
					<CheckOutStepper />
					<Paper sx={checkOutPaperSX}>
						{steps[activeStep] !== 'shipping' ? null : <Shipping />}
						{steps[activeStep] !== 'payment' ? null : <Payment />}
						{steps[activeStep] !== 'review' ? null : <Review />}
						{steps[activeStep] !== 'pickup' ? null : <Pickup />}
						{steps[activeStep] !== 'pickup-store' ? null : <PickupStore />}
					</Paper>
				</>
			)}
		</ContentProvider>
	);
};
