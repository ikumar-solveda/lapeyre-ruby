/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PICKUP_ON_BEHALF, SELF_PICKUP, BOPIS } from '@/data/constants/checkout';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { useNotifications } from '@/data/Content/Notifications';
import { useSettings } from '@/data/Settings';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { SelfPickupType, NonSelfPickupType } from '@/data/types/CheckOut';
import { OrderItem } from '@/data/types/Order';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { CartUsableShippingInfo } from 'integration/generated/transactions/data-contracts';
import { useCallback, useState } from 'react';

type Props = {
	usableShipping: CartUsableShippingInfo | undefined;
	orderItems: OrderItem[];
	next: () => void;
};
export const usePickup = ({ usableShipping, orderItems, next }: Props) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { storeLocator } = useStoreLocatorState();
	const [selfPickup, setSelfPickup] = useState<boolean>(true);
	const toggleSelfPickup = useCallback(() => setSelfPickup((pre) => !pre), []);
	const { notifyError } = useNotifications();

	const initShipModeIdAndStoreId = useCallback(() => {
		const physicalStoreId = storeLocator.selectedStore?.id;

		const shipModeId =
			usableShipping?.orderItem
				?.at(0)
				?.usableShippingMode?.find((m) => m.shipModeCode === SHIP_MODE_CODE_PICKUP)?.shipModeId ??
			'';

		return { physicalStoreId, shipModeId };
	}, [storeLocator.selectedStore?.id, usableShipping?.orderItem]);

	const initBody = useCallback(
		(shipModeId: string | undefined, physicalStoreId: string, shipInstructions?: string) => {
			const orderItem = shipInstructions
				? orderItems.map(() => ({ shipInstructions, shipModeId, physicalStoreId }))
				: orderItems.map(() => ({ shipModeId, physicalStoreId }));

			const body = { shipModeId, addressId: '', orderItem, physicalStoreId };

			return { body };
		},
		[orderItems]
	);

	const submitPickupDetails = useCallback(
		async (values: SelfPickupType | NonSelfPickupType) => {
			const shipInstructions = JSON.stringify({
				...values,
				type: selfPickup ? SELF_PICKUP : PICKUP_ON_BEHALF,
			});

			const { physicalStoreId, shipModeId } = initShipModeIdAndStoreId();

			const { body } = initBody(shipModeId, physicalStoreId, shipInstructions);
			try {
				await shippingInfoUpdateFetcher(settings?.storeId ?? '', {}, body, params);
				next();
			} catch (e) {
				notifyError(processShippingInfoUpdateError(e as TransactionErrorResponse, BOPIS));
			}
		},
		[next, notifyError, params, selfPickup, settings?.storeId, initShipModeIdAndStoreId, initBody]
	);

	const continueToPickupDetails = useCallback(async () => {
		const { physicalStoreId, shipModeId } = initShipModeIdAndStoreId();

		const { body } = initBody(shipModeId, physicalStoreId);

		try {
			await shippingInfoUpdateFetcher(settings?.storeId ?? '', {}, body, params);
			next();
		} catch (e) {
			notifyError(processShippingInfoUpdateError(e as TransactionErrorResponse, BOPIS));
		}
	}, [initBody, initShipModeIdAndStoreId, next, notifyError, params, settings?.storeId]);

	return {
		selfPickup,
		toggleSelfPickup,
		submitPickupDetails,
		continueToPickupDetails,
	};
};
