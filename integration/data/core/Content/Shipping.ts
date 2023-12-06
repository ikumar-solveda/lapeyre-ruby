/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useOrganizationDetails } from '@/data/Content/OrganizationDetails';
import { contactCreator, contactUpdater, usePersonContact } from '@/data/Content/PersonContact';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import {
	getUniqueAddresses,
	getUniqueShippingMethods,
	isUsingAllowedValues,
	shippingInfoUpdateFetcher,
} from '@/data/Content/_ShippingInfo';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ORDER_CONFIGS, SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { Address, EditableAddress } from '@/data/types/Address';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Order, OrderItem } from '@/data/types/Order';
import { initializeSelectedOrderItemsForShipping } from '@/data/utils/initializeSelectedOrderItemsForShipping';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { validateAddress } from '@/data/utils/validateAddress';
import { CartUsableShippingInfo } from 'integration/generated/transactions/data-contracts';
import { intersectionBy, keyBy, pickBy, uniqBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyedMutator, useSWRConfig } from 'swr';

const EMPTY_ARRAY: OrderItem[] = [];

export const useShipping = ({
	orderItems = EMPTY_ARRAY,
	mutateUsableShippingInfo,
	usableShipping,
	mutateCart,
}: {
	orderItems: OrderItem[];
	mutateCart: KeyedMutator<Order | undefined>;
	mutateUsableShippingInfo: KeyedMutator<CartUsableShippingInfo>;
	usableShipping: CartUsableShippingInfo | undefined;
}) => {
	const { notifyError, showSuccessMessage } = useNotifications();
	const { mutate } = useSWRConfig();
	const { user } = useUser();

	/**
	 * most of the data are depends on service response and not using local states.
	 * each selection click on shipping page will trigger a shipinfo update call
	 * to Commerce server, and the `mutate`s will fetch updated information for displaying.
	 */

	const { shippingAddress: personals, mutateShippingAddress } = usePersonContact();
	const { org, parentOrg } = useOrganizationDetails();
	const entriesByOrderItemId = useMemo(
		() => keyBy(usableShipping?.orderItem ?? [], 'orderItemId'),
		[usableShipping]
	);
	const shippingAddress = useMemo(
		() => [...personals, ...org.addresses, ...parentOrg.addresses],
		[org, personals, parentOrg]
	);
	const homelessGuest = useMemo(
		() => !user?.isLoggedIn && shippingAddress.length === 0,
		[user, shippingAddress]
	);

	const [updated, setUpdated] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<OrderItem[]>(
		// size is initially either 0 or all
		// 0 means auto toggle to multiple shipment table
		homelessGuest || orderItems.length === 1
			? [...orderItems]
			: initializeSelectedOrderItemsForShipping(orderItems, entriesByOrderItemId)
	);
	const multiOnly = useMemo(() => {
		const methods = getUniqueShippingMethods(usableShipping, orderItems);
		const addresses = getUniqueAddresses(usableShipping, shippingAddress, orderItems);
		return !homelessGuest && (!addresses.length || !methods.length);
	}, [orderItems, usableShipping, shippingAddress, homelessGuest]);

	useEffect(
		// update existing selected items with latest info, NOT intend to update to new set of items.
		() => {
			setSelectedItems((pre) =>
				pre.length > 0
					? intersectionBy(orderItems, pre, 'orderItemId')
					: homelessGuest || orderItems.length === 1
					? [...orderItems]
					: initializeSelectedOrderItemsForShipping(orderItems, entriesByOrderItemId)
			);
		},
		[orderItems, entriesByOrderItemId] // eslint-disable-line react-hooks/exhaustive-deps
	);

	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const cardText = useLocalization('AddressCard');

	/**
	 * addressToEdit and editableAddress are basically same, only differ by addressId if it is existing address.
	 * if addressId exist in addressToEdit, means we are updating, otherwise we are adding a new address
	 */
	const [addressToEdit, setAddressToEdit] = useState<EditableAddress | null>(null);
	const editableAddress = useMemo<EditableAddress | null>(
		() =>
			addressToEdit
				? (pickBy(addressToEdit, (_value, key) => key !== 'addressId') as EditableAddress)
				: null,
		[addressToEdit]
	);

	const success = useLocalization('success-message');

	const availableMethods = useMemo(
		() => getUniqueShippingMethods(usableShipping, selectedItems),
		[usableShipping, selectedItems]
	);
	const methodsByMode = useMemo(() => keyBy(availableMethods, 'shipModeId'), [availableMethods]);

	const availableAddress = useMemo(
		() => getUniqueAddresses(usableShipping, shippingAddress, selectedItems),
		[usableShipping, shippingAddress, selectedItems]
	);

	const selectedAddress = useMemo(() => {
		const uniqueByAddress = uniqBy(selectedItems, 'addressId');
		if (uniqueByAddress.length !== 1) {
			return {};
		} else {
			const id = uniqueByAddress.at(0)?.addressId;
			return availableAddress.find(({ addressId }) => addressId === id);
		}
	}, [selectedItems, availableAddress]);

	const selectedShipModeId = useMemo(() => {
		const uniqueByShipMode = uniqBy(selectedItems, 'shipModeId').filter(
			({ shipModeCode }) => shipModeCode !== SHIP_MODE_CODE_PICKUP
		);
		if (uniqueByShipMode.length !== 1) {
			return '';
		} else {
			return uniqueByShipMode.at(0)?.shipModeId;
		}
	}, [selectedItems]);

	const updateShippingInfo = useCallback(
		async (props: { addressId: string; nickName?: string; shipModeId?: string }) => {
			const selectItemIds = keyBy(selectedItems.map(({ orderItemId }) => orderItemId));
			const anyNonPickupMethod =
				selectedItems.find(({ shipModeId }) => methodsByMode[shipModeId])?.shipModeId ??
				availableMethods[0].shipModeId;
			const { nickName, ...rest } = props;
			const data = {
				x_calculateOrder: ORDER_CONFIGS.calculateOrder,
				x_calculationUsage: ORDER_CONFIGS.calculationUsage,
				x_allocate: ORDER_CONFIGS.allocate,
				x_backorder: ORDER_CONFIGS.backOrder,
				x_remerge: ORDER_CONFIGS.remerge,
				x_check: ORDER_CONFIGS.check,
				orderId: '.',
				orderItem: selectedItems
					.map(({ orderItemId, shipModeId }) => ({
						orderItemId,
						shipModeId: methodsByMode[shipModeId]?.shipModeId ?? anyNonPickupMethod,
						...rest,
					}))
					.concat(
						// multiple shipment
						orderItems
							// maybe address was updated to a different addressId
							.filter(
								({ nickName: _nickName, orderItemId: itemId }) =>
									_nickName === nickName && !selectItemIds[itemId]
							)
							.map(({ orderItemId, shipModeId }) => ({
								...rest, // update address-id if necessary in other items
								orderItemId,
								shipModeId, // don't overwrite other items' existing ship-mode-id
							}))
					),
			};
			try {
				await shippingInfoUpdateFetcher(settings?.storeId ?? '', {}, data, params);
				await mutateCart();
				await mutateUsableShippingInfo();
				setUpdated(true);
			} catch (e) {
				notifyError(processShippingInfoUpdateError(e as TransactionErrorResponse));
			}
		},
		[
			mutateCart,
			mutateUsableShippingInfo,
			notifyError,
			orderItems,
			selectedItems,
			settings?.storeId,
			params,
			methodsByMode,
			availableMethods,
		]
	);

	const toggleEditCreateAddress = useCallback(
		(address: EditableAddress | null) => () => {
			setAddressToEdit(address);
		},
		[]
	);

	const onAddressEditOrCreate = useCallback(
		async (address: EditableAddress) => {
			const { addressLine1, addressLine2, nickName, ..._address } = address;

			let addressId = '';
			const msgKey = addressToEdit?.addressId ? 'EDIT_ADDRESS_SUCCESS' : 'ADD_ADDRESS_SUCCESS';
			try {
				if (addressToEdit?.addressId) {
					// if addressToEdit has addressId, means update, create otherwise.
					const data = { addressLine: [addressLine1, addressLine2 ?? ''], ..._address };
					const res = await contactUpdater(true)(
						settings?.storeId ?? '',
						nickName,
						undefined,
						data,
						params
					);
					addressId = res?.addressId ?? '';
				} else {
					const data = { addressLine: [addressLine1, addressLine2 ?? ''], nickName, ..._address };
					const res = await contactCreator(true)(settings?.storeId ?? '', undefined, data, params);
					addressId = res?.addressId ?? '';
				}
				showSuccessMessage(success[msgKey].t([address.nickName]));

				updateShippingInfo({ addressId, nickName });
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
				setAddressToEdit(null);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			addressToEdit?.addressId,
			showSuccessMessage,
			success,
			updateShippingInfo,
			mutate,
			settings?.storeId,
			params,
			notifyError,
		]
	);

	const getCardActions = (address: EditableAddress, selected?: Address) => {
		const { addressId, nickName, isOrgAddress } = address;
		const isSelected = addressId === selected?.addressId || nickName === selected?.nickName;
		return [
			!isOrgAddress && {
				text: cardText.EditButton.t(),
				handleClick: toggleEditCreateAddress(address),
			},
			!isSelected &&
				addressId && {
					text: cardText.UseAddress.t(),
					variant: 'outlined',
					handleClick: async () => await updateShippingInfo({ addressId, nickName }),
				},
		].filter(Boolean);
	};

	const isSelectedShippingValid = useCallback(
		(item: OrderItem) => {
			let rc = false;
			if (validateAddress(item)) {
				rc = isUsingAllowedValues(item, entriesByOrderItemId);
			}
			return rc;
		},
		[entriesByOrderItemId]
	);

	const validateOrderShippingSelections = useCallback(
		() => orderItems.every(isSelectedShippingValid),
		[isSelectedShippingValid, orderItems]
	);

	const canSelectTogether = useCallback(
		(ids: string[], isGuest: boolean) => {
			const byId = keyBy(ids);
			const items = orderItems.filter(({ orderItemId }) => byId[orderItemId]);
			let can = isGuest;
			if (!can) {
				const addresses = getUniqueAddresses(usableShipping, shippingAddress, items);
				const methods = getUniqueShippingMethods(usableShipping, items);
				can = !!(addresses.length && methods.length);
			}
			return { can, items };
		},
		[orderItems, shippingAddress, usableShipping]
	);

	const [showError, setShowError] = useState<boolean | string>(false);

	useEffect(() => {
		setShowError(false);
	}, [orderItems, selectedItems]);

	return {
		selectedItems,
		setSelectedItems,
		availableMethods,
		availableAddress,
		mutateShippingAddress,
		selectedAddress,
		selectedShipModeId,
		updateShippingInfo,
		toggleEditCreateAddress,
		editableAddress,
		addressToEdit,
		onAddressEditOrCreate,
		getCardActions,
		showError,
		setShowError,
		isSelectedShippingValid,
		validateOrderShippingSelections,
		updated,
		setUpdated,
		canSelectTogether,
		multiOnly,
	};
};
