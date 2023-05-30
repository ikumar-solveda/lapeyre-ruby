/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { ID } from '@/data/types/Basic';
import { Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import { StoreLocatorMarker } from '@/components/content/StoreLocator/parts/Marker';
import { StoreLocatorInfoBox } from '@/components/content/StoreLocator/parts/InfoBox';
import { GOOGLE_MAP_ZOOM } from '@/data/constants/storeLocator';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { storeLocatorMapContainerSX } from '@/components/content/StoreLocator/styles/mapContainer';
import { ContentProvider } from '@/data/context/content';
import { StoreLocatorSideList } from '@/components/content/StoreLocator/parts/SideList';
import { storeLocatorGridContainerSX } from '@/components/content/StoreLocator/styles/SideList/gridContainer';
import { useLocalization } from '@/data/Localization';

export const StoreLocator: FC<{ id: ID }> = () => {
	const { breakpoints } = useTheme();
	const localization = useLocalization('StoreLocator');
	const isDesktop = useMediaQuery(breakpoints.up('md'));

	const {
		isLoaded,
		locator,
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

	return isLoaded ? (
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
				...rest,
			}}
		>
			<Grid
				container
				justifyContent="center"
				alignItems="stretch"
				spacing={2}
				sx={isDesktop ? storeLocatorMapContainerSX : null}
			>
				<Grid item xs={12}>
					<Typography variant="h3">{localization.title.t()}</Typography>
				</Grid>
				<Grid item xs md={4} sx={isDesktop ? storeLocatorMapContainerSX : null}>
					<Paper sx={storeLocatorGridContainerSX}>
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
	) : (
		<ProgressIndicator />
	);
};
