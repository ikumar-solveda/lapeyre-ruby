/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { profileBillingApplier, useCart } from '@/data/Content/Cart';
import { useCheckOutSteps } from '@/data/Content/CheckOutSteps';
import { checkoutProfilesFetcher } from '@/data/Content/CheckoutProfiles';
import { useNotifications } from '@/data/Content/Notifications';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useCheckoutEvents } from '@/data/Content/_CheckoutEvents';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { shippingInfoFetcher } from '@/data/Content/_ShippingInfo';
import { submitRecurringOrSubscription } from '@/data/Content/_Subscription';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	DATA_KEY_CHECKOUT_PROFILES,
	DATA_KEY_PAYMENT_INFO,
	DATA_KEY_SHIPPING_INFO,
} from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { RECURRING_ORDER_OPTIONS } from '@/data/constants/recurringOrder';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { Order } from '@/data/types/Order';
import { PurchaseOrderContext } from '@/data/types/PurchaseOrder';
import { RequestQuery } from '@/data/types/RequestQuery';
import { checkoutProfileMapper } from '@/data/utils/checkoutProfileMapper';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { orderHistoryMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/orderHistoryMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { validateProfileUsage } from '@/data/utils/validateProfileUsage';
import { transactionsCart } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { isEmpty, keyBy } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
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
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getLocalization(cache, locale, 'Checkout'),
		getLocalization(cache, locale, 'MultipleShipmentTable'),
		getLocalization(cache, locale, 'Shipping'),
		getLocalization(cache, locale, 'AddressForm'),
		getLocalization(cache, locale, 'Pickup'),
		getLocalization(cache, locale, 'OrderMethod'),
		getLocalization(cache, locale, 'FreeGift'),
	]);
};

export const useCheckOutV2 = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const {
		data,
		loading,
		error,
		mutateCart,
		orderItems,
		rewardOptions,
		pickupOrderItems,
		deliveryOrderItems,
	} = useCart();
	const [activeStep, setActiveStep] = useState(() => 0);
	const canUsePersonal = useMemo(
		() => data?.x_isPersonalAddressesAllowedForShipping?.toLowerCase() === 'true',
		[data]
	);
	const {
		recurringOrderInfo,
		actions: { resetRecurringOrderDetails },
	} = useRecurringOrderState();
	const { isRecurring, frequency, startDate, endDate } = recurringOrderInfo;

	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const routes = useLocalization('Routes');
	const { notifyError } = useNotifications();
	const { steps, profileUsed, profileId } = useCheckOutSteps();
	const { onPurchaseEvent, onCheckoutEvent } = useCheckoutEvents({
		cart: data as Order,
		settings,
		activeStep,
		steps,
	});
	const [multiplePayment, setMultiPayment] = useState(1 < (data?.paymentInstruction?.length ?? 0));
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
		async ([{ storeId, query }]) => shippingInfoFetcher(true)(storeId, query, params),
		{ revalidateOnMount: true }
	);
	const [poContext, setPOContext] = useState<PurchaseOrderContext>({ value: '' });
	const poRequired = useMemo(() => data?.x_isPurchaseOrderNumberRequired === 'true', [data]);

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
			try {
				await resolveProfilePayments(reviewValues);
				await preCheckout(true)(settings?.storeId as string, undefined, params);
				const purchaseorder_id = poRequired ? poContext.value : undefined;
				const purchaseOrder: Record<string, any> = { purchaseorder_id };
				if (isRecurring) {
					const selectedRecurringOptions = RECURRING_ORDER_OPTIONS.find(
						({ value }) => frequency === value
					);
					const { fulfillmentInterval, fulfillmentIntervalUOM } = selectedRecurringOptions ?? {};
					await submitRecurringOrSubscription(true)(
						settings?.storeId,
						data?.orderId as string,
						{ ...purchaseOrder },
						{
							fulfillmentInterval,
							fulfillmentIntervalUOM,
							startDate,
							endDate,
							...purchaseOrder,
						},
						params
					);
					resetRecurringOrderDetails();
				} else {
					await checkout(true)(
						settings?.storeId as string,
						{
							notifyOrderSubmitted: '1',
							notifyMerchant: '1',
							notifyShopper: '1',
							...purchaseOrder,
						},
						undefined,
						params
					);
				}

				await router.push({
					pathname: routes.OrderConfirmation.route.t(),
					query: { orderId: data?.orderId ?? '' },
				});
				mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
				mutate(orderHistoryMutatorKeyMatcher(EMPTY_STRING), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
			if (data) {
				onPurchaseEvent();
			}
			return true;
		},
		[
			data,
			resolveProfilePayments,
			settings,
			params,
			poRequired,
			poContext.value,
			router,
			routes,
			notifyError,
			onPurchaseEvent,
			isRecurring,
			startDate,
			endDate,
			frequency,
			resetRecurringOrderDetails,
		]
	);

	const onPOChange = useCallback(
		(dirty?: boolean) => (event: ChangeEvent<HTMLInputElement>) => {
			setPOContext((old) => ({
				...old,
				dirty: old.dirty ?? dirty,
				value: event.target.value,
				error: !event.target.value,
			}));
		},
		[]
	);

	const validatePO = useCallback(() => {
		let rc = true;
		if (poRequired) {
			const { value } = poContext;
			rc = !!value.trim();
			onPOChange(true)({ target: { value } } as ChangeEvent<HTMLInputElement>);
		}
		return rc;
	}, [onPOChange, poContext, poRequired]);

	useEffect(() => {
		scrollTo(0, 0);
	}, [activeStep]);

	useEffect(() => {
		onCheckoutEvent();
	}, [activeStep, onCheckoutEvent]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		// refetch payment-info (once)
		mutate(generateKeyMatcher({ [DATA_KEY_PAYMENT_INFO]: true })(EMPTY_STRING), undefined);
	}, []);

	return {
		steps,
		activeStep,
		setActiveStep,
		loading,
		error,
		data,
		mutateCart,
		orderItems,
		pickupOrderItems,
		deliveryOrderItems,
		submit,
		next,
		back,
		usableShipping,
		mutateUsableShippingInfo,
		multiplePayment,
		toggleMultiplePayment,
		validateProfileUsage,
		profileUsed,
		onPOChange,
		poContext,
		poRequired,
		validatePO,
		isGuest: !user?.isLoggedIn,
		rewardOptions,
		isRecurring,
		canUsePersonal,
	};
};
