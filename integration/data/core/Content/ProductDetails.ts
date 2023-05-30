/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRING_TRUE } from '@/data/constants/catalog';
import { ProductType, Selection, SellerInfo } from '@/data/types/Product';
import { Breadcrumb } from '@/data/types/Breadcrumb';
import { getProduct, getProductByKeyType, useProduct } from '@/data/Content/Product';
import { TransactionErrorResponse } from '@/data/types/Basic';
import {
	getAttrsByIdentifier,
	mapProductDetailsData,
	search,
} from '@/data/utils/mapProductDetailsData';
import { ContentProps } from '@/data/types/ContentProps';
import { addToCartFetcher, BASE_ADD_2_CART_BODY, useCart } from '@/data/Content/Cart';
import { getInventory, useInventory } from '@/data/Content/_Inventory';
import { getPromo, usePromo } from '@/data/Content/_Promos';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	WishlistWishlist,
	WishlistWishlistItem,
} from 'integration/generated/transactions/data-contracts';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { useNotifications } from '@/data/Content/Notifications';
import { getLocalization, useLocalization } from '@/data/Localization';
import {
	PageData,
	useWishLists,
	wishListsFetcher,
	wishListsMapper,
} from '@/data/Content/WishLists';
import { EventsContext } from '@/data/context/events';
import { processError } from '@/data/utils/processError';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
export { getAttrsByIdentifier };

type Props = {
	partNumber: string;
	physicalStoreName?: string;
};

export const getProductDetails = async ({ cache, id, context }: ContentProps) => {
	const partNumber = id.toString();
	let product = await getProduct(cache, partNumber, context);
	if (product?.type === 'item' && product.parentCatalogEntryID) {
		// get parent product
		product = await getProductByKeyType(cache, 'id', product.parentCatalogEntryID, context);
		// get inventory for self
		await getInventory(cache, product.partNumber, context);
	} else if (product?.type === 'product' || product?.type === 'variant') {
		// get inventory for first SKU
		await getInventory(cache, product.items?.at(0)?.partNumber as string, context);
	}
	await Promise.all([
		getPromo(cache, product?.id, context),
		getLocalization(cache, context.locale || 'en-US', 'productDetail'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
		getLocalization(cache, context.locale || 'en-US', 'PriceDisplay'),
	]);
};

export const useProductDetails = (props: Props) => {
	const { onProductView, onAddToCart, onAddToWishlist } = useContext(EventsContext);
	const { showSuccessMessage, notifyError } = useNotifications();
	const { mutateWishLists } = useWishLists();
	const success = useLocalization('success-message');
	const { user } = useUser();
	const context = useMemo(() => user?.context, [user]);
	const { settings } = useSettings();
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
	const { promos } = usePromo(product?.id);
	const loginStatus = user?.isLoggedIn;

	/* eslint-disable */
	const [breadcrumbs] = useState<Breadcrumb[]>([]); // selector
	const [sellers] = useState<SellerInfo>(); // selector
	/* eslint-enable */
	const [wishLists, setWishLists] = useState<WishlistWishlistItem[] | null>(null);

	const { availability, hasInventory } = useInventory(
		(selection ?? initial)?.sku?.partNumber,
		physicalStoreName
	);

	const { pickupInStoreShipMode } = useAllowableShippingModes();
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

	const addToCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
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
						...getContractIdParamFromContext(context),
						shipModeId: pickupInStoreShipMode?.shipModeId,
					}),
				};

				const data = { ...BASE_ADD_2_CART_BODY, orderItem: [orderItem] };
				try {
					await addToCartFetcher(true)(settings?.storeId ?? '', {}, data, params);
					await mutateCart();
					// notification
					showSuccessMessage(success.ITEM_TO_CART.t([product?.name ?? '']), true);
					product && onAddToCart(product, quantity);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[
			selection,
			initial,
			availability,
			context,
			pickupInStoreShipMode?.shipModeId,
			settings?.storeId,
			params,
			mutateCart,
			showSuccessMessage,
			success.ITEM_TO_CART,
			product,
			onAddToCart,
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
			mutateWishLists();
			if (rc) {
				showSuccessMessage(success.WISHLIST_ADD_SUCCESS.t([wishList.description as string]));
			}
			product && onAddToWishlist(product, quantity);
		},
		[
			settings?.storeId,
			params,
			mutateWishLists,
			product,
			onAddToWishlist,
			showSuccessMessage,
			success.WISHLIST_ADD_SUCCESS,
		]
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

	const fetchWishLists = useCallback(async () => {
		let rc = wishLists;
		if (rc === null) {
			const res = await wishListsFetcher(true)(
				settings?.storeId as string,
				{} as PageData,
				undefined,
				params
			);
			const { wishLists: wl } = wishListsMapper(res as WishlistWishlist);
			rc = wl;
			setWishLists(wl);
		}
		return rc;
	}, [settings?.storeId, wishLists, params]);

	useEffect(() => {
		if (loginStatus && wishLists === null) {
			fetchWishLists();
		}
	}, [fetchWishLists, loginStatus, wishLists]);

	// TODO Look into why this is firing after the FIRST time an attribute is changed, as well as the normal product load.
	// inputCE is changing, even though the product id is not.
	useEffect(() => product && onProductView(product), [onProductView, product]);

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
	};
};
