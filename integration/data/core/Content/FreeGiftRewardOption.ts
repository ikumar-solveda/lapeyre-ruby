/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useCartSWRKey } from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useNotifications } from '@/data/Content/Notifications';
import { cartUpdateRewardOption } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CartRewardOption } from '@/data/types/Order';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { mapProductData } from '@/data/utils/mapProductData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import {
	CartRewardOptionRewardChoiceGiftItem,
	CartRewardOptionRewardSpecGiftItem,
} from 'integration/generated/transactions/data-contracts';
import { keyBy, keys } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

const EMPTY_CHOICE = [] as CartRewardOptionRewardChoiceGiftItem[];
const EMPTY_SPEC = [] as CartRewardOptionRewardSpecGiftItem[];

type SpecGiftItem = CartRewardOptionRewardSpecGiftItem & { value: number; selected: boolean };

export const useFreeGiftRewardOption = ({
	rewardOption,
	orderId,
}: {
	rewardOption: CartRewardOption;
	orderId: string;
}) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { storeId } = settings;
	const { notifyError } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language

	const {
		rewardSpecGiftItem = EMPTY_SPEC,
		rewardChoiceGiftItem = EMPTY_CHOICE,
		rewardOptionId,
		rewardSpecMaxQuantity,
	} = rewardOption;
	const productId = useMemo(
		() => rewardSpecGiftItem?.map(({ productId }) => productId ?? '').filter(Boolean) ?? [],
		[rewardSpecGiftItem]
	);

	const { data: products, isLoading } = useSWR(
		settings?.storeId && productId.length
			? [
					{ storeId: settings.storeId, id: productId, currency: settings.defaultCurrency },
					PRODUCT_DATA_KEY,
			  ]
			: null,
		async ([{ storeId, id, currency }]) => productFetcher(true)({ storeId, id, currency }, params)
	);

	const productMap = useMemo(
		() => keyBy(products?.contents?.map(mapProductData), 'id'),
		[products]
	);
	const partNumberMap = useMemo(() => keyBy(products?.contents, 'partNumber'), [products]);

	const partNumber = useMemo(() => keys(partNumberMap).join(','), [partNumberMap]);
	const { availability, mutateInventory } = useInventoryV2({ partNumber });

	const availabilityMap = useMemo(
		() =>
			keyBy(
				availability?.map(
					(avail) =>
						({
							...avail,
							productId: partNumberMap[avail.partNumber]?.id ?? '',
						} as unknown as ProductAvailabilityData)
				),
				'productId'
			),
		[availability, partNumberMap]
	);
	const specGiftItems = useMemo(
		() =>
			rewardSpecGiftItem.flatMap((item) => {
				const _item = { ...item, value: 1, selected: false } as SpecGiftItem;
				const _selectedItem = { ...item, value: 1, selected: true } as SpecGiftItem;
				const specQuantity = Number(item.value || 1);
				const chosen = rewardChoiceGiftItem.find(
					({ productId }) =>
						productId === item.productId && availabilityMap[item.productId ?? '']?.status
				);
				const chosenQuantity = chosen ? Number(chosen.quantity || 1) : 0;
				return [...Array<SpecGiftItem>(chosenQuantity)]
					.map(() => ({ ..._selectedItem }))
					.concat([...Array(specQuantity - chosenQuantity)].map(() => ({ ..._item })));
			}),
		[rewardChoiceGiftItem, rewardSpecGiftItem, availabilityMap]
	);

	const maxQuantity = Number(rewardSpecMaxQuantity);

	const allowSelect = specGiftItems.filter(({ selected }) => selected).length < maxQuantity;

	const filteredSpecGiftItems = specGiftItems.filter(
		(item) => item.productId && productMap[item.productId]
	) as Required<(typeof specGiftItems)[number]>[];

	const updateReward = useCallback(
		(specItem: SpecGiftItem) => async () => {
			const choice = specGiftItems.reduce(
				(acc, item) => {
					if (
						(item === specItem && !item.selected && item.productId) ||
						(item !== specItem &&
							item.selected &&
							item.productId &&
							availabilityMap[item.productId].status)
					) {
						acc.catEntryId.push(item.productId);
						acc.quantity.push(1);
					}
					return acc;
				},
				{
					catEntryId: [],
					quantity: [],
					rewardOptionId,
					calculationUsage: ORDER_CONFIGS.calculationUsage,
					orderId,
				} as {
					catEntryId: string[];
					quantity: number[];
					rewardOptionId: string;
					calculationUsage: string;
					orderId: string;
				}
			);
			try {
				await cartUpdateRewardOption(true)(storeId, undefined, choice, params);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING)); // mutate swr with key for swr hooks on current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			availabilityMap,
			currentCartSWRKey,
			notifyError,
			orderId,
			params,
			rewardOptionId,
			specGiftItems,
			storeId,
		]
	);

	useEffect(() => {
		mutateInventory && mutateInventory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rewardOption]);

	return {
		specGiftItems,
		productMap,
		updateReward,
		allowSelect,
		maxQuantity,
		availabilityMap,
		isLoading,
		filteredSpecGiftItems,
	};
};
