/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { GTMCartData } from '@/components/blocks/GTMCartData';
import { CheckOutV2Payment } from '@/components/content/CheckOutV2/parts/Payment';
import { CheckOutV2Pickup } from '@/components/content/CheckOutV2/parts/Pickup';
import { CheckOutV2Review } from '@/components/content/CheckOutV2/parts/Review';
import { CheckOutV2Shipping } from '@/components/content/CheckOutV2/parts/Shipping';
import { CheckOutV2Stepper } from '@/components/content/CheckOutV2/parts/Stepper';
import { checkOutV2AlertSX } from '@/components/content/CheckOutV2/styles/alert';
import { checkOutV2PaperSX } from '@/components/content/CheckOutV2/styles/paper';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { STEPS } from '@/data/constants/checkout';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Switch } from '@/utils/switch';
import { Alert, Paper } from '@mui/material';
import { FC, useEffect } from 'react';

export const CheckOutV2: FC<{ id: ID }> = () => {
	const checkoutValues = useCheckOutV2();
	const {
		loading,
		steps,
		activeStep,
		data: order,
		rewardOptions,
		isRecurring,
		isGuest,
	} = checkoutValues;
	const qualifyReminderText = useLocalization('FreeGift').QualifyReminder;
	const localRoutes = useLocalization('Routes');
	const routeToPush = localRoutes.Login.route.t();
	const router = useNextRouter();

	useEffect(() => {
		if (isRecurring && isGuest) {
			router.push({ pathname: routeToPush, query: { flow: 'checkout' } });
		}
	}, [isRecurring, isGuest, router, routeToPush]);
	return loading ? null : (
		<ContentProvider value={{ ...checkoutValues, order }}>
			<GTMCartData />
			<CheckOutV2Stepper />
			{rewardOptions ? (
				<Alert variant="outlined" severity="success" sx={checkOutV2AlertSX}>
					{qualifyReminderText.t({ count: rewardOptions.length })}
				</Alert>
			) : null}
			{Switch(steps[activeStep])
				.case(STEPS.shipping, () => (
					<Paper sx={checkOutV2PaperSX}>
						<CheckOutV2Shipping />
					</Paper>
				))
				.case(STEPS.payment, () => (
					<Paper sx={checkOutV2PaperSX}>
						<CheckOutV2Payment />
					</Paper>
				))
				.case(STEPS.review, () => <CheckOutV2Review />)
				.case(STEPS.pickup, () => (
					<Paper sx={checkOutV2PaperSX}>
						<CheckOutV2Pickup />
					</Paper>
				))
				.defaultTo(() => null)}
		</ContentProvider>
	);
};
