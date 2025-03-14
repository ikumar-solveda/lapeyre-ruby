/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { InventoryStatusType } from '@/components/content/Bundle/parts/Table/Availability';
import {
	addToCartFetcherV2 as addToCartFetcher,
	BASE_ADD_2_CART_BODY,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { useVolumePrice } from '@/data/Content/VolumePrice';
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
import { STRING_TRUE } from '@/data/constants/catalog';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { FULFILLMENT_METHOD, ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DEFAULT_SINGLE_RECORD } from '@/data/constants/price';
import { SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE, TYPES } from '@/data/constants/product';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { useProductInfoState } from '@/data/state/useProductInfoState';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import type {
	FulfillmentMethodValueType,
	ProductType,
	Selection,
	SkuListTableData,
} from '@/data/types/Product';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { ScheduleForLaterType } from '@/data/types/ScheduleForLater';
import type { StoreDetails } from '@/data/types/Store';
import { findOfferPrice } from '@/data/utils/findOfferPrice';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { getRangePriceRecord, getRangePriceValue } from '@/data/utils/getVolumePrice';
import { getAttrsByIdentifier, mapProductDetailsData } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { get, keyBy } from 'lodash';
import {
	type ChangeEvent,
	type MouseEvent,
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

type ScheduleForLaterByPartNumber = Record<string, ScheduleForLaterType>;
export const useSkuListTable = ({ partNumber, physicalStore, embedded }: Props) => {
	const { onAddToCart } = useContext(EventsContext);
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const [volumePriceDialogState, setVolumePriceDialogState] = useState<boolean>(false);
	const [partNumberForVolumePriceDialog, setPartNumberForVolumePriceDialog] =
		useState<string>(EMPTY_STRING);
	const [partNumberForScheduleForLater, setPartNumberForScheduleForLater] =
		useState<string>(EMPTY_STRING);
	const [skusForQuotes, setSkusForQuotes] = useState<Record<string, number>>({});
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
	const [scheduleForLater, setScheduleForLater] = useState<ScheduleForLaterByPartNumber>({});
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

	const { entitledPriceList } = useVolumePrice({ partNumber: partNumbers });
	const { availability = EMPTY, isLoading } = useInventoryV2({
		partNumber: partNumbers.join(','),
		physicalStore,
	});
	const [ffMethod, setFfMethod] = useState<Record<string, FulfillmentMethodValueType>>({});
	const defaultShippingMode = !deliveryShipMode
		? FULFILLMENT_METHOD.PICKUP
		: FULFILLMENT_METHOD.DELIVERY;

	const [skuData, setSkuData] = useState<SkuListTableData[]>(
		mapSkuListData(skuList, ffMethod, availability, isLoading, defaultShippingMode)
	);

	const isBackorderSKUAvailable = useMemo(
		() =>
			availability.some(({ pbcData }) => !!pbcData?.fulfillmentCenter.availableToPromiseDateTime),
		[availability]
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

	const toggleVolumePriceDialog = useCallback(() => setVolumePriceDialogState((prev) => !prev), []);

	const onVolumePriceDialog = useCallback(
		(partNumber: string) => (event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			setPartNumberForVolumePriceDialog(partNumber);
			toggleVolumePriceDialog();
		},
		[toggleVolumePriceDialog]
	);

	const { rangePriceList } = useMemo(
		() => getRangePriceRecord(entitledPriceList, partNumberForVolumePriceDialog),

		[entitledPriceList, partNumberForVolumePriceDialog]
	);

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
			const { rangePriceList } = getRangePriceRecord(entitledPriceList, partNumber);
			const nonZeroQuantity = quantity !== null && quantity > 0;

			// by default, price api for each sku will have one record under RangePrice even if we have
			//   not configure price options in CMC; update sku only if price options configured.
			if (rangePriceList.length > DEFAULT_SINGLE_RECORD) {
				setSkuData((sku: SkuListTableData[]) =>
					sku.map((item: SkuListTableData) => {
						if (item.partNumber === partNumber) {
							const defaultPriceValue = findOfferPrice(item.price)?.value;
							const offer = nonZeroQuantity
								? getRangePriceValue(quantity, rangePriceList, defaultPriceValue)?.rangePriceValue
								: defaultPriceValue;
							return { ...item, productPrice: { ...item.productPrice, offer } };
						}
						return item;
					})
				);
			}

			if (nonZeroQuantity) {
				skuQuantities[partNumber] = quantity;
				setSkusForQuotes((previousValue) => ({ ...previousValue, [partNumber]: quantity }));
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
				setSkusForQuotes((previousValue) => {
					const rc = { ...previousValue };
					delete rc[partNumber];
					return rc;
				});
				delete skuQuantities[partNumber];
				delete skuPickupMode[partNumber];
			}

			update({ skuAndPickupMode: skuPickupMode, skuAndQuantities: skuQuantities });
		};

	const getAvailabilityDetailsForSKU = useCallback(
		(skuPartNumber: string) =>
			isDeliverySelected(skuPartNumber)
				? availability.find(
						(a) => a.partNumber === skuPartNumber && a.storeName === ONLINE_STORE_KEY
				  ) ?? ({} as ProductAvailabilityData)
				: availability.find((a) => a.partNumber === skuPartNumber && a.physicalStoreId),
		[availability, isDeliverySelected]
	);

	const addToCart = useCallback(
		async (event: MouseEvent<HTMLElement>) => {
			if (await redirectToLoginIfNeed()) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();
			const partNumbers = skuAndQuantities ? Object.keys(skuAndQuantities) : [];
			if (partNumbers.length > 0) {
				const orderItems = partNumbers.map((partNumber) => {
					const scheduleForLaterInfo = scheduleForLater[partNumber];
					const isDeliveryOptionSelected = isDeliverySelected(partNumber);

					return {
						partNumber,
						quantity: skuAndQuantities[partNumber].toString(),
						...(isDeliveryOptionSelected
							? { shipModeId: deliveryShipMode?.shipModeId }
							: {
									shipModeId: pickupInStoreShipMode?.shipModeId,
									physicalStoreId: storeLocator.selectedStore?.id,
							  }),
						...(scheduleForLaterInfo?.enabled
							? { xitem_requestedShipDate: scheduleForLaterInfo.date?.toISOString() }
							: null),
					};
				});

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
			scheduleForLater,
			isDeliverySelected,
			deliveryShipMode?.shipModeId,
			pickupInStoreShipMode?.shipModeId,
			storeLocator.selectedStore?.id,
			showErrorMessage,
			errorMessages,
			isGenericUser,
			settings,
			params,
			currentCartSWRKey,
			showSuccessMessage,
			success,
			byPartNumber,
			onAddToCart,
			category,
			notifyError,
			productDetailNLS,
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

	const updateScheduleForLater = useCallback(
		(partNumber: string, value: ScheduleForLaterType) =>
			setScheduleForLater((prev) => ({ ...prev, [partNumber]: { ...value } })),
		[]
	);

	const onScheduleForLaterPartNumber = useCallback(
		(partNumber = '') =>
			async () =>
				setPartNumberForScheduleForLater(partNumber),
		[]
	);

	const onScheduleForLaterIconClick = useCallback(
		(partNumber: string) => (event: MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			onScheduleForLaterPartNumber(partNumber)();
		},
		[onScheduleForLaterPartNumber]
	);

	const onScheduleForLaterConfirm = useCallback(
		async (scheduled: ScheduleForLaterType) => {
			updateScheduleForLater(partNumberForScheduleForLater, scheduled);
			onScheduleForLaterPartNumber()();
		},
		[onScheduleForLaterPartNumber, partNumberForScheduleForLater, updateScheduleForLater]
	);

	const getSelectionPartNumbers = useCallback(
		() => Object.entries(skusForQuotes).map(([partNumber, quantity]) => ({ partNumber, quantity })),
		[skusForQuotes]
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

	useEffect(
		() =>
			setSkuData(mapSkuListData(skuList, ffMethod, availability, isLoading, defaultShippingMode)),
		[availability, defaultShippingMode, entitledPriceList, ffMethod, isLoading, skuList]
	);

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
		/**
		 * @deprecated import `findOfferPrice` where necessary instead
		 */
		findPrice: findOfferPrice,
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
		entitledPriceList,
		rangePriceList,
		volumePriceDialogState,
		onVolumePriceDialog,
		partNumberForVolumePriceDialog,
		toggleVolumePriceDialog,
		isBackorderSKUAvailable,
		onScheduleForLaterPartNumber,
		onScheduleForLaterConfirm,
		onScheduleForLaterIconClick,
		partNumberForScheduleForLater,
		availability,
		isDeliverySelected,
		scheduleForLater,
		getAvailabilityDetailsForSKU,
		getSelectionPartNumbers,
	};
};
