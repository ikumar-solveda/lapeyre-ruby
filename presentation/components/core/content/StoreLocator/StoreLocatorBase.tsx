/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StoreLocatorInfoBox } from '@/components/content/StoreLocator/parts/InfoBox';
import { StoreLocatorMarker } from '@/components/content/StoreLocator/parts/Marker';
import { StoreLocatorSideList } from '@/components/content/StoreLocator/parts/SideList';
import { storeLocatorGridContainerSX } from '@/components/content/StoreLocator/styles/SideList/gridContainer';
import { storeLocatorMapContainerSX } from '@/components/content/StoreLocator/styles/mapContainer';
import { useNotifications } from '@/data/Content/Notifications';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { onLocationUpdate } from '@/data/Content/_StoreLocator';
import { useLocalization } from '@/data/Localization';
import { DEFAULT_LOCATION, GOOGLE_MAP_ZOOM } from '@/data/constants/storeLocator';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ErrorType } from '@/data/types/Error';
import { StoreLocatorBaseProps } from '@/data/types/StoreLocator';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import { FC, useEffect } from 'react';

export const StoreLocatorBase: FC<StoreLocatorBaseProps> = ({ order, embedded }) => {
	const { breakpoints } = useTheme();
	const localization = useLocalization('StoreLocator');
	const { notifyError } = useNotifications();
	const { storeLocator } = useStoreLocatorState();
	const isDesktop = useMediaQuery(breakpoints.up('md'));

	const {
		data,
		locator,
		setLocator,
		setCurrentLocation,
		searchLatLng,
		showDirection,
		destination,
		mapCenter,
		directionResults,
		searchTextFieldRef,
		currentLocation,
		clickedIndex,
		searchTerm,
		clearSearch,
		mapOnLoad,
		directionsCallback,
		findNearStore,
		onPlaceChanged,
		searchBoxOnLoad,
		onListItemClick,
		...rest
	} = useStoreLocator();

	useEffect(() => {
		setLocator((pre) => ({ ...pre, ...onLocationUpdate(data, storeLocator, searchLatLng, pre) }));
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
				(_error: GeolocationPositionError) => {
					// use default location
					setCurrentLocation(DEFAULT_LOCATION);
				}
			);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ContentProvider
			value={{
				locator,
				showDirection,
				mapCenter,
				clickedIndex,
				searchTerm,
				searchTextFieldRef,
				currentLocation,
				findNearStore,
				searchBoxOnLoad,
				onPlaceChanged,
				onListItemClick,
				clearSearch,
				order,
				embedded,
				...rest,
			}}
		>
			<Grid container justifyContent="center" alignItems="stretch" spacing={2}>
				{!embedded ? (
					<Grid item xs={12}>
						<Typography variant="h3">{localization.title.t()}</Typography>
					</Grid>
				) : null}
				<Grid item xs md={4} sx={isDesktop ? storeLocatorMapContainerSX : null}>
					<Paper sx={storeLocatorGridContainerSX} elevation={0}>
						<StoreLocatorSideList />
					</Paper>
				</Grid>

				<Grid
					container
					item
					xs={12}
					md={8}
					direction="column"
					justifyContent="center"
					alignItems="stretch"
					sx={storeLocatorMapContainerSX}
				>
					<Grid item xs>
						<GoogleMap
							mapContainerStyle={{ height: '100%', width: '100%' }}
							zoom={GOOGLE_MAP_ZOOM.INIT}
							center={mapCenter}
							onLoad={mapOnLoad}
						>
							{!showDirection
								? locator.storeList.map((store, index) => (
										<StoreLocatorMarker key={store.id} store={store} index={index} />
								  ))
								: null}
							{showDirection && destination ? (
								<DirectionsService
									options={{
										destination,
										origin: mapCenter,
										travelMode: google.maps.TravelMode.DRIVING,
										provideRouteAlternatives: true,
									}}
									callback={directionsCallback}
								/>
							) : null}
							{showDirection ? (
								<DirectionsRenderer
									options={{
										directions: directionResults,
										suppressInfoWindows: true,
									}}
								/>
							) : null}
						</GoogleMap>
					</Grid>
					<Grid item>
						<StoreLocatorInfoBox />
					</Grid>
				</Grid>
			</Grid>
		</ContentProvider>
	);
};
