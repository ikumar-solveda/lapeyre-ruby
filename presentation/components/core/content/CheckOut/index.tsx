/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { GTMCartData } from '@/components/blocks/GTMCartData';
import { Payment } from '@/components/content/CheckOut/parts/Payment';
import { Pickup } from '@/components/content/CheckOut/parts/Pickup';
import { PickupStore } from '@/components/content/CheckOut/parts/Pickup/Store';
import { Review } from '@/components/content/CheckOut/parts/Review';
import { Shipping } from '@/components/content/CheckOut/parts/Shipping';
import { CheckOutStepper } from '@/components/content/CheckOut/parts/Stepper';
import { CheckOutTypeSelector } from '@/components/content/CheckOut/parts/TypeSelector';
import { checkOutPaperSX } from '@/components/content/CheckOut/styles/paper';
import { useCheckOut } from '@/data/Content/CheckOut';
import { STEPS } from '@/data/constants/checkout';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Switch } from '@/utils/switch';
import { Paper } from '@mui/material';
import { FC } from 'react';

export const CheckOut: FC<{ id: ID }> = () => {
	const checkoutValues = useCheckOut();
	const { loading, steps, activeStep, profileUsed, data: order } = checkoutValues;

	return loading ? null : (
		<ContentProvider value={{ ...checkoutValues, order }}>
			<GTMCartData />
			{profileUsed ? (
				<Paper sx={checkOutPaperSX}>
					<Review />
				</Paper>
			) : (
				<>
					<CheckOutTypeSelector />
					<CheckOutStepper />
					<Paper sx={checkOutPaperSX}>
						{Switch(steps[activeStep])
							.case(STEPS.shipping, () => <Shipping />)
							.case(STEPS.payment, () => <Payment />)
							.case(STEPS.review, () => <Review />)
							.case(STEPS.pickup, () => <Pickup />)
							.case(STEPS['pickup-store'], () => <PickupStore />)
							.defaultTo(() => null)}
					</Paper>
				</>
			)}
		</ContentProvider>
	);
};
