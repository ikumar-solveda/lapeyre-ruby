/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TransactionErrorResponse } from '@/data/types/Basic';
import { getLocalization, useLocalization } from '@/data/Localization';
import { DELIVERY_STEPS, BOPIS_STEPS } from '@/data/constants/checkout';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { profileBillingApplier, useCart } from '@/data/Content/Cart';
import { ContentProps } from '@/data/types/ContentProps';
import { transactionsCart } from 'integration/generated/transactions';
import { RequestQuery } from '@/data/types/RequestQuery';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { useSettings } from '@/data/Settings';
import { EventsContext } from '@/data/context/events';
import { useNotifications } from '@/data/Content/Notifications';
import { processError } from '@/data/utils/processError';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { useNextRouter } from '@/data/Content/_NextRouter';
import useSWR from 'swr';
import {
	getUniqueShippingMethods,
	shippingInfoFetcher,
	shippingInfoUpdateFetcher,
} from '@/data/Content/_ShippingInfo';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { dAdd, dFix } from '@/data/utils/floatingPoint';
import { Order } from '@/data/types/Order';
import { checkoutProfileMapper } from '@/data/utils/checkoutProfileMapper';
import { checkoutProfilesFetcher } from '@/data/Content/CheckoutProfiles';
import { isEmpty, keyBy } from 'lodash';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { DATA_KEY_CHECKOUT_PROFILES, DATA_KEY_SHIPPING_INFO } from '@/data/constants/dataKey';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

export type ReviewType = {
	cvv?: string;
};

const preCheckout =
	(pub: boolean) =>
	async (storeId: string, query: RequestQuery = {}, params: RequestParams = {}) =>
		await transactionsCart(pub).cartPreCheckout(storeId, query, undefined, params);

const checkout =
	(pub: boolean) =>
	async (
		storeId: string,
		data: Record<string, any>,
		query: RequestQuery = {},
		params: RequestParams = {}
	) =>
		await transactionsCart(pub).cartCheckOut(storeId, query, data as any, params);

export const getCheckOut = async ({ cache, id: _id, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'Checkout'),
		getLocalization(cache, context.locale || 'en-US', 'MultipleShipmentTable'),
		getLocalization(cache, context.locale || 'en-US', 'Shipping'),
		getLocalization(cache, context.locale || 'en-US', 'AddressForm'),
		getLocalization(cache, context.locale || 'en-US', 'Pickup'),
		getLocalization(cache, context.locale || 'en-US', 'OrderMethod'),
	]);
};

const validateProfileUsage = (profile: string | undefined, order: Order | undefined) => {
	// validate that shipping and payment info is present and tally is correct
	const used = !!(
		profile &&
		order?.orderItem?.every(({ shipModeId }) => shipModeId === order.orderItem[0].shipModeId) &&
		dFix(order?.grandTotal) ===
			dAdd(...(order?.paymentInstruction?.map(({ piAmount }) => piAmount) ?? []))
	);
	return used;
};

export const useCheckOut = () => {
	const { onCheckout } = useContext(EventsContext);
	const { settings } = useSettings();
	const { data, loading, error, mutateCart, orderItems } = useCart();
	const [activeStep, setActiveStep] = useState(() => 0);
	const [waiting, setWaiting] = useState<boolean>(false);
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const routes = useLocalization('Routes');
	const { notifyError } = useNotifications();
	const { storeLocator } = useStoreLocatorState();
	const selectedStoreName = storeLocator?.selectedStore?.storeName;
	const [bopisSelected, setBopisSelected] = useState<boolean>(selectedStoreName ? true : false);
	const steps = useMemo(() => (bopisSelected ? BOPIS_STEPS : DELIVERY_STEPS), [bopisSelected]);
	const [multiplePayment, setMultiPayment] = useState(1 < (data?.paymentInstruction?.length ?? 0));
	const profileId = useMemo(() => router.query.profile as string, [router.query.profile]);
	const profileUsed = useMemo(() => validateProfileUsage(profileId, data), [profileId, data]);
	const { data: profiles } = useSWR(
		profileUsed && storeId
			? [{ storeId, query: { langId, responseFormat: 'json' } }, DATA_KEY_CHECKOUT_PROFILES]
			: null,
		async ([props]) => checkoutProfilesFetcher(true)(props.storeId, props.query, params)
	);
	const profileList = useMemo(() => checkoutProfileMapper(profiles), [profiles]);

	const toggleMultiplePayment = () => setMultiPayment((previous: boolean) => !previous);
	const { data: usableShipping, mutate: mutateUsableShippingInfo } = useSWR(
		storeId ? [{ storeId, query: { langId } }, DATA_KEY_SHIPPING_INFO] : null,
		async ([{ storeId, query }]) => shippingInfoFetcher(true)(storeId, query, params)
	);
	const shipMethods = useMemo(() => getUniqueShippingMethods(usableShipping), [usableShipping]);

	const toggleBopis = (_event: React.MouseEvent<HTMLElement>, newValue: boolean) => {
		setActiveStep(0);
		setBopisSelected((selected) => {
			// check if an actual change was done -- if not, return previous value
			if (newValue === null) {
				return selected;
			} else {
				// check if we previously had bopis on -- if so, reset it
				if (selected) {
					resetBopis();
				}
				return newValue;
			}
		});
	};

	const back = useCallback(() => {
		if (profileUsed) {
			router.push(routes.Cart.route.t());
		} else {
			setActiveStep((currentStep) => currentStep - 1);
		}
	}, [profileUsed, router, routes]);

	const next = () => {
		setActiveStep((currentStep) => currentStep + 1);
	};

	const resetBopis = async () => {
		const shipModeId = shipMethods[0].shipModeId ?? '';
		const orderItem = orderItems.map(() => ({ shipModeId }));
		const body = { shipModeId, addressId: '', orderItem };

		try {
			await shippingInfoUpdateFetcher(settings?.storeId ?? '', {}, body, params);
			mutateCart();
		} catch (error) {
			console.error('Error in resetting bopis info', error);
			notifyError(processShippingInfoUpdateError(error as TransactionErrorResponse));
		}
	};

	const resolveProfilePayments = useCallback(
		async (reviewValues?: ReviewType) => {
			if (profileUsed && !isEmpty(reviewValues)) {
				const asMap = keyBy(profileList, 'xchkout_ProfileId');
				const profile = asMap[profileId];
				const { storeId = '', defaultLanguage: langId = '' } = settings;
				await profileBillingApplier({
					profile,
					order: data,
					storeId,
					langId,
					...reviewValues,
					params,
				});
			}
		},
		[profileUsed, profileList, profileId, settings, data, params]
	);

	const submit = useCallback(
		async (reviewValues?: ReviewType) => {
			if (!waiting) {
				setWaiting(true);
				try {
					await resolveProfilePayments(reviewValues);
					await preCheckout(true)(settings?.storeId as string, undefined, params);
					await checkout(true)(
						settings?.storeId as string,
						{
							notifyOrderSubmitted: '1',
							notifyMerchant: '1',
							notifyShopper: '1',
						},
						undefined,
						params
					);
					await router.push({
						pathname: routes.OrderConfirmation.route.t(),
						query: { orderId: data?.orderId ?? '' },
					});
					mutateCart();
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
				setWaiting(false);
				if (data) {
					onCheckout(data);
				}

				// GA events
				// if (mySite.enableGA) {
				// 	const storeName = mySite.storeName;
				// 	AsyncCall.sendCheckoutPageViewEvent(
				// 		{
				// 			pageSubCategory: 'Order Confirmation',
				// 			pathname: ROUTES.ORDER_CONFIRMATION,
				// 		},
				// 		{ enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
				// 	);
				// 	AsyncCall.sendPurchaseEvent(
				// 		{ cart, orderItems, entitledOrgs, activeOrgId, sellers, storeName },
				// 		{ enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
				// 	);
				// }
			}
		},
		[
			data,
			mutateCart,
			notifyError,
			onCheckout,
			router,
			routes,
			settings,
			waiting,
			resolveProfilePayments,
			params,
		]
	);

	useEffect(() => {
		scrollTo(0, 0);
	}, [activeStep]);

	return {
		steps,
		bopisSelected,
		toggleBopis,
		activeStep,
		setActiveStep,
		loading,
		error,
		data,
		mutateCart,
		orderItems,
		waiting,
		submit,
		next,
		back,
		usableShipping,
		mutateUsableShippingInfo,
		multiplePayment,
		toggleMultiplePayment,
		validateProfileUsage,
		profileUsed,
	};
};
