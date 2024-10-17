/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { fetcher } from '@/data/Content/_StoreLocator';

import { useSettings } from '@/data/Settings';
import { BOPIS } from '@/data/constants/checkout';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { DEFAULT_LOCATION, STORE_LIST_RADIUS } from '@/data/constants/storeLocator';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { LatLng, StoreDetails, StoreLocator } from '@/data/types/Store';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { errorWithId } from '@/data/utils/loggerUtil';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { useCallback, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';

const initialStoreList: StoreLocator = {
	storeList: [],
	center: DEFAULT_LOCATION,
	noSearch: true,
};

const DATA_KEY = 'STORE_LIST_STORES';

export const useStoreList = () => {
	const { notifyError } = useNotifications();
	const { settings } = useSettings();
	const router = useNextRouter();
	const [locator, setLocator] = useState<StoreLocator>(initialStoreList);
	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const [searchLatLng, setSearchLatLng] = useState<LatLng>({} as LatLng);
	const [searchBoxRef, setSearchBoxRef] = useState<any>(null);
	const searchFieldRef = useRef<HTMLInputElement>(null);
	const { physicalStoreIdInCart, pickupOrderItems, data: cart } = useCart();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { storeLocator } = useStoreLocatorState();

	const { data } = useSWR(
		searchLatLng?.lat
			? [
					{
						storeId: settings?.storeId ?? '',
						latitude: String(searchLatLng.lat),
						longitude: String(searchLatLng.lng),
						query: {
							radius: STORE_LIST_RADIUS,
							siteLevelStoreSearch: false,
							langId,
						},
					},
					DATA_KEY,
			  ]
			: null,
		async ([props]) =>
			fetcher(true)(props.storeId, props.latitude, props.longitude, props.query, {})
	);

	const clearSearchTermAndCloseEverything = useCallback(() => {
		if (searchTerm) {
			setSearchTerm(EMPTY_STRING);
		}
		if (searchFieldRef.current) {
			searchFieldRef.current.value = EMPTY_STRING;
		}
	}, [searchTerm]);

	const findNearStore = useCallback(() => {
		navigator.geolocation.getCurrentPosition(
			async (position: GeolocationPosition) => {
				setSearchLatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
				clearSearchTermAndCloseEverything();
			},
			(err: any) => {
				errorWithId(undefined, 'StoreLocator: findNearStore: error: %o', err);
			}
		);
	}, [clearSearchTermAndCloseEverything]);

	const onLoad = (searchBox: google.maps.places.Autocomplete) => setSearchBoxRef(searchBox);

	const onPlaceChanged = () => {
		const place = searchBoxRef?.getPlace();
		if (place?.geometry) {
			setSearchLatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
			setSearchTerm(searchFieldRef?.current?.value ?? EMPTY_STRING);
		}
	};

	const setAsMyStore = useCallback(
		(
				store: StoreDetails,
				selectStore: (storeDetails: StoreDetails) => Promise<void>,
				_inOrderContext: boolean
			) =>
			async () => {
				if (
					physicalStoreIdInCart &&
					physicalStoreIdInCart !== store.id &&
					pickupOrderItems &&
					pickupOrderItems.length > 0
				) {
					// only update if it is already pickup, do not set to pickup if the order is not pickup order
					try {
						await shippingInfoUpdateFetcher(
							storeId,
							{ langId },
							{
								addressId: '',
								physicalStoreId: store.id,
								x_calculateOrder: ORDER_CONFIGS.calculateOrder,
								x_calculationUsage: ORDER_CONFIGS.calculationUsage,
								x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
								x_allocate: ORDER_CONFIGS.allocate,
								x_backorder: ORDER_CONFIGS.backOrder,
								x_remerge: ORDER_CONFIGS.remerge,
								x_check: ORDER_CONFIGS.check,
								orderId: '.',
								orderItem: pickupOrderItems?.map((orderItem) => ({
									orderItemId: orderItem.orderItemId,
									physicalStoreId: store.id,
								})),
							} as any,
							params
						);
						await mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
						return selectStore(store);
					} catch (error) {
						notifyError(processShippingInfoUpdateError(error as TransactionErrorResponse, BOPIS));
					}
				} else {
					return selectStore(store);
				}
			},
		[langId, notifyError, params, physicalStoreIdInCart, pickupOrderItems, storeId]
	);

	const clearSearch = useCallback(() => {
		clearSearchTermAndCloseEverything();
		setSearchLatLng({} as LatLng);
		if (storeLocator.selectedStore?.storeName) {
			setLocator({
				storeList: [storeLocator.selectedStore],
				center: storeLocator.selectedStore.coordinates,
				noSearch: false,
			});
		} else {
			setLocator(initialStoreList);
		}
	}, [clearSearchTermAndCloseEverything, storeLocator.selectedStore]);

	const onDrawerScroll = useCallback(() => {
		if (searchFieldRef.current && document.activeElement === searchFieldRef.current) {
			searchFieldRef.current.blur();
		}
	}, [searchFieldRef]);

	return {
		data,
		searchLatLng,
		searchTerm,
		searchFieldRef,
		findNearStore,
		onLoad,
		onPlaceChanged,
		setAsMyStore,
		cart,
		clearSearch,
		locator,
		setLocator,
		onDrawerScroll,
	};
};
