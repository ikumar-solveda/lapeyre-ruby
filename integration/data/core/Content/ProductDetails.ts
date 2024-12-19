/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FULFILLMENT_METHOD } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DEFAULT_SINGLE_RECORD } from '@/data/constants/price';
import { TYPES } from '@/data/constants/product';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLoginRedirectRequired } from '@/data/Content/_LoginRedirectRequired';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getPromo, usePromo } from '@/data/Content/_Promos';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { fetchDefaultWishlistOrCreateNew } from '@/data/Content/_Wishlists';
import { useWishRequisitionList } from '@/data/Content/_WishRequisitionList';
import {
	addToCartFetcherV2 as addToCartFetcher,
	BASE_ADD_2_CART_BODY,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { useExpectedDate } from '@/data/Content/ExpectedDate';
import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { getProduct, getProductByKeyType, useProduct } from '@/data/Content/Product';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useVolumePrice } from '@/data/Content/VolumePrice';
import { getVolumePrice } from '@/data/Content/VolumePrice-Server';
import { EventsContext } from '@/data/context/events';
import { StoreInventoryContext } from '@/data/context/storeInventory';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import type { ContentProps } from '@/data/types/ContentProps';
import type { Price, ProductType, Selection } from '@/data/types/Product';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { StoreDetails } from '@/data/types/Store';
import { useUser } from '@/data/User';
import { findOfferPrice } from '@/data/utils/findOfferPrice';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { getRangePriceValue } from '@/data/utils/getVolumePrice';
import {
	getAttrsByIdentifier,
	mapProductDetailsData,
	search,
} from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
export { getAttrsByIdentifier };

type Props = {
	partNumber: string;
	/** @deprecated use `physicalStore` instead */
	physicalStoreName?: string;
	physicalStore?: StoreDetails;
};

const fetchLocalization = async ({ cache, context }: ContentProps, productId: string) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getPromo(cache, productId, context),
		getLocalization(cache, locale, 'productDetail'),
		getLocalization(cache, locale, 'CommerceEnvironment'),
		getLocalization(cache, locale, 'PriceDisplay'),
		getLocalization(cache, locale, 'Common'),
		getLocalization(cache, locale, 'Inventory'),
		getLocalization(cache, locale, 'Subscriptions'),
		getLocalization(cache, locale, 'VolumePricing'),
	]);
};

export const getProductDetails = async ({ cache, id, context }: ContentProps) => {
	const partNumber = id.toString();
	let product = await getProduct(cache, partNumber, context);
	if (product?.type === 'item' && product.parentCatalogEntryID) {
		// get parent product
		product = await getProductByKeyType(cache, 'id', product.parentCatalogEntryID, context);
	} // remove inventory for edge cache
	await getFlexFlowStoreFeature({ cache, id: EMS_STORE_FEATURE.GUEST_SHOPPING, context });
	await fetchLocalization({ cache, id, context }, product?.id ?? '');
	await getVolumePrice({ cache, id, context });
};

export const useProductDetails = (props: Props) => {
	const { onProductView, onAddToCart, onAddToWishlist } = useContext(EventsContext);
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const wlNls = useLocalization('WishList');
	const success = useLocalization('success-message');
	const errorMessages = useLocalization('error-message');
	const { settings } = useSettings();
	const { user } = useUser();
	const currency = getCurrencyFromContext(user?.context);
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { partNumber: pnFromPage, physicalStore } = props;
	const { product: inputCE } = useProduct({ id: pnFromPage });
	const { loginStatus, redirectToLoginIfNeed: loginRequired } = useLoginRedirectRequired();
	const { product: root } = useProduct({
		id: inputCE?.parentCatalogEntryID,
		isCEId: true,
		condition: inputCE?.type === 'item',
	});
	const { selection: initial, product } = useMemo(
		() => mapProductDetailsData(inputCE, root),
		[inputCE, root]
	);
	const [productData, setProductData] = useState<ProductType>(product as ProductType);
	const [selection, setSelection] = useState<Selection>(initial as Selection);
	const { ga4, ua } = getGTMConfig(settings);
	const { category } = useCategory(
		ga4 || ua ? getParentCategoryFromSlashPath(product?.parentCatalogGroupID) : ''
	);
	const { promos } = usePromo(product?.id);
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const isGenericUser = user?.isGeneric ?? false;

	const { entitledPriceList, rangePriceList } = useVolumePrice({
		partNumber: [(selection ?? initial)?.sku?.partNumber ?? product?.partNumber ?? EMPTY_STRING],
	});

	const {
		availability,
		hasInventory,
		isLoading: isInventoryLoading,
	} = useInventoryV2({
		partNumber: (selection ?? initial)?.sku?.partNumber,
		physicalStore,
	});
	const { pickupInStoreShipMode, deliveryShipMode } = useAllowableShippingModes();
	const { wishLists, requisitionLists } = useWishRequisitionList();
	const { setOpen } = useContext(StoreInventoryContext);
	const [isDeliverySelected, setIsDeliverySelected] = useState<boolean>(() => !!deliveryShipMode);
	const useExpectedDateValue = useExpectedDate({ date: '' });
	const { scheduled, errorTimePicker } = useExpectedDateValue;

	const selectBox = useCallback(
		(name: string) => (_event: MouseEvent<HTMLElement>) =>
			setIsDeliverySelected(name !== FULFILLMENT_METHOD.PICKUP),
		[]
	);

	const onSelectStore = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			setOpen(true);
		},
		[setOpen]
	);

	/**
	 * Defining attribute change handler
	 * @param identifier new attribute identifier
	 * @param value new attribute value
	 */
	const onAttributeChange = useCallback(
		(identifier: string, value: string) => {
			if (product?.items) {
				setSelection((selection) => {
					const asAttrs = product.items.map((s) => getAttrsByIdentifier(s.definingAttributes));
					const fullAttr = {
						...(selection ?? initial).attrsByIdentifier,
						[identifier]: value,
					};
					const { exact, best } = search(fullAttr, identifier, asAttrs);
					let sku: ProductType | undefined = undefined;
					let attrsByIdentifier: Record<string, string> | undefined = undefined;

					if (exact !== -1) {
						attrsByIdentifier = fullAttr;
						sku = product.items[exact];
					} else if (best !== -1) {
						attrsByIdentifier = { ...asAttrs[best] };
						sku = product.items[best];
					} else {
						sku = {} as ProductType;
					}
					return {
						...(selection ?? initial),
						buyable: !!(sku?.buyable === STRING_TRUE),
						sku,
						attrsByIdentifier,
					};
				});
			}
		},
		[initial, product?.items]
	);

	const updateSkuWithRangeOfferPrice = useCallback(() => {
		setSelection((selection) => {
			const defaultPriceValue = findOfferPrice(selection?.sku?.price as Price[])?.value;
			return {
				...(selection ?? initial),
				sku: {
					...(selection?.sku as ProductType),
					productPrice: {
						...selection?.sku?.productPrice,
						offer: getRangePriceValue(selection?.quantity, rangePriceList, defaultPriceValue)
							?.rangePriceValue,
					},
				},
			};
		});
	}, [initial, rangePriceList]);

	const onQuantity = useCallback(
		(quantity: number | null) => {
			if (quantity === null) return;
			const updatedSelectionWithQuantity = (selection: Selection) => ({
				...(selection ?? initial),
				quantity: quantity ?? 0,
			});

			if (product?.type === TYPES.kit) {
				setSelection(updatedSelectionWithQuantity);
				setProductData((product) => {
					const defaultPrice = findOfferPrice(product?.price as Price[])?.value;
					return {
						...product,
						productPrice: {
							...product.productPrice,
							offer: getRangePriceValue(quantity, rangePriceList, defaultPrice)?.rangePriceValue,
						},
					};
				});
			} else {
				setSelection((selection) => {
					const sku = selection?.sku;
					const defaultPrice = findOfferPrice(sku?.price as Price[])?.value;
					return {
						...updatedSelectionWithQuantity(selection),
						sku: {
							...(sku as ProductType),
							productPrice: {
								...sku?.productPrice,
								offer: getRangePriceValue(quantity, rangePriceList, defaultPrice)?.rangePriceValue,
							},
						},
					};
				});
			}
		},
		[initial, product?.type, rangePriceList]
	);

	const validatedAvailability = useCallback(
		() =>
			isDeliverySelected
				? availability?.find((a) => a.status)
				: availability?.find((a) => a.physicalStoreId),
		[availability, isDeliverySelected]
	);

	const constructOrderItem = useCallback(
		(availability: ProductAvailabilityData) => {
			const { sku, quantity } = selection ?? initial;
			return {
				partNumber: sku?.partNumber,
				quantity: quantity.toString(),
				...(isDeliverySelected
					? { shipModeId: deliveryShipMode?.shipModeId }
					: {
							physicalStoreId: availability.physicalStoreId,
							shipModeId: pickupInStoreShipMode?.shipModeId,
					  }),
				...(scheduled.enabled ? { xitem_requestedShipDate: scheduled.date?.toISOString() } : null),
			};
		},
		[deliveryShipMode, scheduled, initial, isDeliverySelected, pickupInStoreShipMode, selection]
	);

	const validateAddToCart = useCallback(
		async () => (await loginRequired()) || errorTimePicker,
		[loginRequired, errorTimePicker]
	);

	const addToCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			if (await validateAddToCart()) {
				return;
			}
			event.preventDefault();
			event.stopPropagation();
			const { sku, quantity } = selection ?? initial;
			if (sku?.partNumber) {
				// the availability of online or physical store
				const avail = validatedAvailability();
				if (!isDeliverySelected && !avail) {
					showErrorMessage(errorMessages.SelectStoreToAddToCart.t());
					return;
				}

				const orderItem = constructOrderItem(avail as ProductAvailabilityData);

				const data = { ...BASE_ADD_2_CART_BODY, orderItem: [orderItem] };
				try {
					await addToCartFetcher(isGenericUser)(settings?.storeId ?? '', {}, data, params);
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
					showSuccessMessage(success.ITEM_TO_CART.t([product?.name ?? '']), true);

					onAddToCart({
						gtm: {
							selection,
							category,
							quantity,
							orgName: '', // TODO: specify selected org-name
							orgId: '', // TODO: specify selected org
							storeName: settings.storeName,
							settings,
						},
					});

					scrollTo(0, 0);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[
			validateAddToCart,
			selection,
			initial,
			validatedAvailability,
			isDeliverySelected,
			constructOrderItem,
			showErrorMessage,
			errorMessages,
			isGenericUser,
			settings,
			params,
			showSuccessMessage,
			success,
			product,
			onAddToCart,
			category,
			notifyError,
			currentCartSWRKey,
		]
	);

	const addToWishList = useCallback(
		(partNumber: string, quantity: number, wishList: WishlistWishlistItem) => async () => {
			try {
				const rc = await wishListUpdater(true)(
					settings?.storeId as string,
					wishList.uniqueID as string,
					{ item: [{ partNumber, quantityRequested: quantity.toString() } as any] },
					{ addItem: true },
					params
				);
				if (rc) {
					showSuccessMessage(success.WISHLIST_ADD_SUCCESS.t([wishList.description as string]));
				}
				product && onAddToWishlist(product, quantity);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			settings?.storeId,
			params,
			product,
			onAddToWishlist,
			showSuccessMessage,
			success.WISHLIST_ADD_SUCCESS,
			notifyError,
		]
	);

	const addToDefaultWishlist = useCallback(
		(partNumber: string, quantity: number) => async () => {
			try {
				const { wishlistId, wishlistName } = await fetchDefaultWishlistOrCreateNew(true)(
					settings?.storeId,
					undefined,
					wlNls.DefaultWishListName.t(),
					params
				);
				addToWishList(partNumber, quantity, {
					uniqueID: wishlistId,
					description: wishlistName,
				} as WishlistWishlistItem)();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[wlNls, settings?.storeId, params, addToWishList, notifyError]
	);

	const addToRequisitionList = useCallback(
		(requisitionListId: string) => async () => {
			const { sku, quantity } = selection ?? initial;
			if (sku?.partNumber) {
				try {
					await requisitionListItemUpdate(true)(
						{
							storeId: settings.storeId,
							langId,
							requisitionListId,
							data: { partNumber: sku.partNumber, quantity },
						},
						params
					);
					showSuccessMessage(success.addItemListSuccessfully.t({ v: sku.name }));
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[initial, notifyError, params, selection, settings.storeId, showSuccessMessage, success, langId]
	);

	/*
	useEffect(() => {
		if (addItemActionTriggered) {
			// GA360
			if (mySite.enableGA) {
				const storeName = mySite.storeName;
				AsyncCall.sendAddToCartEvent(
					{ cart, selection, breadcrumbs, sellers, storeName },
					{ enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
				);
			}
			setAddItemActionTriggered(false);
		}
	}, [cart, selection, breadcrumbs]);

	useEffect(() => {
		if (mySite.enableGA) {
			const storeName = mySite.storeName;
			if (selection && breadcrumbs.length !== 0) {
				AsyncCall.sendPDPPageViewEvent(breadcrumbs, {
					enableUA: mySite.enableUA,
					enableGA4: mySite.enableGA4,
				});
				AsyncCall.sendPDPDetailViewEvent(
					{ currentProdSelect: selection, breadcrumbs, sellers, storeName },
					{ enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 }
				);
			}
		}
	}, [breadcrumbs]);
	*/

	useEffect(() => {
		product &&
			(product.type !== TYPES.sku || !product.parentCatalogEntryID) &&
			onProductView({
				gtm: { product, storeName: settings.storeName, settings },
				marketing: {
					productId: product.id,
					settings,
					params,
				},
			});
	}, [onProductView, product]); // eslint-disable-line react-hooks/exhaustive-deps

	const productCurrency = product?.productPrice.currency;

	useEffect(() => {
		setSelection(initial as Selection);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langId, currency, productCurrency]);

	useEffect(() => {
		setIsDeliverySelected(!!deliveryShipMode);
	}, [deliveryShipMode]);

	useEffect(() => {
		if (rangePriceList?.length > DEFAULT_SINGLE_RECORD) {
			updateSkuWithRangeOfferPrice();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rangePriceList]);
	return {
		onQuantity,
		selection: selection ?? initial,
		product: productData,
		availability,
		onAttributeChange,
		addToWishList,
		addToCart,
		hasInventory,
		loginStatus,
		promos,
		wishLists,
		loginRequired,
		pickupInStoreShipMode,
		requisitionLists,
		addToRequisitionList,
		category,
		addToDefaultWishlist,
		isInventoryLoading,
		isDeliverySelected,
		selectBox,
		physicalStore,
		onSelectStore,
		deliveryShipMode,
		entitledPriceList,
		rangePriceList,
		useExpectedDateValue,
	};
};
