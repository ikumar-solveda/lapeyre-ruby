/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { InventoryStatusType } from '@/components/content/Bundle/parts/Table/Availability';
import {
	BASE_ADD_2_CART_BODY,
	addToCartFetcherV2 as addToCartFetcher,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLoginRedirectRequired } from '@/data/Content/_LoginRedirectRequired';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { usePromo } from '@/data/Content/_Promos';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { useWishRequisitionList } from '@/data/Content/_WishRequisitionList';
import { fetchDefaultWishlistOrCreateNew } from '@/data/Content/_Wishlists';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { STRING_TRUE, USAGE_OFFER } from '@/data/constants/catalog';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { FULFILLMENT_METHOD } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE, TYPES } from '@/data/constants/product';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { useProductInfoState } from '@/data/state/useProductInfoState';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import {
	FulfillmentMethodValueType,
	Price,
	ProductType,
	Selection,
	SkuListTableData,
} from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { getAttrsByIdentifier, mapProductDetailsData } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { get, keyBy } from 'lodash';
import {
	ChangeEvent,
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { mutate } from 'swr';

type Props = {
	partNumber: string;
	embedded?: boolean;
	/** @deprecated use `physicalStore` instead */
	physicalStoreName?: string;
	physicalStore?: StoreDetails;
};

const EMPTY = [] as ProductAvailabilityData[];
export const EMPTY_PRODUCT = {} as ProductType;

const mapSkuListData = (
	skuList: ProductType[] | undefined,
	ffMethod: Record<string, FulfillmentMethodValueType>,
	availability: ProductAvailabilityData[],
	isLoading: boolean,
	defaultShippingMode: FulfillmentMethodValueType
) =>
	skuList?.map(
		(sku) =>
			({
				...sku,
				selectedFulfillmentMode: ffMethod[sku.partNumber] ?? defaultShippingMode,
				availability,
				isInventoryLoading: isLoading,
			} as SkuListTableData)
	) ?? [];

export const useSkuListTable = ({ partNumber, physicalStore, embedded }: Props) => {
	const { onAddToCart } = useContext(EventsContext);
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const { storeLocator } = useStoreLocatorState();
	const { settings } = useSettings();
	const { user } = useUser();
	const isGenericUser = user?.isGeneric ?? false;
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const productDetailNLS = useLocalization('productDetail');
	const success = useLocalization('success-message');
	const errorMessages = useLocalization('error-message');
	const wlNls = useLocalization('WishList');
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { product: inputCE } = useProduct({ id: partNumber });
	const { product: root } = useProduct({
		id: inputCE?.parentCatalogEntryID,
		isCEId: true,
		condition: inputCE?.type === 'item',
	});
	const { product } = useMemo(() => mapProductDetailsData(inputCE, root), [inputCE, root]);

	const { ga4, ua } = getGTMConfig(settings);
	const { category } = useCategory(
		ga4 || ua ? getParentCategoryFromSlashPath(product?.parentCatalogGroupID) : ''
	);
	const { pickupInStoreShipMode, deliveryShipMode } = useAllowableShippingModes();
	const { redirectToLoginIfNeed, loginStatus } = useLoginRedirectRequired();
	const isSkuListTableDisplayed =
		product?.type === TYPES.product || product?.type === TYPES.variant;
	const { promos } = usePromo(product?.id);

	/**
	 * @deprecated use `getSkuListDisplayableColumns` where necessary instead
	 */
	const attrSz = useMemo(
		() =>
			product?.definingAttributes &&
			product.definingAttributes.length > SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE
				? SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE
				: product?.definingAttributes?.length,
		[product?.definingAttributes]
	);

	const {
		productInfoData,
		actions: { update, removeData },
	} = useProductInfoState();
	const { displayedProdOrSku, filteredSkus, skuAndPickupMode, skuAndQuantities } =
		productInfoData.productInfo;
	const productOrSkuListSelection = useMemo(
		() =>
			({
				sku: displayedProdOrSku ?? product,
				quantity: 1,
				attrsByIdentifier: displayedProdOrSku
					? getAttrsByIdentifier(displayedProdOrSku?.definingAttributes)
					: getAttrsByIdentifier(product?.definingAttributes),
				buyable: displayedProdOrSku
					? displayedProdOrSku?.buyable === STRING_TRUE
					: product?.buyable === STRING_TRUE,
			} as Selection),
		[displayedProdOrSku, product]
	);
	const [selection, setSelection] = useState<Selection>(productOrSkuListSelection as Selection);
	const { wishLists, requisitionLists } = useWishRequisitionList();

	const { sortedItems, byPartNumber } = useMemo(() => {
		const sortedItems = product?.items?.sort((a, b) =>
			a.partNumber.localeCompare(b.partNumber, 'en', { numeric: true })
		);
		const byPartNumber = keyBy(sortedItems ?? [], 'partNumber');

		return { sortedItems, byPartNumber };
	}, [product]);
	const skuList = useMemo(
		() => (filteredSkus ? filteredSkus : sortedItems),
		[filteredSkus, sortedItems]
	);

	const partNumbers = useMemo(() => skuList?.map((sku) => sku.partNumber) ?? [], [skuList]);
	const { availability = EMPTY, isLoading } = useInventoryV2({
		partNumber: partNumbers.join(','),
		physicalStore,
	});
	const [ffMethod, setFfMethod] = useState<Record<string, FulfillmentMethodValueType>>({});
	const defaultShippingMode = !deliveryShipMode
		? FULFILLMENT_METHOD.PICKUP
		: FULFILLMENT_METHOD.DELIVERY;
	const skuData = useMemo(
		() => mapSkuListData(skuList, ffMethod, availability, isLoading, defaultShippingMode),
		[availability, isLoading, skuList, ffMethod, defaultShippingMode]
	);

	const onFulfillmentMethod = useCallback(
		(partNumber: string) => (event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setFfMethod((prev) => ({ ...prev, [partNumber]: value as FulfillmentMethodValueType }));
		},
		[]
	);

	const isDeliverySelected = useCallback(
		(partNumber: string) =>
			!ffMethod[partNumber] || ffMethod[partNumber] === FULFILLMENT_METHOD.DELIVERY,
		[ffMethod]
	);

	const findPrice = (price: Price[]) => {
		const o = price.find(({ usage: u, value: v }) => u === USAGE_OFFER && v !== EMPTY_STRING);
		const offerPrice = o ? dFix(o.value) : 0;
		const currency = o ? o.currency : null;
		return { value: (offerPrice > 0 ? offerPrice : null) as number, currency };
	};

	const findAttributeValue = (sku: ProductType, identifier: string) => {
		const rowAttribute = sku.definingAttributes.find((a) => a.identifier === identifier);
		return get(rowAttribute, 'values[0].value', '');
	};

	const onQuantityChange =
		(
			partNumber: string,
			onlineStatus: InventoryStatusType,
			offlineStatus: InventoryStatusType | undefined
		) =>
		(quantity: number | null) => {
			const skuQuantities = skuAndQuantities ?? {};
			const skuPickupMode = skuAndPickupMode ?? {};
			if (quantity !== null && quantity > 0) {
				skuQuantities[partNumber] = quantity;
				if (!onlineStatus.status && offlineStatus?.status) {
					if (pickupInStoreShipMode?.shipModeId) {
						skuPickupMode[partNumber] = pickupInStoreShipMode?.shipModeId;
					} else {
						skuPickupMode[partNumber] = EMPTY_STRING;
					}
				} else {
					skuPickupMode[partNumber] = EMPTY_STRING;
				}
			} else {
				delete skuQuantities[partNumber];
				delete skuPickupMode[partNumber];
			}
			update({ skuAndPickupMode: skuPickupMode, skuAndQuantities: skuQuantities });
		};

	const addToCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			if (await redirectToLoginIfNeed()) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();
			const partNumbers = skuAndQuantities ? Object.keys(skuAndQuantities) : [];
			if (partNumbers.length > 0) {
				const orderItems = partNumbers.map((partNumber) => ({
					partNumber,
					quantity: skuAndQuantities[partNumber].toString(),
					...(isDeliverySelected(partNumber)
						? { shipModeId: deliveryShipMode?.shipModeId }
						: {
								shipModeId: pickupInStoreShipMode?.shipModeId,
								physicalStoreId: storeLocator.selectedStore?.id,
						  }),
				}));

				if (
					!orderItems.every(
						(item) => isDeliverySelected(item.partNumber) || (item as any).physicalStoreId
					)
				) {
					showErrorMessage(errorMessages.SelectStoreToAddToCart.t());
					return;
				}

				const data = { ...BASE_ADD_2_CART_BODY, orderItem: orderItems };
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
					showSuccessMessage(
						success.ITEMS_N_TO_CART.t([Object.keys(skuAndQuantities).length ?? '']),
						true
					);

					partNumbers.forEach((partNumber) => {
						const sku = byPartNumber[partNumber];
						const quantity = skuAndQuantities[partNumber];
						const attrsByIdentifier = getAttrsByIdentifier(sku.attributes);
						onAddToCart({
							gtm: {
								selection: { sku, quantity, attrsByIdentifier, buyable: true },
								category,
								quantity,
								orgName: '', // TODO: specify selected org-name
								orgId: '', // TODO: specify selected org
								storeName: settings.storeName,
								settings,
							},
						});
					});
					scrollTo(0, 0);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			} else {
				// notification
				showErrorMessage(productDetailNLS.addToCartErrorMsg.t());
			}
		},
		[
			redirectToLoginIfNeed,
			skuAndQuantities,
			isDeliverySelected,
			deliveryShipMode?.shipModeId,
			pickupInStoreShipMode?.shipModeId,
			storeLocator.selectedStore?.id,
			settings,
			params,
			showSuccessMessage,
			success,
			errorMessages,
			byPartNumber,
			onAddToCart,
			category,
			notifyError,
			showErrorMessage,
			productDetailNLS,
			isGenericUser,
			currentCartSWRKey,
		]
	);

	const addToRequisitionList = useCallback(
		(requisitionListId: string) => async () => {
			if (skuAndQuantities && Object.keys(skuAndQuantities).length > 0) {
				try {
					await Promise.all(
						Object.entries(skuAndQuantities).map(([partNumber, quantity]) =>
							requisitionListItemUpdate(true)(
								{
									storeId: settings.storeId,
									langId,
									requisitionListId,
									data: { partNumber, quantity },
								},
								params
							)
						)
					);
					showSuccessMessage(success.addNItemsSuc.t({ n: Object.keys(skuAndQuantities).length }));
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			} else {
				showErrorMessage(productDetailNLS.addToCartErrorMsg.t());
			}
		},
		[
			params,
			productDetailNLS,
			settings.storeId,
			showErrorMessage,
			showSuccessMessage,
			skuAndQuantities,
			success,
			langId,
			notifyError,
		]
	);

	const addToWishList = useCallback(
		(_partNumber: string, _quantity: number, wishList: WishlistWishlistItem) => async () => {
			if (skuAndQuantities && Object.keys(skuAndQuantities).length > 0) {
				const item: any[] = Object.entries(skuAndQuantities).map(([partNumber, quantity]) => ({
					partNumber,
					quantityRequested: quantity.toString(),
				}));
				try {
					const rc = await wishListUpdater(true)(
						settings?.storeId as string,
						wishList.uniqueID as string,
						{ item },
						{ addItem: true },
						params
					);
					if (rc) {
						showSuccessMessage(success.addNItemsSuc.t({ n: item.length }));
					}
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			} else {
				showErrorMessage(productDetailNLS.addToCartErrorMsg.t());
			}
		},
		[
			skuAndQuantities,
			settings?.storeId,
			params,
			showSuccessMessage,
			success,
			showErrorMessage,
			productDetailNLS,
			notifyError,
		]
	);

	const addToDefaultWishlist = useCallback(
		(_partNumber: string, _quantity: number) => async () => {
			if (skuAndQuantities && Object.keys(skuAndQuantities).length > 0) {
				const item: any[] = Object.entries(skuAndQuantities).map(([partNumber, quantity]) => ({
					partNumber,
					quantityRequested: quantity.toString(),
				}));
				try {
					const { wishlistId } = await fetchDefaultWishlistOrCreateNew(true)(
						settings?.storeId,
						undefined,
						wlNls.DefaultWishListName.t(),
						params
					);
					const rc = await wishListUpdater(true)(
						settings?.storeId as string,
						wishlistId,
						{ item },
						{ addItem: true },
						params
					);
					if (rc) {
						showSuccessMessage(success.addNItemsSuc.t({ n: item.length }));
					}
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			} else {
				showErrorMessage(productDetailNLS.addToCartErrorMsg.t());
			}
		},
		[
			wlNls,
			skuAndQuantities,
			settings?.storeId,
			params,
			showSuccessMessage,
			success,
			showErrorMessage,
			productDetailNLS,
			notifyError,
		]
	);

	useEffect(() => {
		// clear old state only if on root page -- embedded usage, e.g., store-dialog, needs root state
		if (!embedded) {
			removeData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setSelection(productOrSkuListSelection);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productOrSkuListSelection]);

	return {
		attrSz,
		data: skuData,
		product,
		isSkuListTableDisplayed,
		selection,
		promos,
		loginStatus,
		requisitionLists,
		wishLists,
		findPrice,
		findAttributeValue,
		onQuantityChange,
		addToCart,
		addToRequisitionList,
		addToWishList,
		addToDefaultWishlist,
		params,
		isLoading,
		onFulfillmentMethod,
		pickupInStoreShipMode,
		deliveryShipMode,
	};
};
