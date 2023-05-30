/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR from 'swr';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import {
	transactionsAssignedPromotionCode,
	transactionsCart,
	transactionsGuestIdentity,
} from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import {
	ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer,
	ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription,
} from 'integration/generated/transactions/data-contracts';
import {
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { ORDER_CONFIGS, UNITLESS_UNIT_ONE } from '@/data/constants/order';
import { extractResponseError } from '@/data/utils/extractResponseError';
import { DATA_KEY, fetcher, getCart } from '@/data/Content/_Cart';
import { Order, OrderItem } from '@/data/types/Order';
import { dFix } from '@/data/utils/floatingPoint';
import { useLocalization } from '@/data/Localization';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { processError } from '@/data/utils/processError';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import {
	addPaymentInstructionFetcher,
	deleteAllPaymentInstructionFetcher,
} from '@/data/Content/Payment';
import { checkoutProfilePaymentConstructor } from '@/data/utils/checkoutProfilePaymentConstructor';
import { isEmpty } from 'lodash';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

export const BASE_ADD_2_CART_BODY = {
	orderId: '.',
	x_calculateOrder: ORDER_CONFIGS.calculateOrder,
	x_calculationUsage: ORDER_CONFIGS.calculationUsage,
	x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
	orderItem: [],
};

export type AddToCartResponse =
	ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer;

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
				await transactionsGuestIdentity(true).guestIdentityLogin(
					storeId,
					{
						updateCookies: true,
					} as any,
					undefined,
					params
				);
				return await transactionsCart(pub).cartAddOrderItem(storeId, query, data, params);
			} else {
				throw error;
			}
		}
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
	(pub: boolean) =>
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
			console.log(e);
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

export type PromoCodeState = {
	code?: string;
	error: boolean;
};

export const useCart = () => {
	const router = useNextRouter();
	const { user } = useUser();
	const [promoCode, setPromoCode] = useState<PromoCodeState>({ code: '' } as PromoCodeState);
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const localRoutes = useLocalization('Routes');
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const {
		data: cart,
		error,
		mutate,
	} = useSWR(
		storeId ? [{ storeId, query: { langId, sortOrder: 'desc' } }, DATA_KEY] : null,
		async ([{ storeId, query }]) => fetcher(true)(storeId, query, params),
		{ revalidateOnFocus: false }
	);
	const [waiting, setWaiting] = useState<boolean>(false);
	const getCount = useCallback(
		(items?: OrderItem[]) =>
			items?.reduce(
				(previousCount, orderItem) =>
					orderItem.UOM === UNITLESS_UNIT_ONE
						? previousCount + dFix(orderItem.quantity ?? '0', 0)
						: previousCount + 1,
				0
			) ?? 0,
		[]
	);
	const [data, setData] = useState<Order>();
	const count = useMemo(() => getCount(data?.orderItem), [data?.orderItem, getCount]);

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
				router.push({ pathname: localRoutes.CheckOut.route.t(), query });
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			} finally {
				setWaiting(false);
			}
		},
		[router, localRoutes, settings, params, mutate, notifyError]
	);

	const checkoutCommon = useCallback(
		(profile?: PersonCheckoutProfilesItem) => {
			const isLoggedIn = user?.isLoggedIn ?? false;
			if (isLoggedIn) {
				checkoutByType(profile);
			} else {
				router.push({ pathname: localRoutes.Login.route.t(), query: { flow: 'checkout' } });
			}
		},
		[localRoutes, router, user, checkoutByType]
	);
	const checkout = useCallback(() => checkoutCommon(), [checkoutCommon]);
	const onFullCartCheckout = useCallback(
		(profile?: PersonCheckoutProfilesItem) => () => checkoutCommon(profile),
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

	useEffect(() => {
		// old invocations of cart may arrive later than newer ones -- here, we update `data`
		//   only if `lastUpdateDate` is greater than or equal to a previously stored value --
		//   ideally we should only update on greater than values, but updates within the same
		//   millisecond time-frame are still possible so we will allow that -- alternatively
		//   we could do a more granular check of the cart, e.g., check orderItem counts, check
		//   quantity counts, partNumber differences, etc. but that is probably not warranted
		if (isEmpty(data) || isEmpty(cart) || cart.lastUpdateDate >= data.lastUpdateDate) {
			setData(cart);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	return {
		data,
		orderItems: data?.orderItem as OrderItem[],
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
		error,
		getCount,
	};
};

export { getCart };
