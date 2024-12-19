/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	BASE_ADD_2_CART_BODY,
	addToCartFetcherV2 as addToCartFetcher,
	useCartSWRKey,
} from '@/data/Content/Cart';
import { useCategory } from '@/data/Content/Category';
import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNotifications } from '@/data/Content/Notifications';
import { useSiteContentSuggestions } from '@/data/Content/SiteContentSuggestions';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLoginRedirectRequired } from '@/data/Content/_LoginRedirectRequired';
import { productFetcher } from '@/data/Content/_Product';
import { getLocalization, useLocalization } from '@/data/Localization';
import { dFix, getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC,
	DATA_KEY_QUICK_ORDER_SKU_DETAILS,
} from '@/data/constants/dataKey';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { QUICK_ORDER_INITIAL_VALUES } from '@/data/constants/order';
import { EventsContext } from '@/data/context/events';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductQueryResponse, ProductType, ResponseProductType } from '@/data/types/Product';
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { mapProductData } from '@/data/utils/mapProductData';
import { getAttrsByIdentifier } from '@/data/utils/mapProductDetailsData';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { AutocompleteInputChangeReason } from '@mui/material';
import type { ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription } from 'integration/generated/transactions/data-contracts';
import { debounce, keyBy, sortBy } from 'lodash';
import { SyntheticEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export const getQuickOrder = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([getLocalization(cache, locale, 'QuickOrder')]);
	await getFlexFlowStoreFeature({ cache, id: EMS_STORE_FEATURE.GUEST_SHOPPING, context });
};

export const getOptionLabel = (option?: ProductSuggestionEntry) => {
	if (option?.partNumber) {
		return `${option.partNumber} (${option.name})`;
	} else {
		return '';
	}
};

const dataMap = (response?: ProductQueryResponse) => {
	const contents = extractContentsArray(response) as ResponseProductType[];
	return contents.map(mapProductData);
};

const getParentCategoryIds = (products: ProductType[]) =>
	products.map((product) => getParentCategoryFromSlashPath(product?.parentCatalogGroupID));

export const quickOrderInitialValue = {
	...(Array.from({ length: QUICK_ORDER_INITIAL_VALUES }) as any[]).reduce(
		(agg, _, index) => ({
			...agg,
			[`line${index}Qty`]: '',
			[`line${index}Item`]: null,
		}),
		{} as Record<string, string | ProductSuggestionEntry | ProductSuggestionEntry[] | null>
	),
} as Record<string, string | ProductSuggestionEntry | ProductSuggestionEntry[] | null>;

export const useQuickOrder = () => {
	const [maxValues, setMaxValues] = useState<number>(QUICK_ORDER_INITIAL_VALUES);
	const [partNumbers, setPartNumbers] = useState<string>('');
	const [options, setOptions] = useState<Record<string, ProductSuggestionEntry[]>>({});
	const { settings } = useSettings();
	const { user } = useUser();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const isGenericUser = user?.isGeneric ?? false;
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError, showErrorMessage } = useNotifications();
	const labels = useLocalization('QuickOrder');
	const { onAddToCart } = useContext(EventsContext);
	const { storeLocator } = useStoreLocatorState();
	const { pickupInStoreShipMode } = useAllowableShippingModes();
	const { ga4, ua } = useMemo(() => getGTMConfig(settings), [settings]);
	const { fetchPartNumberSuggestion } = useSiteContentSuggestions();
	const { redirectToLoginIfNeed, loginStatus, guestShoppingEnabled } = useLoginRedirectRequired();
	const { availability } = useInventoryV2({
		partNumber: partNumbers,
		physicalStore: storeLocator.selectedStore,
	});
	const showOrderButton = guestShoppingEnabled || loginStatus;
	const [fetchDetailsFor, setFetchDetailsFor] = useState<
		{ partNumber: string; quantity: string }[]
	>([]);
	const { data: _skuDetails } = useSWR(
		fetchDetailsFor.length && partNumbers.length
			? [
					{
						storeId: settings.storeId,
						partNumber: partNumbers.split(','),
						...getContractIdParamFromContext(user?.context),
						...getCurrencyParamFromContext(user?.context),
					},
					DATA_KEY_QUICK_ORDER_SKU_DETAILS,
			  ]
			: null,
		async ([{ storeId, partNumber, currency }]) =>
			productFetcher(true)({ storeId, partNumber, currency }, params)
	);
	const skuDetails = useMemo(() => dataMap(_skuDetails), [_skuDetails]);
	const { rawData: categories } = useCategory(
		skuDetails.length ? getParentCategoryIds(skuDetails) : ''
	);

	const onSubmit = useCallback(
		async (values: typeof quickOrderInitialValue) => {
			const orderItem = Array.from({ length: maxValues })
				.map((_, index) => ({
					item: values[`line${index}Item`] as ProductSuggestionEntry,
					qty: values[`line${index}Qty`] as string,
					index,
				}))
				.filter(({ item, qty }) => item?.partNumber?.trim() && qty?.trim())
				.map(({ item, qty: quantity }) => {
					const iv =
						availability?.find((a) => a.partNumber === item?.partNumber && a.status) ??
						availability?.find((a) => a.partNumber === item?.partNumber && a.physicalStoreStatus);

					return {
						partNumber: item?.partNumber as string,
						quantity,
						...(iv?.physicalStoreId && {
							physicalStoreId: iv.physicalStoreId,
							shipModeId: pickupInStoreShipMode?.shipModeId,
						}),
					};
				});
			if (orderItem.length === 0) {
				showErrorMessage(labels.ErrorMsg.t());
			} else {
				const data: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription = {
					...BASE_ADD_2_CART_BODY,
					orderItem,
				};
				const storeId = settings?.storeId ?? '';
				try {
					await addToCartFetcher(isGenericUser)(storeId, {}, data, params);
					if (isGenericUser) {
						await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
						await mutate(
							personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC),
							undefined
						);
					}
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
					showSuccessMessage(labels.SuccessMsg.t(), true);
					setFetchDetailsFor(ua || ga4 ? orderItem : []);

					scrollTo(0, 0);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[
			maxValues,
			availability,
			pickupInStoreShipMode,
			showErrorMessage,
			labels,
			settings,
			isGenericUser,
			params,
			showSuccessMessage,
			ua,
			ga4,
			currentCartSWRKey,
			notifyError,
		]
	);

	const isOptionEqualToValue = useCallback(
		(option: ProductSuggestionEntry, value: ProductSuggestionEntry) =>
			option.partNumber === value?.partNumber,
		[]
	);

	const onDebouncedSearch = useMemo(
		() =>
			debounce(async (index: number, searchTerm: string, reason: AutocompleteInputChangeReason) => {
				if (reason === 'input' && searchTerm) {
					const options = await fetchPartNumberSuggestion({ searchTerm });
					const sortedOptions = sortBy(options, ['partNumber']);
					setOptions((prev) => ({
						...prev,
						[`line${index}Options`]: sortedOptions as ProductSuggestionEntry[],
					}));
				} else {
					setOptions((prev) => ({ ...prev, [`line${index}Options`]: [] }));
				}
			}, 300),
		[fetchPartNumberSuggestion]
	);

	const onSearchInputChange = useMemo(
		() =>
			(index: number) =>
			async (event: SyntheticEvent, searchTerm: string, reason: AutocompleteInputChangeReason) =>
				await onDebouncedSearch(index, searchTerm, reason),
		[onDebouncedSearch]
	);

	const onAddMore = useCallback(() => setMaxValues((prev) => prev + 1), []);
	const onResetValues = useCallback(() => setMaxValues(QUICK_ORDER_INITIAL_VALUES), []);

	// event invocation for add-to-cart
	useEffect(() => {
		if (fetchDetailsFor.length && skuDetails?.length && categories?.length) {
			const byPn = keyBy(fetchDetailsFor, 'partNumber');
			const categoriesByPn = keyBy(categories, 'id');
			skuDetails.forEach((sku) => {
				const attrsByIdentifier = getAttrsByIdentifier(sku.attributes);
				const quantity = dFix(byPn[sku.partNumber].quantity, 0);
				const category = categoriesByPn[getParentCategoryFromSlashPath(sku.parentCatalogGroupID)];
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
			setFetchDetailsFor([]);
		}
	}, [categories, fetchDetailsFor, onAddToCart, settings, skuDetails]);

	return {
		setPartNumbers,
		onSubmit,
		isOptionEqualToValue,
		onSearchInputChange,
		maxValues,
		options,
		onAddMore,
		onResetValues,
		redirectToLoginIfNeed,
		showOrderButton,
	};
};
