/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	DEFAULT_LOCATION,
	GOOGLE_MAP_REGION,
	GOOGLE_MAP_ZOOM,
	STORE_LIST_RADIUS,
	STORE_LOCATOR_LIBRARY,
} from '@/data/constants/storeLocator';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { ErrorType } from '@/data/types/Error';
import { LatLng, StoreDetails, StoreLocator } from '@/data/types/Store';
import { dDiv } from '@/data/utils/floatingPoint';
import { error as logError, trace } from '@/data/utils/loggerUtil';
import { useJsApiLoader } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import { transactionsStoreLocator } from 'integration/generated/transactions';
import {
	StorelocatorStorelocator,
	StorelocatorStorelocatorItem,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

const DATA_KEY = 'STORE_LOCATOR_STORES';

const dataMap = (data: StorelocatorStorelocator): StoreDetails[] => {
	const physicalStores =
		data?.PhysicalStore?.map(
			(s: StorelocatorStorelocatorItem) =>
				({
					id: s.uniqueID,
					storeName: s.Description?.at(0)?.displayStoreName,
					physicalStoreName: s.storeName,
					storeFullAddress: `${s.addressLine?.at(0)}, ${s.city} ${s.stateOrProvinceName} ${
						s.postalCode
					}`,
					phone: s.telephone1,
					coordinates: {
						lng: Number(s.longitude?.trim()),
						lat: Number(s.latitude?.trim()),
					} as LatLng,
					attributes: s.Attribute,
				} as StoreDetails)
		) ?? [];
	return physicalStores;
};

const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		latitude: string,
		longitude: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) => {
		try {
			const data = await transactionsStoreLocator(pub).storeLocatorFindStores(
				storeId,
				latitude,
				longitude,
				query,
				params
			);
			return data;
		} catch (error) {
			logError(context?.req, 'StoreLocator: fetcher: error: %o', error);
		}
	};

const initialStoreLocator: StoreLocator = {
	storeList: [],
	center: DEFAULT_LOCATION,
	noSearch: true,
};

export const useStoreLocator = () => {
	const { notifyError } = useNotifications();
	const { settings } = useSettings();

	const [mapInstance, setMapInstance] = useState<google.maps.Map>({} as google.maps.Map);

	const [locator, setLocator] = useState<StoreLocator>(initialStoreLocator);

	const [currentLocation, setCurrentLocation] = useState<LatLng>(DEFAULT_LOCATION);
	const [showDirection, setShowDirection] = useState<boolean>(false);
	const [destination, setDestination] = useState<LatLng | null>(null);
	const [directionResults, setDirectionResults] = useState<google.maps.DirectionsResult | null>(
		null
	);
	const [noDirectionPath, setNoDirectionPath] = useState<boolean>(false);
	const [clickedIndex, setClickedIndex] = useState<number>(-1);
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
						storeId: settings?.storeId ?? '',
						latitude: String(searchLatLng.lat),
						longitude: String(searchLatLng.lng),
						query: {
							radius: STORE_LIST_RADIUS,
							siteLevelStoreSearch: false,
						},
					},
					DATA_KEY,
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

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: settings.mapApiKey || '',
		region: GOOGLE_MAP_REGION,
		libraries: STORE_LOCATOR_LIBRARY,
		// ...otherOptions
	});

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
		if (result !== null) {
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
		mapInstance.setZoom(GOOGLE_MAP_ZOOM.INIT);
		setClickedIndex(-1);
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

	const searchBoxOnLoad = (searchBox: any) => {
		setSearchBoxRef(searchBox);
	};

	const mapCenter = useMemo(
		() => (searchTerm !== EMPTY_STRING ? locator.center : currentLocation),
		[searchTerm, locator, currentLocation]
	);

	const calcDistance = (from: LatLng, to: LatLng) => dDiv(getDistance(from, to, 100), 1000);

	useEffect(() => {
		if (data?.PhysicalStore) {
			setLocator((pre) => ({
				...pre,
				storeList: dataMap(data),
				center: searchLatLng,
				noSearch: false,
			}));
		} else if (data?.recordSetCount === '0' && data?.recordSetComplete) {
			setLocator((pre) => ({
				...pre,
				storeList: [],
				center: searchLatLng,
				noSearch: false,
			}));
		} else {
			setLocator((pre) =>
				storeLocator.selectedStore?.storeName
					? {
							...pre,
							noSearch: true,
					  }
					: {
							...pre,
							storeList: [],
							center: searchLatLng,
							noSearch: true,
					  }
			);
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!navigator.geolocation) {
			const msg = { type: 'common-error', messageKey: '_ERR_GOOGLE_MAP_NOT_SUPPORT' } as ErrorType;
			notifyError(msg);
		} else {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
				},
				(err: GeolocationPositionError) => {
					logError(undefined, 'Encountering error %o', err);
					trace(undefined, 'Use default location instead.');
					setCurrentLocation(DEFAULT_LOCATION);
				}
			);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		isLoaded,
		locator,
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
		calcDistance,
	};
};
