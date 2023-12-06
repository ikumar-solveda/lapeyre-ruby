/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getInventory, useInventory } from '@/data/Content/_Inventory';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getPromo, usePromo } from '@/data/Content/_Promos';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { useWishRequisitionList } from '@/data/Content/_WishRequisitionList';
import { addToCartFetcher, BASE_ADD_2_CART_BODY, useCart } from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { useNotifications } from '@/data/Content/Notifications';
import { getProduct, getProductByKeyType, useProduct } from '@/data/Content/Product';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { getLocalization, useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Breadcrumb } from '@/data/types/Breadcrumb';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductType, Selection, SellerInfo } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { useUser } from '@/data/User';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import {
	getAttrsByIdentifier,
	mapProductDetailsData,
	search,
} from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
export { getAttrsByIdentifier };

type Props = {
	partNumber: string;
	physicalStoreName?: string;
};

const fetchLocalization = async ({ cache, context }: ContentProps, productId: string) =>
	await Promise.all([
		getPromo(cache, productId, context),
		getLocalization(cache, context.locale || 'en-US', 'productDetail'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'PriceDisplay'),
		getLocalization(cache, context.locale || 'en-US', 'Common'),
	]);

export const getProductDetails = async ({ cache, id, context }: ContentProps) => {
	const partNumber = id.toString();
	let product = await getProduct(cache, partNumber, context);
	if (product?.type === 'item' && product.parentCatalogEntryID) {
		// get parent product
		product = await getProductByKeyType(cache, 'id', product.parentCatalogEntryID, context);
		// get inventory for self
		await getInventory(cache, product?.partNumber ?? '', context);
	} else if (product?.type === 'product' || product?.type === 'variant') {
		// get inventory for first SKU
		await getInventory(cache, product.items?.at(0)?.partNumber as string, context);
	}
	await fetchLocalization({ cache, id, context }, product?.id ?? '');
};

export const useProductDetails = (props: Props) => {
	const { onProductView, onAddToCart, onAddToWishlist } = useContext(EventsContext);
	const { showSuccessMessage, notifyError } = useNotifications();

	const success = useLocalization('success-message');
	const routes = useLocalization('Routes');
	const { user } = useUser();
	const context = useMemo(() => user?.context, [user]);
	const { settings } = useSettings();
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { mutateCart } = useCart();
	const { partNumber: pnFromPage, physicalStoreName } = props;
	const { product: inputCE } = useProduct({ id: pnFromPage });
	const { product: root } = useProduct({
		id: inputCE?.parentCatalogEntryID,
		isCEId: true,
		condition: inputCE?.type === 'item',
	});
	const { selection: initial, product } = useMemo(
		() => mapProductDetailsData(inputCE, root),
		[inputCE, root]
	);
	const [selection, setSelection] = useState<Selection>(initial as Selection);
	const { ga4, ua } = getGTMConfig(settings);
	const { category } = useCategory(
		ga4 || ua ? getParentCategoryFromSlashPath(product?.parentCatalogGroupID) : ''
	);
	const { promos } = usePromo(product?.id);
	const loginStatus = user?.isLoggedIn;

	/* eslint-disable */
	const [breadcrumbs] = useState<Breadcrumb[]>([]); // selector
	const [sellers] = useState<SellerInfo>(); // selector

	const { availability, hasInventory } = useInventory(
		(selection ?? initial)?.sku?.partNumber,
		physicalStoreName
	);
	const { pickupInStoreShipMode } = useAllowableShippingModes();
	const { wishLists, requisitionLists } = useWishRequisitionList();

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

	const onQuantity = useCallback(
		(quantity: number | null) =>
			setSelection((selection) => ({
				...(selection ?? initial),
				quantity: quantity ?? 0,
			})),
		[initial]
	);

	const loginRequired = useCallback(() => {
		if (!loginStatus && isB2BStore(settings)) {
			router.push(routes.Login.route.t());
			return true;
		} else {
			return false;
		}
	}, [loginStatus, router, routes, settings]);

	const addToCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			if (loginRequired()) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();
			const { sku, quantity } = selection ?? initial;
			if (sku?.partNumber) {
				let avail: ProductAvailabilityData | undefined; // the availability of online or physical store
				avail = availability?.find((a) => a.status);
				if (!avail) {
					avail = availability?.find((a) => a.physicalStoreStatus);
				}

				const orderItem = {
					partNumber: sku.partNumber,
					quantity: quantity.toString(),
					...(avail?.physicalStoreId && {
						physicalStoreId: avail.physicalStoreId,
						shipModeId: pickupInStoreShipMode?.shipModeId,
					}),
				};

				const data = { ...BASE_ADD_2_CART_BODY, orderItem: [orderItem] };
				try {
					await addToCartFetcher(true)(settings?.storeId ?? '', {}, data, params);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
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
			loginRequired,
			selection,
			initial,
			availability,
			context,
			pickupInStoreShipMode?.shipModeId,
			settings,
			params,
			mutateCart,
			showSuccessMessage,
			success.ITEM_TO_CART,
			product,
			onAddToCart,
			category,
			notifyError,
		]
	);

	const addToWishList = useCallback(
		(partNumber: string, quantity: number, wishList: WishlistWishlistItem) => async () => {
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
		},
		[
			settings?.storeId,
			params,
			product,
			onAddToWishlist,
			showSuccessMessage,
			success.WISHLIST_ADD_SUCCESS,
		]
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
	}, [cart, selection, breadcrumbs]); // eslint-disable-line react-hooks/exhaustive-deps

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
	}, [breadcrumbs]); // eslint-disable-line react-hooks/exhaustive-deps
	*/

	// TODO Look into why this is firing after the FIRST time an attribute is changed, as well as the normal product load.
	// inputCE is changing, even though the product id is not.
	useEffect(() => {
		product && onProductView({ gtm: { product, storeName: settings.storeName, settings } });
	}, [product]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setSelection(initial as Selection);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [langId]);

	return {
		onQuantity,
		selection: selection ?? initial,
		product,
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
	};
};
