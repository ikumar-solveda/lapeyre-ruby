/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { fetcher } from '@/data/Content/_StoreLocator';
import { useSettings } from '@/data/Settings';
import { BOPIS } from '@/data/constants/checkout';
import { DATA_KEY_STORE_LOCATOR_STORES } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import {
	DEFAULT_LOCATION,
	GOOGLE_MAP_ZOOM,
	INIT_CLICKED_STORE_INDEX,
	STORE_LIST_RADIUS,
} from '@/data/constants/storeLocator';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { LatLng, StoreDetails, StoreLocator } from '@/data/types/Store';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { error as logError } from '@/data/utils/loggerUtil';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { isEmpty } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';

const initialStoreLocator: StoreLocator = {
	storeList: [],
	center: DEFAULT_LOCATION,
	noSearch: true,
};

export const useStoreLocator = () => {
	const { notifyError } = useNotifications();
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { storeId, langId } = getClientSideCommon(settings, router);

	const { physicalStoreIdInCart, pickupOrderItems } = useCart();

	const [mapInstance, setMapInstance] = useState<google.maps.Map>({} as google.maps.Map);

	const [locator, setLocator] = useState<StoreLocator>(initialStoreLocator);

	const [currentLocation, setCurrentLocation] = useState<LatLng>(DEFAULT_LOCATION);
	const [showDirection, setShowDirection] = useState<boolean>(false);
	const [destination, setDestination] = useState<LatLng | null>(null);
	const [directionResults, setDirectionResults] = useState<google.maps.DirectionsResult | null>(
		null
	);
	const [noDirectionPath, setNoDirectionPath] = useState<boolean>(false);
	const [clickedIndex, setClickedIndex] = useState<number>(INIT_CLICKED_STORE_INDEX);
	const [expand, setExpand] = useState<boolean>(true);
	const [hidden, setHidden] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const [searchLatLng, setSearchLatLng] = useState<LatLng>({} as LatLng);
	const [searchBoxRef, setSearchBoxRef] = useState<any>(null);
	const searchTextFieldRef = useRef<HTMLInputElement>(null);
	const { storeLocator } = useStoreLocatorState();

	const { data } = useSWR(
		searchLatLng?.lat
			? [
					{
						storeId: storeId ?? '',
						latitude: String(searchLatLng.lat),
						longitude: String(searchLatLng.lng),
						query: {
							radius: STORE_LIST_RADIUS,
							siteLevelStoreSearch: false,
							langId, // langId is need to get display for different locale
						},
					},
					DATA_KEY_STORE_LOCATOR_STORES,
			  ]
			: null,
		async ([props]) =>
			fetcher(true)(props.storeId, props.latitude, props.longitude, props.query, {})
	);

	const closeInfoBox = () => {
		if (expand) {
			setExpand(false);
		} else {
			setExpand(true);
		}
	};

	const onListItemClick = (e: any, index: number) => {
		setHidden(false);
		setClickedIndex(index);
		zoomMapCenter(GOOGLE_MAP_ZOOM.ZOOM, locator?.storeList[index]?.coordinates);
		stopDirection();
	};

	const zoomMapCenter = (zoom: number, center: LatLng) => {
		mapInstance.setZoom(zoom);
		mapInstance.setCenter(center);
	};

	const onMarkerClick = (e: google.maps.MapMouseEvent, index: number) => {
		setClickedIndex(index);
		setHidden(false);
		zoomMapCenter(GOOGLE_MAP_ZOOM.ZOOM, locator.storeList[index].coordinates);
		stopDirection();
	};

	const getDirection = () => {
		if (!showDirection) {
			setDestination(locator.storeList[clickedIndex].coordinates);
			setShowDirection(true);
		} else {
			stopDirection();
			zoomMapCenter(GOOGLE_MAP_ZOOM.ZOOM, locator.storeList[clickedIndex].coordinates);
		}
	};

	const stopDirection = () => {
		setShowDirection(false);
		setDestination(null);
		setDirectionResults(null);
		setNoDirectionPath(false);
	};

	const directionsCallback = (
		result: google.maps.DirectionsResult | null,
		status: google.maps.DirectionsStatus
	) => {
		if (result !== null && directionResults === null) {
			if (status === 'OK') {
				setDirectionResults(result);
			} else {
				setNoDirectionPath(true);
			}
		}
	};

	const mapOnLoad = (mapInstance: google.maps.Map) => {
		setMapInstance(mapInstance);
		if (storeLocator.selectedStore?.storeName) {
			setLocator({
				storeList: [storeLocator.selectedStore],
				center: storeLocator.selectedStore.coordinates,
				noSearch: true,
			});
		}
	};

	const clearSearchTermAndCloseEverything = () => {
		if (searchTerm) {
			setSearchTerm(EMPTY_STRING);
		}
		if (searchTextFieldRef.current) {
			searchTextFieldRef.current.value = EMPTY_STRING;
		}
		setHidden(true);
		stopDirection();
		if (!isEmpty(mapInstance)) {
			mapInstance.setZoom(GOOGLE_MAP_ZOOM.INIT);
		}
		setClickedIndex(INIT_CLICKED_STORE_INDEX);
	};

	const findNearStore = () => {
		navigator.geolocation.getCurrentPosition(
			async (position: GeolocationPosition) => {
				setSearchLatLng({ lat: position.coords.latitude, lng: position.coords.longitude });
				clearSearchTermAndCloseEverything();
			},
			(err: any) => {
				logError(undefined, 'StoreLocator: findNearStore: error: %o', err);
			}
		);
	};

	const clearSearch = () => {
		clearSearchTermAndCloseEverything();
		setSearchLatLng({} as LatLng);
		if (storeLocator.selectedStore?.storeName) {
			setLocator({
				storeList: [storeLocator.selectedStore],
				center: storeLocator.selectedStore.coordinates,
				noSearch: false,
			});
		} else {
			setLocator(initialStoreLocator);
		}
	};

	const onPlaceChanged = () => {
		const place = searchBoxRef?.getPlace();
		if (place?.geometry) {
			setSearchLatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
			setSearchTerm(searchTextFieldRef?.current?.value ?? EMPTY_STRING);
			setHidden(true);
			stopDirection();
			mapInstance.setZoom(GOOGLE_MAP_ZOOM.INIT);
		}
	};

	const searchBoxOnLoad = (searchBox: google.maps.places.Autocomplete) => {
		setSearchBoxRef(searchBox);
	};

	const mapCenter = useMemo(
		() => (searchTerm !== EMPTY_STRING ? locator.center : currentLocation),
		[searchTerm, locator, currentLocation]
	);

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
								x_calculateOrder: ORDER_CONFIGS.calculateOrder,
								x_calculationUsage: ORDER_CONFIGS.calculationUsage,
								x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
								x_allocate: ORDER_CONFIGS.allocate,
								x_backorder: ORDER_CONFIGS.backOrder,
								x_remerge: ORDER_CONFIGS.remerge,
								x_check: ORDER_CONFIGS.check,
								orderId: '.',
								orderItem: pickupOrderItems.map((item) => ({
									orderItemId: item.orderItemId,
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

	const onScroll = useCallback(() => {
		if (searchTextFieldRef.current && document.activeElement === searchTextFieldRef.current) {
			searchTextFieldRef.current.blur();
		}
	}, [searchTextFieldRef]);

	return {
		data,
		locator,
		setLocator,
		setCurrentLocation,
		searchLatLng,
		showDirection,
		destination,
		directionResults,
		clickedIndex,
		noDirectionPath,
		expand,
		hidden,
		searchTerm,
		currentLocation,
		searchTextFieldRef,
		mapCenter,
		mapOnLoad,
		getDirection,
		stopDirection,
		directionsCallback,
		onMarkerClick,
		closeInfoBox,
		findNearStore,
		searchBoxOnLoad,
		onPlaceChanged,
		onListItemClick,
		clearSearch,
		setAsMyStore,
		onScroll,
	};
};
