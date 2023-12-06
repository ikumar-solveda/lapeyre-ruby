/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getInventoryRecord, hasInStock, useInventory } from '@/data/Content/_Inventory';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListItemUpdate } from '@/data/Content/_RequisitionList';
import { wishListUpdater } from '@/data/Content/_WishListDetails';
import { addToCartFetcher, BASE_ADD_2_CART_BODY, useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { getAttrsByIdentifier, useProductDetails } from '@/data/Content/ProductDetails';
import { EventsContext } from '@/data/context/events';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { ShippingMode } from '@/data/types/AllowedShipMode';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { BundleTableRowData, ProductType } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { User, useUser } from '@/data/User';
import {
	getBundleComponentOrSkuAttributes,
	getComponentType,
} from '@/data/utils/getBundleComponentOrSkuAttributes';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { validateBundleSelections } from '@/data/utils/validateBundleSelections';
import { SelectChangeEvent } from '@mui/material';
import { WishlistWishlistItem } from 'integration/generated/transactions/data-contracts';
import { isEqual } from 'lodash';
import { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const EMPTY_SKUS: ProductType[] = [];
const mapBundleData = (components: ProductType[], availability: ProductAvailabilityData[]) =>
	components.map((comp, rowNumber) => {
		const { numberOfSKUs, quantity, sKUs = EMPTY_SKUS } = comp;
		const { attrStates } = getBundleComponentOrSkuAttributes(comp);
		const { isProduct, isVariant } = getComponentType(comp);
		const isOneSku = !((isProduct || isVariant) && numberOfSKUs > 1);
		return {
			...(numberOfSKUs === 1 ? sKUs[0] : comp),
			rowNumber,
			isOneSku,
			attrStates,
			quantity,
			availability,
		} as BundleTableRowData;
	});

const generateOrderItem = (
	record: BundleTableRowData,
	availability: ProductAvailabilityData[],
	storeName: string,
	context: User['context'],
	pickupInStoreShipMode: ShippingMode | undefined
) => {
	const { quantity } = record;
	const { partNumber = '' } = record.selectedSku ?? record;
	const online = getInventoryRecord(availability, partNumber);
	const offline = storeName ? getInventoryRecord(availability, partNumber, storeName) : undefined;
	const inventory = hasInStock(online, dFix(quantity, 0)) ? online : offline;
	return {
		partNumber,
		quantity,
		...(inventory?.physicalStoreId && {
			physicalStoreId: inventory.physicalStoreId,
			shipModeId: pickupInStoreShipMode?.shipModeId,
		}),
	};
};

type Props = {
	pdp: ReturnType<typeof useProductDetails>;
	physicalStoreName: string;
};

const EMPTY_COMPS: ProductType[] = [];
const EMPTY = [] as ProductAvailabilityData[];
const EMPTY_PRODUCT = {} as ProductType;

export const useBundleDetailsTable = ({ pdp, physicalStoreName }: Props) => {
	const { onAddToCart } = useContext(EventsContext);
	const { addedNSuccessfully, addNItemsSuc } = useLocalization('success-message');
	const messages = useLocalization('productDetail');
	const router = useNextRouter();

	const { product = EMPTY_PRODUCT, loginRequired, category } = pdp;
	const { components = EMPTY_COMPS } = product;
	const { pickupInStoreShipMode: pickupMode } = useAllowableShippingModes();
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const { mutateCart } = useCart();
	const { user } = useUser();
	const context = useMemo(() => user?.context, [user]);
	const { settings } = useSettings();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();

	const partNumbers = useMemo(
		() =>
			components.flatMap((comp) => [
				...(getComponentType(comp).isItem
					? [comp.partNumber]
					: comp.sKUs?.map((sku) => sku.partNumber) ?? []),
			]),
		[components]
	);

	const { availability = EMPTY } = useInventory(partNumbers.join(','), physicalStoreName);
	const [data, setData] = useState<BundleTableRowData[]>(mapBundleData(components, availability));
	const [error, setError] = useState<{ message?: string }>();

	const doValidation = useCallback(() => {
		let rc = true;
		const { someWithNoAvl, someWithNoSkus, someWithNotEnough, noItems } = validateBundleSelections(
			data,
			physicalStoreName
		);

		if (someWithNoAvl || someWithNoSkus || someWithNotEnough || noItems) {
			if (noItems) {
				setError({ message: messages.selectSomething.t() });
			} else if (someWithNoAvl) {
				setError({ message: messages.someWithNoAvlPlsRemove.t() });
			} else if (someWithNoSkus) {
				setError({ message: messages.someWithNoSkus.t() });
			} else {
				setError({ message: messages.someWithNotEnough.t() });
			}
			rc = false;
		}
		return rc;
	}, [data, messages, physicalStoreName]);

	/**
	 * Add the selected product and its quantities to the shopping cart
	 */
	const addToCart = useCallback(
		async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();

			if (loginRequired()) {
				return;
			}

			const validated = doValidation();
			if (validated) {
				setError({});
				const orderItem = data
					.filter(({ quantity }) => dFix(quantity, 0))
					.map((record) =>
						generateOrderItem(record, availability, physicalStoreName, context, pickupMode)
					);

				const body = { ...BASE_ADD_2_CART_BODY, orderItem };
				try {
					await addToCartFetcher(true)(settings?.storeId ?? '', {}, body, params);
					await mutateCart();

					// notification
					showSuccessMessage(addedNSuccessfully.t({ v: orderItem.length }), true);

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
			physicalStoreName,
			context,
			pickupMode,
			settings,
			params,
			mutateCart,
			showSuccessMessage,
			addedNSuccessfully,
			notifyError,
			category,
			onAddToCart,
		]
	);

	const addToWishList = useCallback(
		(_partNumber: string, _quantity: number, wishList: WishlistWishlistItem) => async () => {
			const selections = data.filter(
				({ isOneSku, selectedSku, quantity }) => dFix(quantity, 0) && (isOneSku || selectedSku)
			);
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
		[data, settings?.storeId, params, showSuccessMessage, addNItemsSuc, messages]
	);

	const addToRequisitionList = useCallback(
		(requisitionListId: string) => async () => {
			const selections = data.filter(
				({ isOneSku, selectedSku, quantity }) => dFix(quantity, 0) && (isOneSku || selectedSku)
			);
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
			data,
			messages,
			params,
			settings.storeId,
			showErrorMessage,
			showSuccessMessage,
			langId,
		]
	);

	const onQuantity = (rowNumber: number, value: string) => {
		setData((old) => {
			old[rowNumber] = { ...old[rowNumber], quantity: value };
			return [...old];
		});
	};

	const onAttributeSelect = useCallback(
		(attrName: string, record: BundleTableRowData) => (event: SelectChangeEvent) => {
			const { attrStates, rowNumber, sKUs = [] } = record;
			const attrValueIdentifier = event.target.value;

			// find a sku with the same attributes as those selected
			const check = { ...attrStates, [attrName]: attrValueIdentifier };
			const sku = sKUs.find(({ definingAttributes }) => {
				const skuAttrs = definingAttributes.reduce(
					(all, attr) => ({ ...all, [attr.identifier]: attr.values[0]?.identifier }),
					{}
				);

				return isEqual(check, skuAttrs);
			});

			setData((old) => {
				const selectedSku = sku ? { ...sku } : undefined;
				const attrStates = { ...old[rowNumber].attrStates, [attrName]: attrValueIdentifier };
				old[rowNumber] = { ...old[rowNumber], attrStates, selectedSku };
				return [...old];
			});
		},
		[]
	);

	useEffect(() => setData(mapBundleData(components, availability)), [components, availability]);

	return {
		data,
		physicalStoreName,
		addToCart,
		onQuantity,
		onAttributeSelect,
		error,
		addToWishList,
		addToRequisitionList,
	};
};
