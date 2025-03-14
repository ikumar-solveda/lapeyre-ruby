/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { USAGE_OFFER } from '@/data/constants/catalog';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { FULFILLMENT_METHOD, ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { fetchDefaultWishlistOrCreateNew } from '@/data/Content/_Wishlists';
import {
	addToCartFetcherV2 as addToCartFetcher,
	BASE_ADD_2_CART_BODY,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { getAttrsByIdentifier, useProductDetails } from '@/data/Content/ProductDetails';
import { useVolumePrice } from '@/data/Content/VolumePrice';
import { EventsContext } from '@/data/context/events';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { RangePriceItem } from '@/data/types/Price';
import type {
	BundleTableRowData,
	FulfillmentMethodValueType,
	Price,
	ProductType,
} from '@/data/types/Product';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { ScheduleForLaterType } from '@/data/types/ScheduleForLater';
import type { StoreDetails } from '@/data/types/Store';
import { useUser } from '@/data/User';
import {
	getBundleComponentOrSkuAttributes,
	getComponentType,
} from '@/data/utils/getBundleComponentOrSkuAttributes';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getInventoryRecordV2 } from '@/data/utils/getInventoryRecordV2';
import {
	getRangePriceRecord,
	getRangePriceValue,
	volumePricingExists,
} from '@/data/utils/getVolumePrice';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { validateBundleSelectionsV2 } from '@/data/utils/validateBundleSelectionsV2';
import { SelectChangeEvent } from '@mui/material';
import type { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { isEqual } from 'lodash';
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

type ScheduleForLaterByRowNumber = Record<string, ScheduleForLaterType>;

const findSKU = (sKUs?: ProductType[], attributes?: Record<string, string>) => {
	const sku = sKUs?.find(({ definingAttributes }) => {
		const skuAttrs = definingAttributes.reduce(
			(all, attr) => ({ ...all, [attr.identifier]: attr.values[0]?.identifier }),
			{}
		);

		return isEqual(attributes, skuAttrs);
	});
	return sku;
};

const EMPTY_SKUS: ProductType[] = [];
const mapBundleData = (
	components: ProductType[],
	availability: ProductAvailabilityData[],
	attributeStates?: Record<string, string>[]
) =>
	components.map((comp, rowNumber) => {
		const { numberOfSKUs, quantity, sKUs = EMPTY_SKUS } = comp;
		const { attrStates } = getBundleComponentOrSkuAttributes(comp);
		const { isProduct, isVariant } = getComponentType(comp);
		const isOneSku = !((isProduct || isVariant) && numberOfSKUs > 1);
		const selectedSku = findSKU(sKUs, attributeStates?.[rowNumber]);
		return {
			...(numberOfSKUs === 1 ? sKUs[0] : comp),
			rowNumber,
			isOneSku,
			attrStates: attributeStates?.[rowNumber] ?? attrStates,
			quantity,
			availability,
			selectedSku,
		} as BundleTableRowData;
	});

const generateOrderItem = (
	record: BundleTableRowData,
	availability: ProductAvailabilityData[],
	physicalStore: StoreDetails | undefined,
	methods: ReturnType<typeof useAllowableShippingModes>,
	ffMethod: Record<string, FulfillmentMethodValueType>,
	scheduleForLater: ScheduleForLaterByRowNumber
) => {
	const { quantity } = record;
	const { partNumber = '' } = record.selectedSku ?? record;
	const offline = physicalStore
		? getInventoryRecordV2(availability, partNumber, physicalStore)
		: undefined;
	const isDelivery =
		!ffMethod[record.rowNumber] || ffMethod[record.rowNumber] === FULFILLMENT_METHOD.DELIVERY;
	const scheduleForLaterInfo = scheduleForLater[record.rowNumber];
	const fulfillment = isDelivery
		? { shipModeId: methods.deliveryShipMode?.shipModeId }
		: {
				shipModeId: methods.pickupInStoreShipMode?.shipModeId,
				physicalStoreId: offline?.physicalStoreId,
		  };
	const requestShipDate = scheduleForLaterInfo?.enabled
		? { xitem_requestedShipDate: scheduleForLaterInfo.date?.toISOString() }
		: null;
	const validPickup = isDelivery || physicalStore?.id;
	return {
		validPickup,
		partNumber,
		quantity,
		...fulfillment,
		...requestShipDate,
	};
};

const updateOfferPrice = (
	range: RangePriceItem[],
	quantity: string | undefined,
	priceList: Price[] | undefined,
	defaultPrice = 0
) => {
	const offer = priceList?.find(({ usage }) => usage === USAGE_OFFER);
	if (offer) {
		const value = dFix(quantity ?? 0, 0);
		const q = value === 0 ? 1 : value;
		offer.value = getRangePriceValue(q, range, defaultPrice)?.rangePriceValue?.toString();
	}
	return priceList;
};

const updatePriceByQuantity = (
	row: BundleTableRowData,
	rangePriceList: RangePriceItem[] | undefined,
	quantity?: string
) => {
	const { productPrice, selectedSku, isOneSku, price: prodPrice, quantity: rowQuantity } = row;
	if (rangePriceList?.length && (isOneSku || selectedSku)) {
		const defaultPrice = isOneSku ? productPrice?.offer : selectedSku?.productPrice?.offer;
		const target = isOneSku ? prodPrice : selectedSku?.price;
		const price = updateOfferPrice(rangePriceList, quantity ?? rowQuantity, target, defaultPrice);
		if (isOneSku) {
			Object.assign(row, { price });
		} else if (selectedSku) {
			Object.assign(selectedSku, { price });
		}
	}
	return row;
};

type Props = {
	pdp: ReturnType<typeof useProductDetails>;
	physicalStoreName: string;
	physicalStore?: StoreDetails;
	attributeStates?: Record<string, string>[]; // pre-selected attribute states for each row
};

const EMPTY_COMPS: ProductType[] = [];
const EMPTY = [] as ProductAvailabilityData[];
const EMPTY_PRODUCT = {} as ProductType;

export const useBundleDetailsTable = ({
	pdp,
	physicalStoreName,
	physicalStore,
	attributeStates,
}: Props) => {
	const { onAddToCart } = useContext(EventsContext);
	const { addedNSuccessfully, addNItemsSuc } = useLocalization('success-message');
	const errorMessages = useLocalization('error-message');
	const messages = useLocalization('productDetail');
	const wlNls = useLocalization('WishList');
	const router = useNextRouter();

	const { product = EMPTY_PRODUCT, loginRequired, category } = pdp;
	const { components = EMPTY_COMPS } = product;
	const methods = useAllowableShippingModes();
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const [volumePriceDialogState, setVolumePriceDialogState] = useState<boolean>(false);
	const [partNumberForVolumePriceDialog, setPartNumberForVolumePriceDialog] =
		useState<string>(EMPTY_STRING);
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { settings } = useSettings();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { user } = useUser();
	const isGeneric = user?.isGeneric ?? false;
	const [rowNumberForScheduleForLater, setRowNumberForScheduleForLater] = useState<number>(-1);
	const [scheduleForLater, setScheduleForLater] = useState<ScheduleForLaterByRowNumber>({});

	const partNumbers = useMemo(
		() =>
			components.flatMap((comp) => [
				...(getComponentType(comp).isItem
					? [comp.partNumber]
					: comp.sKUs?.map((sku) => sku.partNumber) ?? []),
			]),
		[components]
	);

	const { entitledPriceList } = useVolumePrice({ partNumber: partNumbers });
	const { availability = EMPTY, isLoading } = useInventoryV2({
		partNumber: partNumbers.join(','),
		physicalStore,
	});
	const [data, setData] = useState<BundleTableRowData[]>(
		mapBundleData(components, availability, attributeStates)
	);
	const [error, setError] = useState<{ message?: string }>();
	const [ffMethod, setFfMethod] = useState<Record<string, FulfillmentMethodValueType>>({});
	const onFulfillmentMethod = useCallback(
		(rowNumber: number) => (event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setFfMethod((prev) => ({ ...prev, [rowNumber]: value as FulfillmentMethodValueType }));
		},
		[]
	);

	const isBackorderSKUAvailable = useMemo(
		() =>
			availability?.some(({ pbcData }) => !!pbcData?.fulfillmentCenter.availableToPromiseDateTime),
		[availability]
	);
	const doValidation = useCallback(() => {
		let rc = true;
		const { someWithNoSkus, noItems } = validateBundleSelectionsV2(data, physicalStore);

		// validate selections-only -- let cart API validate inventory
		if (someWithNoSkus || noItems) {
			if (noItems) {
				setError({ message: messages.selectSomething.t() });
			} else {
				setError({ message: messages.someWithNoSkus.t() });
			}
			rc = false;
		}
		return rc;
	}, [data, messages, physicalStore]);

	const getSelectionsForLists = useCallback(
		() =>
			data.filter(
				({ isOneSku, selectedSku, quantity }) => dFix(quantity, 0) && (isOneSku || selectedSku)
			),
		[data]
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

	/**
	 * Add the selected product and its quantities to the shopping cart
	 */
	const addToCart = useCallback(
		async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();

			if (await loginRequired()) {
				return;
			}

			const validated = doValidation();
			if (validated) {
				setError({});
				const items = data
					.filter(({ quantity }) => dFix(quantity, 0))
					.map((record) =>
						generateOrderItem(
							record,
							availability,
							physicalStore,
							methods,
							ffMethod,
							scheduleForLater
						)
					);
				const validPickup = items.every(({ validPickup }) => validPickup);
				if (!validPickup) {
					showErrorMessage(errorMessages.SelectStoreToAddToCart.t());
					return;
				}

				const body = {
					...BASE_ADD_2_CART_BODY,
					orderItem: items.map(({ validPickup, ...rest }) => ({ ...rest })),
				};
				try {
					await addToCartFetcher(isGeneric)(settings?.storeId ?? '', {}, body, params);
					if (isGeneric) {
						await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
						await mutate(
							personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC),
							undefined
						);
					}
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages

					// notification
					showSuccessMessage(addedNSuccessfully.t({ v: items.length }), true);

					data
						.filter(({ quantity }) => dFix(quantity, 0))
						.forEach((record) => {
							const quantity = dFix(record.quantity, 0);
							const sku = record.selectedSku ?? record;
							onAddToCart({
								gtm: {
									selection: {
										sku,
										attrsByIdentifier: getAttrsByIdentifier(sku.definingAttributes),
										quantity,
										buyable: true,
									},
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
			}
		},
		[
			loginRequired,
			doValidation,
			data,
			availability,
			physicalStore,
			methods,
			ffMethod,
			scheduleForLater,
			showErrorMessage,
			errorMessages.SelectStoreToAddToCart,
			isGeneric,
			settings,
			params,
			currentCartSWRKey,
			showSuccessMessage,
			addedNSuccessfully,
			onAddToCart,
			category,
			notifyError,
		]
	);

	const addToDefaultWishlist = useCallback(
		(_partNumber: string, _quantity: number) => async () => {
			const selections = getSelectionsForLists();
			if (selections.length) {
				setError({});
				const item = selections.map(({ selectedSku, partNumber, quantity: quantityRequested }) => ({
					partNumber: selectedSku?.partNumber ?? partNumber,
					quantityRequested,
				})) as any[];
				const { wishlistId } = await fetchDefaultWishlistOrCreateNew(true)(
					settings?.storeId,
					undefined,
					wlNls.DefaultWishListName.t(),
					params
				);
				const rc = await wishListUpdater(true)(
					settings?.storeId as string,
					wishlistId as string,
					{ item },
					{ addItem: true },
					params
				);
				if (rc) {
					showSuccessMessage(addNItemsSuc.t({ n: item.length }));
				}
			} else {
				setError({ message: messages.selectSomething.t() });
			}
		},
		[
			getSelectionsForLists,
			wlNls.DefaultWishListName,
			settings?.storeId,
			params,
			showSuccessMessage,
			addNItemsSuc,
			messages.selectSomething,
		]
	);

	const addToWishList = useCallback(
		(_partNumber: string, _quantity: number, wishList: WishlistWishlistItem) => async () => {
			const selections = getSelectionsForLists();
			if (selections.length) {
				setError({});
				const item = selections.map(({ selectedSku, partNumber, quantity: quantityRequested }) => ({
					partNumber: selectedSku?.partNumber ?? partNumber,
					quantityRequested,
				})) as any[];
				const rc = await wishListUpdater(true)(
					settings?.storeId as string,
					wishList.uniqueID as string,
					{ item },
					{ addItem: true },
					params
				);
				if (rc) {
					showSuccessMessage(addNItemsSuc.t({ n: item.length }));
				}

				// TODO: add onAddToWishlist event call
				// product && onAddToWishlist(product, quantity);
			} else {
				setError({ message: messages.selectSomething.t() });
			}
		},
		[getSelectionsForLists, settings?.storeId, params, showSuccessMessage, addNItemsSuc, messages]
	);

	const addToRequisitionList = useCallback(
		(requisitionListId: string) => async () => {
			const selections = getSelectionsForLists();
			if (selections.length) {
				await Promise.all(
					selections.map(({ selectedSku, partNumber, quantity }) =>
						requisitionListItemUpdate(true)(
							{
								storeId: settings.storeId,
								langId,
								requisitionListId,
								data: {
									partNumber: selectedSku?.partNumber ?? partNumber,
									quantity: dFix(quantity, 0),
								},
							},
							params
						)
					)
				);
				showSuccessMessage(addNItemsSuc.t({ n: selections.length }));
			} else {
				showErrorMessage(messages.addToCartErrorMsg.t());
			}
		},
		[
			addNItemsSuc,
			getSelectionsForLists,
			messages,
			params,
			settings.storeId,
			showErrorMessage,
			showSuccessMessage,
			langId,
		]
	);

	const onQuantity = (rowNumber: number, quantity: string, partNumber: string) => {
		const { rangePriceList } = getRangePriceRecord(entitledPriceList, partNumber);

		setData((old) => {
			const newData = [...old];
			const currentRow = updatePriceByQuantity(newData[rowNumber], rangePriceList, quantity);
			Object.assign(currentRow, { quantity });
			return newData;
		});
	};

	const onAttributeSelect = useCallback(
		(attrName: string, record: BundleTableRowData) => (event: SelectChangeEvent) => {
			const { attrStates, rowNumber, sKUs = [] } = record;
			const attrValueIdentifier = event.target.value;

			// find a sku with the same attributes as those selected
			const check = { ...attrStates, [attrName]: attrValueIdentifier };
			const sku = findSKU(sKUs, check);

			setData((old) => {
				const selectedSku = sku ? { ...sku } : undefined;
				const attrStates = { ...old[rowNumber].attrStates, [attrName]: attrValueIdentifier };
				old[rowNumber] = { ...old[rowNumber], attrStates, selectedSku };
				const { rangePriceList } = getRangePriceRecord(entitledPriceList, selectedSku?.partNumber);
				updatePriceByQuantity(old[rowNumber], rangePriceList);
				return [...old];
			});
		},
		[entitledPriceList]
	);

	const updateScheduleForLater = useCallback(
		(rowNumber: number, value: ScheduleForLaterType) =>
			setScheduleForLater((prev) => ({ ...prev, [rowNumber]: { ...value } })),
		[]
	);

	const onScheduleForLaterRowNumber = useCallback(
		(rowNumber = -1) =>
			async () =>
				setRowNumberForScheduleForLater(rowNumber),
		[]
	);

	const onScheduleForLaterConfirm = useCallback(
		async (scheduled: ScheduleForLaterType) => {
			updateScheduleForLater(rowNumberForScheduleForLater, scheduled);
			onScheduleForLaterRowNumber()();
		},
		[onScheduleForLaterRowNumber, rowNumberForScheduleForLater, updateScheduleForLater]
	);

	const onScheduleForLaterIconClick = useCallback(
		(rowNumber: number) => (event: MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			onScheduleForLaterRowNumber(rowNumber)();
		},
		[onScheduleForLaterRowNumber]
	);

	const isDeliveryOptionSelected = useCallback(
		(rowNumber: number) =>
			!ffMethod[rowNumber] || ffMethod[rowNumber] === FULFILLMENT_METHOD.DELIVERY,
		[ffMethod]
	);

	const getAvailabilityDetailsForSKU = useCallback(
		(rowNumber: number) => {
			const rowData = data
				.filter(({ quantity }) => dFix(quantity, 0))
				.find((record) => record.rowNumber === rowNumber);
			const partNumber = rowData?.selectedSku?.partNumber ?? rowData?.partNumber;
			return isDeliveryOptionSelected(rowNumber)
				? availability.find(
						(a) => a.partNumber === partNumber && a.storeName === ONLINE_STORE_KEY
				  ) ?? ({} as ProductAvailabilityData)
				: availability.find((a) => a.partNumber === partNumber && a.physicalStoreId);
		},
		[availability, data, isDeliveryOptionSelected]
	);

	const initializePriceData = useCallback(() => {
		if (volumePricingExists(entitledPriceList)) {
			setData((old) =>
				old.map((row) => {
					const { isOneSku, selectedSku, partNumber: rowPartNumber } = row;
					if (isOneSku || selectedSku) {
						const partNumber = isOneSku ? rowPartNumber : selectedSku?.partNumber;
						const { rangePriceList } = getRangePriceRecord(entitledPriceList, partNumber);
						updatePriceByQuantity(row, rangePriceList);
					}
					return row;
				})
			);
		}
	}, [entitledPriceList]);
	const getSelectionPartNumbers = useCallback(() => {
		const selection = data
			.filter(
				({ isOneSku, selectedSku, quantity }) => dFix(quantity, 0) && (isOneSku || selectedSku)
			)
			.map(({ isOneSku, selectedSku, partNumber, quantity }) => ({
				partNumber: isOneSku ? partNumber : (selectedSku?.partNumber as string),
				quantity: dFix(quantity),
			}));
		return selection;
	}, [data]);

	useEffect(() => setData((old) => old.map((row) => ({ ...row, availability }))), [availability]);
	useEffect(() => setData(mapBundleData(components, availability, attributeStates)), [components]); // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => initializePriceData(), [entitledPriceList]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		data,
		physicalStoreName,
		physicalStore,
		addToCart,
		onQuantity,
		onAttributeSelect,
		error,
		addToWishList,
		addToRequisitionList,
		addToDefaultWishlist,
		isLoading,
		ffMethod,
		onFulfillmentMethod,
		entitledPriceList,
		rangePriceList,
		volumePriceDialogState,
		onVolumePriceDialog,
		partNumberForVolumePriceDialog,
		toggleVolumePriceDialog,
		isBackorderSKUAvailable,
		getAvailabilityDetailsForSKU,
		rowNumberForScheduleForLater,
		onScheduleForLaterIconClick,
		isDeliveryOptionSelected,
		scheduleForLater,
		onScheduleForLaterConfirm,
		onScheduleForLaterRowNumber,
		getSelectionPartNumbers,
	};
};
