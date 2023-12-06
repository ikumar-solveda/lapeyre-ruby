/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { InventoryStatusType } from '@/components/content/Bundle/parts/Table/Availability';
import { BASE_ADD_2_CART_BODY, addToCartFetcher } from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useInventory } from '@/data/Content/_Inventory';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { usePromo } from '@/data/Content/_Promos';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { useWishRequisitionList } from '@/data/Content/_WishRequisitionList';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { STRING_TRUE, USAGE_OFFER } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE, TYPES } from '@/data/constants/product';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { useProductInfoState } from '@/data/state/useProductInfoState';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Price, ProductType, Selection, SkuListTableData } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { getAttrsByIdentifier, mapProductDetailsData } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { get, keyBy } from 'lodash';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';

type Props = {
	partNumber: string;
	physicalStoreName?: string;
};

const EMPTY = [] as ProductAvailabilityData[];
export const EMPTY_PRODUCT = {} as ProductType;

export const useSkuListTable = ({ partNumber, physicalStoreName }: Props) => {
	const { onAddToCart } = useContext(EventsContext);
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const { storeLocator } = useStoreLocatorState();
	const { settings } = useSettings();
	const productDetailNLS = useLocalization('productDetail');
	const success = useLocalization('success-message');
	const { user } = useUser();
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const routes = useLocalization('Routes');
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
	const { pickupInStoreShipMode } = useAllowableShippingModes();
	const loginStatus = user?.isLoggedIn;
	const isSkuListTableDisplayed =
		product?.type === TYPES.product || product?.type === TYPES.variant;
	const { promos } = usePromo(product?.id);
	const attrSz = useMemo(
		() =>
			product?.definingAttributes &&
			product?.definingAttributes?.length > SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE
				? SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE
				: product?.definingAttributes?.length,

		[product]
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
	const { availability = EMPTY } = useInventory(partNumbers.join(','), physicalStoreName);

	const data = useMemo(
		() =>
			skuList?.map(
				(sku) =>
					({
						...sku,
						availability,
					} as SkuListTableData)
			) ?? [],
		[skuList, availability]
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

	const loginRequired = useCallback(() => {
		if (!loginStatus && isB2BStore(settings)) {
			router.push(routes.Login.route.t());
			return true;
		} else {
			return false;
		}
	}, [loginStatus, router, routes, settings]);

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
			if (loginRequired()) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();
			const partNumbers = skuAndQuantities ? Object.keys(skuAndQuantities) : [];
			if (partNumbers.length > 0) {
				const orderItems = partNumbers.map((partNumber) => ({
					partNumber,
					quantity: skuAndQuantities[partNumber].toString(),
					...(skuAndPickupMode[partNumber] !== EMPTY_STRING && {
						shipModeId: skuAndPickupMode[partNumber],
						physicalStoreId: storeLocator.selectedStore?.id,
					}),
				}));

				const data = { ...BASE_ADD_2_CART_BODY, orderItem: orderItems };
				try {
					await addToCartFetcher(true)(settings?.storeId ?? '', {}, data, params);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
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
			byPartNumber,
			loginRequired,
			notifyError,
			onAddToCart,
			params,
			productDetailNLS,
			settings,
			showErrorMessage,
			showSuccessMessage,
			skuAndPickupMode,
			skuAndQuantities,
			storeLocator.selectedStore?.id,
			success.ITEMS_N_TO_CART,
			category,
		]
	);

	const addToRequisitionList = useCallback(
		(requisitionListId: string) => async () => {
			if (skuAndQuantities && Object.keys(skuAndQuantities).length > 0) {
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
		]
	);

	const addToWishList = useCallback(
		(_partNumber: string, _quantity: number, wishList: WishlistWishlistItem) => async () => {
			if (skuAndQuantities && Object.keys(skuAndQuantities).length > 0) {
				const item = Object.keys(skuAndQuantities).map((key) => ({
					partNumber: key,
					quantityRequested: skuAndQuantities[key].toString(),
				})) as any[];
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
		]
	);

	useEffect(() => {
		removeData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setSelection(productOrSkuListSelection);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productOrSkuListSelection]);

	return {
		attrSz,
		data,
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
	};
};
