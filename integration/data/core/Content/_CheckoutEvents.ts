/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useNextRouter } from '@/data/Content/_NextRouter';
import { Settings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { STEPS } from '@/data/constants/checkout';
import { EventsContext, EventsContextType } from '@/data/context/events';
import { BOPIS_CHECK_OUT_STEP, CHECK_OUT_STEP } from '@/data/types/CheckOut';
import { GTMCartViewContextData } from '@/data/types/GTM';
import { Order } from '@/data/types/Order';
import { useCallback, useContext, useMemo } from 'react';

type Props = {
	cart: Order;
	settings: Settings;
	activeStep: number;
	steps: BOPIS_CHECK_OUT_STEP[] | CHECK_OUT_STEP[];
};
type CheckoutEventFunction =
	| EventsContextType['onCheckout']
	| EventsContextType['onCheckoutShipping']
	| EventsContextType['onCheckoutPayment'];

export const useCheckoutEvents = ({ cart, settings, activeStep, steps }: Props) => {
	const {
		onCheckout,
		onCheckoutShipping,
		onCheckoutPayment,
		onCheckoutPageView,
		onPurchase,
		eventData,
		clearEventData,
	} = useContext(EventsContext);
	const router = useNextRouter();
	const { user } = useUser();
	const step = useMemo(() => steps[activeStep], [steps, activeStep]);
	const stepEvent: Partial<Record<keyof typeof STEPS, CheckoutEventFunction>> = useMemo(
		() => ({
			shipping: onCheckout,
			pickup: onCheckout,
			payment: onCheckoutShipping,
			review: onCheckoutPayment,
		}),
		[onCheckout, onCheckoutPayment, onCheckoutShipping]
	);

	const onCheckoutEvent = useCallback(async () => {
		const { storeName } = settings;
		const contextData: Record<string, GTMCartViewContextData> = eventData['onCartView'];
		const allFetched = cart?.orderItem?.every(
			({ orderItemId }) => contextData?.[orderItemId]?.product && contextData[orderItemId].category
		);

		if (allFetched) {
			const gtm = { cart, contextData, orgName: '', orgId: '', storeName, settings };
			const checkoutPayload = { gtm };

			onCheckoutPageView({
				gtm: {
					pagePath: router.asPath,
					pageSubCategory: step,
					isLoggedIn: !!user?.isLoggedIn,
					userId: user?.userId as string,
					...gtm,
				},
			});

			if (stepEvent[step]) {
				(stepEvent[step] as CheckoutEventFunction)(checkoutPayload);
			}
		}
	}, [cart, eventData, onCheckoutPageView, router.asPath, settings, step, stepEvent, user]);

	const onPurchaseEvent = useCallback(async () => {
		const contextData: Record<string, GTMCartViewContextData> = eventData['onCartView'];
		await onPurchase({
			gtm: {
				cart,
				contextData,
				orgId: '',
				orgName: '',
				storeName: settings?.storeName,
				settings,
			},
		});
		clearEventData('onCartView');
	}, [cart, clearEventData, eventData, onPurchase, settings]);

	return { onPurchaseEvent, onCheckoutEvent };
};
