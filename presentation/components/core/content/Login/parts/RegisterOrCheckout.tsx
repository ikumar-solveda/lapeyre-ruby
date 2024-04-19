/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { B2B } from '@/components/blocks/B2B';
import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { Linkable } from '@/components/blocks/Linkable';
import { loginButtonSX } from '@/components/content/Login/styles/button';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { Divider, Stack, Typography } from '@mui/material';

export const RegisterOrCheckout = () => {
	const RouteLocal = useLocalization('Routes');
	const signInNLS = useLocalization('SignIn');

	const router = useNextRouter();

	const checkoutFlow = router.query.flow === 'checkout' ? true : false;
	const {
		recurringOrderInfo: { isRecurring },
	} = useRecurringOrderState();

	const noAccountMsg = signInNLS.noAccount.t();
	const noAccountButtonText = checkoutFlow
		? signInNLS.CheckoutAsGuestButton.t()
		: signInNLS.registerNow.t();
	const noAccountButtonLink = checkoutFlow
		? RouteLocal.CheckOut.route.t()
		: RouteLocal.Registration.route.t();
	return checkoutFlow && !isRecurring ? (
		<FlowIfEnabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>
			<Divider />
			<Stack alignItems="center" spacing={2}>
				<Typography variant="body1">{noAccountMsg}</Typography>
				<Linkable
					href={noAccountButtonLink}
					type="button"
					variant="outlined"
					sx={loginButtonSX}
					data-testid="button-sign-in-register"
					id="button-sign-in-register"
				>
					{noAccountButtonText}
				</Linkable>
			</Stack>
		</FlowIfEnabled>
	) : !checkoutFlow ? (
		<B2B is={false}>
			<Divider />
			<Stack alignItems="center" spacing={2}>
				<Typography variant="body1">{noAccountMsg}</Typography>
				<Linkable
					href={noAccountButtonLink}
					type="button"
					variant="outlined"
					sx={loginButtonSX}
					data-testid="button-sign-in-register"
					id="button-sign-in-register"
				>
					{noAccountButtonText}
				</Linkable>
			</Stack>
		</B2B>
	) : null;
};
