/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { cartCalculator, orderCopier } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { orderByIdFetcher } from '@/data/Content/_Order';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Order } from '@/data/types/Order';
import { generateCopyOrderMessage } from '@/data/utils/generateCopyOrderMessage';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import type { OrderOrderDetail } from 'integration/generated/transactions/data-contracts';
import { MouseEvent } from 'react';

export const useOrderReOrder = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data: cart, mutateCart } = useCart();
	const { showSuccessMessage, showErrorMessage, notifyError } = useNotifications();
	const errorMessages = useLocalization('error-message');
	const params = useExtraRequestParameters();

	const countItems = (order: Order | OrderOrderDetail | undefined) =>
		order?.orderItem
			?.map(({ quantity }) => dFix(quantity ?? 0, 0))
			.reduce((tally, current) => tally + current, 0) ?? 0;

	const onReOrder = (fromOrderId: string) => async (_e: MouseEvent<HTMLButtonElement>) => {
		try {
			// fetch order to get access to its order-items
			const sourceOrder = await orderByIdFetcher(true)(storeId, fromOrderId, undefined, params);

			// count how many items are in the order
			const itemCount = countItems(sourceOrder);

			// also count how many items are in the current cart
			const cartItemsBefore = countItems(cart);

			// try to copy the order
			const copiedCart = await orderCopier(true)({
				fromOrderId,
				storeId,
				langId,
				query: undefined,
				params,
			});

			// now count items in copied-cart
			const cartItemsAfter = countItems(copiedCart);

			if (cartItemsAfter > cartItemsBefore) {
				// also need to call calculate -- since the copy_order API doesn't
				await cartCalculator(true)({ storeId, query: undefined, params });

				// notify everyone else of the update
				mutateCart();

				const fullCopy = cartItemsAfter === cartItemsBefore + itemCount;
				const { text } = generateCopyOrderMessage({ fullCopy });
				showSuccessMessage(text, true);
			} else {
				// nothing was copied -- notify with an error
				showErrorMessage(errorMessages.NoCopyOrderItems.t());
			}
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		onReOrder,
	};
};
