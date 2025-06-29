/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { useCartCoupons } from '@/data/Content/CartCoupons';
import { guestIdentityLoginFetcher } from '@/data/Content/GuestFetcher';
import { useNotifications } from '@/data/Content/Notifications';
import {
	addPaymentInstructionFetcher,
	deleteAllPaymentInstructionFetcher,
} from '@/data/Content/Payment';
import { DATA_KEY, fetcher, getCart, setAsPendingOrder } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { AVAILABLE_STATUSES } from '@/data/constants/inventory';
import { ORDER_CONFIGS, SHIP_MODE_CODE_PICKUP, UNITLESS_UNIT_ONE } from '@/data/constants/order';
import { COOKIE_GDPR_MANAGEMENT } from '@/data/constants/privacyPolicy';
import { EventsContext, EventsContextType } from '@/data/context/events';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import { GTMCartViewContextData } from '@/data/types/GTM';
import { Order, OrderItem } from '@/data/types/Order';
import { checkoutProfilePaymentConstructor } from '@/data/utils/checkoutProfilePaymentConstructor';
import { extractResponseError } from '@/data/utils/extractResponseError';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCookieName } from '@/data/utils/getCookieName';
import { expand, shrink } from '@/data/utils/keyUtil';
import { error as logError } from '@/data/utils/loggerUtil';
import { processError } from '@/data/utils/processError';
import type {
	CartRewardOption,
	ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer,
	ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsAssignedPromotionCode from 'integration/generated/transactions/transactionsAssignedPromotionCode';
import transactionsCart from 'integration/generated/transactions/transactionsCart';
import transactionsGuestIdentity from 'integration/generated/transactions/transactionsGuestIdentity';
import { isEmpty, partition } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import {
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';

export const BASE_ADD_2_CART_BODY = {
	orderId: '.',
	x_allocate: ORDER_CONFIGS.allocate,
	x_backorder: ORDER_CONFIGS.backOrder,
	x_remerge: ORDER_CONFIGS.remerge,
	x_check: ORDER_CONFIGS.check,
	x_calculateOrder: ORDER_CONFIGS.calculateOrder,
	x_calculationUsage: ORDER_CONFIGS.calculationUsage,
	x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
	orderItem: [],
};

export const BASE_ADD_2_CART_BODY_ALTERNATE = {
	orderId: '.',
	allocate: ORDER_CONFIGS.allocate,
	backorder: ORDER_CONFIGS.backOrder,
	remerge: ORDER_CONFIGS.remerge,
	check: ORDER_CONFIGS.check,
	calculateOrder: ORDER_CONFIGS.calculateOrder,
	calculationUsage: ORDER_CONFIGS.calculationUsage,
	inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
};

export type AddToCartResponse =
	ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer;

/** @deprecated  */
export const addToCartFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
		params: RequestParams
	) => {
		try {
			return await transactionsCart(pub).cartAddOrderItem(storeId, query, data, params);
		} catch (error) {
			const er = extractResponseError(error as TransactionErrorResponse);
			if (er?.errorKey === 'USR.CWXFR0130E' || er?.errorCode === 'CWXFR0268E') {
				// GuestIdentity need to pass in privacyNoticeVersion and marketingConsent
				const cookies = new Cookies();
				const _data = COOKIE_GDPR_MANAGEMENT.reduce((acc, name) => {
					const cValue = cookies.get(getCookieName({ name, storeId }));
					return { ...acc, ...(cValue !== undefined && { [name]: cValue }) };
				}, {});
				await transactionsGuestIdentity(true).guestIdentityLogin(
					storeId,
					{
						updateCookies: true,
					} as any,
					_data,
					params
				);
				return await transactionsCart(pub).cartAddOrderItem(storeId, query, data, params);
			} else {
				throw error;
			}
		}
	};

/**
 * @param isGenericUser - if true, will attempt to login as a guest user before adding to cart
 */
export const addToCartFetcherV2 =
	(isGenericUser = false) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
		params: RequestParams
	) => {
		if (isGenericUser) {
			await guestIdentityLoginFetcher(true)(storeId, params);
		}
		return await transactionsCart(true).cartAddOrderItem(storeId, query, data, params);
	};

export const updateCartFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription,
		params: RequestParams
	) =>
		await transactionsCart(pub).cartUpdateOrderItem(storeId, query, data, params);

export const promoCodeApplicator =
	(pub: boolean) =>
	async (
		storeId: string,
		promoCode: string,
		query: { [key: string]: string | boolean | ID[] | number } = {},
		params: RequestParams
	) =>
		await transactionsAssignedPromotionCode(pub).cartSelfAssignedPromotionCodeCreate(
			storeId,
			{ promoCode },
			query,
			params
		);
// TODO: Promotion defect HCLRUBY-164
export const promoCodeRemover =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		promoCode: string,
		query: { [key: string]: string | boolean | ID[] | number } = {},
		params: RequestParams
	) => {
		try {
			return await transactionsAssignedPromotionCode(pub).cartSelfAssignedPromotionCodeDelete(
				storeId,
				promoCode,
				query,
				params
			);
		} catch (e) {
			logError(context?.req, 'Cart: promoCodeRemover: error: %o', e);
			return undefined;
		}
	};

type ProfileApplierProps = {
	profile: PersonCheckoutProfilesItem;
	order?: Order;
	storeId?: string;
	langId?: string;
	cvv?: string;
	params: RequestParams;
};

export const profileBillingApplier = async ({
	profile,
	order,
	storeId = '',
	langId = '',
	cvv,
	params,
}: ProfileApplierProps) => {
	await deleteAllPaymentInstructionFetcher(true)(storeId, { langId }, params);
	await addPaymentInstructionFetcher(true)(
		storeId,
		{ langId },
		checkoutProfilePaymentConstructor(order as Order, profile, cvv),
		params
	);
	return await fetcher(true)(storeId, { langId, sortOrder: 'desc' }, params);
};

const profileShippingApplier = async ({
	profile,
	storeId = '',
	langId = '',
	params,
}: ProfileApplierProps) => {
	const data = {
		toOrderId: '.',
		payInfoFrom: profile.xchkout_ProfileId,
		shippingAddressFromOrderProfile: '1',
		shippingModeFromOrderProfile: '1',
	};
	const calculationUsageId: any = ORDER_CONFIGS.calculationUsage.split(',');

	// copy profile info into order (clean payments first), calculate and add payment-info
	await transactionsCart(true).cartCopyOrder(storeId, undefined, data, params);
	await transactionsCart(true).cartCalculateOrder1(
		storeId,
		undefined,
		{ calculationUsageId },
		params
	);
	return await fetcher(true)(storeId, { langId, sortOrder: 'desc' }, params);
};

const getCount = (items?: OrderItem[]) =>
	items?.reduce(
		(previousCount, orderItem) =>
			orderItem.UOM === UNITLESS_UNIT_ONE
				? previousCount + dFix(orderItem.quantity ?? '0', 0)
				: previousCount + 1,
		0
	) ?? 0;

export type PromoCodeState = {
	code?: string;
	error: boolean;
};

export const useCartSWRKey = (): [any, string] | null => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	return storeId ? [shrink({ storeId, query: { langId, sortOrder: 'desc' } }), DATA_KEY] : null;
};

export const useCart = () => {
	const { onCartView, onCartPageView, onEmptyCart } = useContext(EventsContext);
	const router = useNextRouter();
	const { user } = useUser();
	const [promoCode, setPromoCode] = useState<PromoCodeState>({ code: '' } as PromoCodeState);
	const { settings } = useSettings();
	const swrKey = useCartSWRKey();
	const localRoutes = useLocalization('Routes');
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const {
		data: cart,
		error,
		mutate,
		isValidating,
		isLoading,
	} = useSWR(
		swrKey,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, query } = expanded;
			return fetcher(true)(storeId, query, params);
		},
		{ revalidateOnFocus: false }
	);
	const [waiting, setWaiting] = useState<boolean>(false);

	const [data, setData] = useState<Order | undefined>(() => cart);
	const count = useMemo(() => getCount(data?.orderItem), [data?.orderItem]);
	const {
		activeIssuedCoupons,
		activeAppliedCoupons,
		couponAppliedAction,
		assignedCouponRemoverAction,
	} = useCartCoupons();

	const checkoutByType = useCallback(
		async (profile?: PersonCheckoutProfilesItem) => {
			setWaiting(true);
			try {
				let query;
				if (profile) {
					const { storeId, defaultLanguage: langId } = settings;
					let order = await profileShippingApplier({ profile, storeId, params });
					order = await profileBillingApplier({ profile, order, langId, storeId, params });
					await mutate(order);
					query = { profile: profile.xchkout_ProfileId };
				}
				await router.push({ pathname: localRoutes.CheckOut.route.t(), query });
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			} finally {
				setWaiting(false);
			}
		},
		[router, localRoutes, settings, params, mutate, notifyError]
	);

	const checkoutCommon = useCallback(
		async (profile?: PersonCheckoutProfilesItem) => {
			const isLoggedIn = user?.isLoggedIn ?? false;
			if (isLoggedIn) {
				await checkoutByType(profile);
			} else {
				router.push({ pathname: localRoutes.Login.route.t(), query: { flow: 'checkout' } });
			}
		},
		[localRoutes, router, user, checkoutByType]
	);
	const checkout = useCallback(async () => await checkoutCommon(), [checkoutCommon]);
	const onFullCartCheckout = useCallback(
		(profile?: PersonCheckoutProfilesItem) => async () => await checkoutCommon(profile),
		[checkoutCommon]
	);

	const continueShopping = () => router.push('/');

	const canContinue = () => !waiting;

	const _applyPromoCode = async () => {
		if (promoCode.code) {
			try {
				await promoCodeApplicator(true)(
					settings?.storeId as string,
					promoCode.code as string,
					undefined,
					params
				);
				onResetPromoCodeError();
				mutate();
			} catch (e) {
				setPromoCode((prev) => ({ ...prev, error: true }));
				notifyError(processError(e as TransactionErrorResponse));
				return e as TransactionErrorResponse;
			}
		}
	};

	const onPromoCodeRemove = async (code?: string) => {
		const rc = await promoCodeRemover(true)(
			settings?.storeId as string,
			code as string,
			undefined,
			params
		);
		if (!rc) {
			setPromoCode((prev) => ({ ...prev, error: true }));
		} else {
			onResetPromoCodeError();
			mutate();
		}
	};

	const onPromoCodeApply = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		_applyPromoCode();
	};

	const onPromoCodeApplyByKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			_applyPromoCode();
		}
	};

	// state updaters
	const onPromoCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setPromoCode((prev) => ({ ...prev, code: e.target.value }));
	const onResetPromoCodeError = () => setPromoCode((prev) => ({ ...prev, code: '', error: false }));

	const onCartPageViewEvent = useCallback(
		() =>
			onCartPageView({
				gtm: {
					pagePath: router.asPath,
					isLoggedIn: !!user?.isLoggedIn,
					userId: user?.userId as string,
					orgName: '', // TODO: specify selected org-name
					orgId: '', // TODO: specify selected org
					storeName: settings.storeName,
					settings,
				},
			}),
		[onCartPageView, router.asPath, settings, user]
	);

	const onCartViewEvent = useCallback(
		(eventData: EventsContextType['eventData']) => {
			if (data) {
				const { orderItem: orderItems } = data;
				if (!orderItems?.length) {
					onEmptyCart();
				} else {
					const contextData: Record<string, GTMCartViewContextData> = eventData['onCartView'];
					const allFetched = orderItems.every(
						({ orderItemId }) =>
							contextData?.[orderItemId]?.product && contextData[orderItemId].category
					);
					if (allFetched) {
						onCartView({
							gtm: {
								cart: data,
								contextData,
								orgName: '', // TODO: specify selected org-name
								orgId: '', // TODO: specify selected org
								storeName: settings.storeName,
								settings,
							},
						});
					}
				}
			}
		},
		[data, onCartView, onEmptyCart, settings]
	);

	useEffect(() => {
		// old invocations of cart may arrive later than newer ones -- here, we update `data`
		//   only if `lastUpdateDate` is greater than or equal to a previously stored value --
		//   ideally we should only update on greater than values, but updates within the same
		//   millisecond time-frame are still possible so we will allow that -- alternatively
		//   we could do a more granular check of the cart, e.g., check orderItem counts, check
		//   quantity counts, partNumber differences, etc. but that is probably not warranted
		if (
			isEmpty(data) ||
			isEmpty(cart) ||
			cart.lastUpdateDate >= data.lastUpdateDate ||
			cart.orgUniqueID !== data.orgUniqueID ||
			cart.orderId !== data.orderId
		) {
			setData(cart);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	const [pickupOrderItems, deliveryOrderItems] = useMemo(
		() => partition(data?.orderItem ?? [], (e) => e.shipModeCode === SHIP_MODE_CODE_PICKUP),
		[data]
	);

	const { pickupOnly, deliveryOnly } = useMemo(
		() => ({
			pickupOnly:
				data?.orderItem &&
				!data.orderItem.some((item) => item && item.shipModeCode !== SHIP_MODE_CODE_PICKUP),
			deliveryOnly:
				data?.orderItem &&
				!data.orderItem.some((item) => item && item.shipModeCode === SHIP_MODE_CODE_PICKUP),
		}),
		[data]
	);

	const physicalStoreIdInCart = useMemo(
		() =>
			// assume pickup items from same store
			pickupOrderItems.at(0)?.physicalStoreId,
		[pickupOrderItems]
	);

	const pickupOrderItemsFromOtherStore = useMemo(
		// this can happen when merge cart from a guest shopper,
		// this also get extended to handle when detecting items out of stock.
		() =>
			pickupOrderItems.filter(
				(item) =>
					item.physicalStoreId !== physicalStoreIdInCart || // different pickup store resulting from merge cart.
					!AVAILABLE_STATUSES[item.orderItemInventoryStatus] // out of stock
			),
		[physicalStoreIdInCart, pickupOrderItems]
	);

	const onCouponApply = useCallback(
		(couponId?: string | undefined) => async (_event: MouseEvent<HTMLElement>) => {
			if (couponId) {
				await couponAppliedAction(couponId)();
			}
		},
		[couponAppliedAction]
	);

	const onAssignedCouponRemoved = useCallback(
		(couponId?: string | undefined) => async (_event: MouseEvent<HTMLElement>) => {
			if (couponId) {
				await assignedCouponRemoverAction(couponId)();
			}
		},
		[assignedCouponRemoverAction]
	);

	const validateIfBillingInstructionsAreStale = useCallback(async () => {
		let isBillingInstructionsStale = false;
		if (data?.paymentInstruction?.length) {
			const totalAmountOfPaymentInstructions = data.paymentInstruction.reduce(
				(paymentInstructionTotal, paymentInstruction) =>
					paymentInstructionTotal + dFix(paymentInstruction.piAmount),
				0
			);
			if (
				data.totalProductPrice &&
				dFix(data.totalProductPrice) !== totalAmountOfPaymentInstructions
			) {
				await deleteAllPaymentInstructionFetcher(true)(
					settings?.storeId,
					{ langId: settings?.defaultLanguage },
					params
				);
				isBillingInstructionsStale = true;
				mutate();
			}
		}

		return isBillingInstructionsStale;
	}, [data, mutate, params, settings]);

	return {
		data,
		orderItems: data?.orderItem as OrderItem[],
		rewardOptions: data?.rewardOption as CartRewardOption[],
		mutateCart: mutate,
		count,
		onFullCartCheckout,
		checkout,
		canContinue,
		continueShopping,
		onPromoCodeRemove,
		onPromoCodeApply,
		onPromoCodeApplyByKey,
		onPromoCodeChange,
		onResetPromoCodeError,
		promoCode,
		loading: !error && !data,
		// the `loading` is against data state, which does not reflect the true loading state of cart.
		error,
		getCount,
		onCartPageViewEvent,
		onCartViewEvent,
		physicalStoreIdInCart,
		pickupOrderItemsFromOtherStore,
		pickupOrderItems,
		deliveryOrderItems,
		isFetchingCart: isValidating || isLoading,
		pickupOnly,
		deliveryOnly,
		onAssignedCouponRemoved,
		onCouponApply,
		activeIssuedCoupons,
		activeAppliedCoupons,
		validateIfBillingInstructionsAreStale,
	};
};

export { getCart, setAsPendingOrder };
