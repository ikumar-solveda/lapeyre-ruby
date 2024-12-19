/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	BASE_ADD_2_CART_BODY,
	addToCartFetcherV2 as addToCartFetcher,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { addToCartAndApplyPromotion } from '@/data/Content/_Cart';
import { couponIssuer } from '@/data/Content/_Coupon';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLoginRedirectRequired } from '@/data/Content/_LoginRedirectRequired';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { fetchDefaultWishlistOrCreateNew } from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { INVALID_PROMOTION_CODE_KEY } from '@/data/constants/errors';
import { CONTENT_ACTIONS, EMPTY_STRING } from '@/data/constants/marketing';
import { DEFAULT_WISHLIST_PRODUCT_QUANTITY } from '@/data/constants/wishlist';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ParsedContentURL } from '@/data/types/Marketing';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { getAttrsByIdentifier } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';

const EMPTY_OBJECT = {};

export const useContentClickActionDetails = () => {
	const { onAddToCart, onAddToWishlist } = useContext(EventsContext);
	const { settings } = useSettings();
	const { storeId, storeName } = settings;
	const success = useLocalization('success-message');
	const errorMessages = useLocalization('error-message');
	const router = useNextRouter();
	const wlLoc = useLocalization('WishList');
	const route = useLocalization('Routes');
	const { user } = useUser();
	const { showSuccessMessage, notifyError, showErrorMessage } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const params = useExtraRequestParameters();
	const [partNumber, setPartNumber] = useState<string>('');
	const [categoryId, setCategoryId] = useState<string>('');
	const [postAction, setPostAction] = useState<ParsedContentURL>();
	const GTM = useMemo(() => getGTMConfig(settings), [settings]);
	const { product } = useProduct({ id: partNumber });
	const { category } = useCategory(categoryId);
	const { redirectToLoginIfNeed } = useLoginRedirectRequired();
	const isGenericUser = user?.isGeneric ?? false;

	/** Add To Shopping Cart */
	const addToCartAction = useCallback(
		async (linkAction: ParsedContentURL, event: MouseEvent) => {
			event.preventDefault();
			try {
				if (!(await redirectToLoginIfNeed())) {
					const { partNumber, quantity: _quantity } = linkAction;
					const orderItem = [{ partNumber, quantity: _quantity }];
					const data = { ...BASE_ADD_2_CART_BODY, orderItem };

					await addToCartFetcher(isGenericUser)(storeId, {}, data, params);
					if (isGenericUser) {
						await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
						await mutate(
							personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC),
							undefined
						);
					}
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages

					// notification
					const quantity = dFix(_quantity, 0);
					showSuccessMessage(success.ITEMS_N_TO_CART.t([quantity]), true);
					scrollTo(0, 0);

					const { ga4, ua } = GTM;
					if (ga4 || ua) {
						setPartNumber(partNumber);
						setPostAction(linkAction);
					}
				}
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			GTM,
			notifyError,
			params,
			redirectToLoginIfNeed,
			showSuccessMessage,
			storeId,
			success,
			isGenericUser,
			currentCartSWRKey,
		]
	);

	/** Add To Shopping Cart And Apply Promotion */
	const addToCartAndApplyPromotionAction = useCallback(
		async (linkAction: ParsedContentURL, _event: MouseEvent) => {
			const { partNumber, quantity, promoCode } = linkAction;
			try {
				if (!(await redirectToLoginIfNeed())) {
					await addToCartAndApplyPromotion(isGenericUser)(
						storeId,
						{ partNumber, quantity, promoCode },
						params
					);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined);
					showSuccessMessage(
						success.ITEMS_N_TO_CART_AND_COUPON_APPLIED.t([dFix(quantity, 0)]),
						true
					);
					const { ga4, ua } = GTM;
					if (ga4 || ua) {
						setPartNumber(partNumber);
						setPostAction(linkAction);
					}
				}
			} catch (e) {
				const errorResponse = e as TransactionErrorResponse;
				if (errorResponse?.error.errors[0].errorKey === INVALID_PROMOTION_CODE_KEY) {
					showErrorMessage(errorMessages.INVALID_PROMOTION_CODE.t());
				} else {
					notifyError(processError(errorResponse));
				}
			}
		},
		[
			GTM,
			currentCartSWRKey,
			errorMessages.INVALID_PROMOTION_CODE,
			isGenericUser,
			notifyError,
			params,
			redirectToLoginIfNeed,
			showErrorMessage,
			storeId,
			success,
			showSuccessMessage,
		]
	);

	/** Add To Wish List */
	const addToWishlistAction = useCallback(
		async (linkAction: ParsedContentURL, event: MouseEvent) => {
			event.preventDefault();
			if (!user?.isLoggedIn) {
				router.push({ pathname: route.Login.route.t() });
				return;
			}
			const { partNumber } = linkAction;
			try {
				const { wishlistId, wishlistName } = await fetchDefaultWishlistOrCreateNew(true)(
					storeId,
					undefined,
					wlLoc.DefaultWishListName.t(),
					params
				);
				const rc = await wishListUpdater(true)(
					storeId,
					wishlistId,
					{ item: [{ partNumber, quantityRequested: DEFAULT_WISHLIST_PRODUCT_QUANTITY } as any] },
					{ addItem: true },
					params
				);
				if (rc) {
					showSuccessMessage(success.WISHLIST_ADD_SUCCESS.t([wishlistName]));
				}

				router.push({ pathname: route.WishLists.route.t(), query: { id: wishlistId } });
				setPartNumber(partNumber);
				setPostAction(linkAction);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[user, wlLoc, storeId, params, router, route, showSuccessMessage, success, notifyError]
	);

	/** Issue Coupon */
	const issueCouponsAction = useCallback(
		async (linkAction: ParsedContentURL, event: MouseEvent) => {
			event.preventDefault();
			if (!user?.isLoggedIn) {
				router.push({ pathname: route.Login.route.t() });
				return;
			}
			const { promotionName } = linkAction;
			const promotionNameForSuccessMessage = promotionName.replace(/-\d+$/, EMPTY_STRING);
			const query = EMPTY_OBJECT;
			try {
				await couponIssuer(true)({ storeId, query, promotionName, params });
				showSuccessMessage(success.COUPON_ADDED_SUCCESS.t([promotionNameForSuccessMessage]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, params, route, router, showSuccessMessage, storeId, success, user]
	);

	/** Display Discount Details */
	const redirectToDiscountDetailsPage = useCallback(
		(parsedContent: ParsedContentURL) => {
			router.push({
				pathname: route.CouponDetails.route.t(),
				query: { code: parsedContent?.code ?? '' },
			});
		},
		[router, route]
	);

	// for event-data fetching using SWR
	useEffect(() => {
		// fetch pre-reqs before handling actions
		if (product && !category) {
			setCategoryId(getParentCategoryFromSlashPath(product?.parentCatalogGroupID));
		}

		// action handling
		if (
			(postAction?.action === CONTENT_ACTIONS.addToCartAction ||
				postAction?.action === CONTENT_ACTIONS.addToCartAndApplyPromotionAction) &&
			product &&
			category
		) {
			const quantity = dFix(postAction.quantity, 0);
			const attrsByIdentifier = getAttrsByIdentifier(product.attributes);
			onAddToCart({
				gtm: {
					selection: { sku: product, quantity, attrsByIdentifier, buyable: true },
					category,
					quantity,
					orgName: '', // TODO: specify selected org-name
					orgId: '', // TODO: specify selected org
					storeName,
					settings,
				},
			});
			setPostAction(undefined);
		} else if (postAction?.action === CONTENT_ACTIONS.addToWishListAction && product) {
			onAddToWishlist(product, dFix(DEFAULT_WISHLIST_PRODUCT_QUANTITY, 0));
			setPostAction(undefined);
		}
	}, [postAction, product, category, onAddToCart, storeName, settings, onAddToWishlist]);

	return {
		addToCartAction,
		addToWishlistAction,
		issueCouponsAction,
		addToCartAndApplyPromotionAction,
		redirectToDiscountDetailsPage,
	};
};
