/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BOPIS, PICKUP_ON_BEHALF, SELF_PICKUP } from '@/data/constants/checkout';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS, SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { useNotifications } from '@/data/Content/Notifications';
import { useSettings } from '@/data/Settings';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { NonSelfPickupType, SelfPickupType } from '@/data/types/CheckOut';
import { OrderItem } from '@/data/types/Order';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { isSelfPickup } from '@/data/utils/pickup';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { CartUsableShippingInfo } from 'integration/generated/transactions/data-contracts';
import { useCallback, useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';

type Props = {
	usableShipping: CartUsableShippingInfo | undefined;
	orderItems: OrderItem[];
	next: () => void;
};

export const usePickup = ({ usableShipping, orderItems, next }: Props) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { storeLocator } = useStoreLocatorState();
	const shipInstruction = useMemo<SelfPickupType | NonSelfPickupType | null>(() => {
		const instruction = orderItems?.at(0)?.shipInstruction;
		if (instruction) {
			return JSON.parse(instruction);
		} else {
			return null;
		}
	}, [orderItems]);
	const [selfPickup, setSelfPickup] = useState<boolean>(
		() => !shipInstruction || isSelfPickup(shipInstruction)
	);
	const toggleSelfPickup = useCallback(() => setSelfPickup((pre) => !pre), []);
	const { notifyError } = useNotifications();
	const { mutate } = useSWRConfig();

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
				? orderItems.map(({ orderItemId }) => ({
						orderItemId,
						shipInstructions,
						shipModeId,
						physicalStoreId,
				  }))
				: orderItems.map(({ orderItemId }) => ({ orderItemId, shipModeId, physicalStoreId }));

			const body = {
				addressId: '',
				orderItem,
				x_calculateOrder: ORDER_CONFIGS.calculateOrder,
				x_calculationUsage: ORDER_CONFIGS.calculationUsage,
				x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
				x_allocate: ORDER_CONFIGS.allocate,
				x_backorder: ORDER_CONFIGS.backOrder,
				x_remerge: ORDER_CONFIGS.remerge,
				x_check: ORDER_CONFIGS.check,
				orderId: '.',
			};

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
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
				next();
			} catch (e) {
				notifyError(processShippingInfoUpdateError(e as TransactionErrorResponse, BOPIS));
			}
		},
		[selfPickup, initShipModeIdAndStoreId, initBody, settings, params, mutate, next, notifyError]
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
		shipInstruction,
	};
};
