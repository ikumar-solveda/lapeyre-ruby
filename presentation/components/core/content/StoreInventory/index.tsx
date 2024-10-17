/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { StoreInventoryList } from '@/components/content/StoreInventory/List';
import { storeInventoryDrawerSX } from '@/components/content/StoreInventory/styles/drawer';
import { storeInventoryDrawerPaper } from '@/components/content/StoreInventory/styles/drawerPaper';
import { useNotifications } from '@/data/Content/Notifications';
import { useStoreList } from '@/data/Content/StoreList';
import { onLocationUpdate } from '@/data/Content/_StoreLocator';
import { DEFAULT_LOCATION } from '@/data/constants/storeLocator';
import { ContentProvider } from '@/data/context/content';
import { StoreInventoryContext } from '@/data/context/storeInventory';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ErrorType } from '@/data/types/Error';
import { LatLng } from '@/data/types/Store';
import { Drawer } from '@mui/material';
import { FC, useCallback, useContext, useEffect, useState } from 'react';

type Props = {
	partNumber: string;
};

export const StoreInventory: FC<Props> = ({ partNumber }) => {
	const storeListValues = useStoreList();
	const { data, searchLatLng, findNearStore, setLocator, onDrawerScroll } = storeListValues;
	const [currentLocation, setCurrentLocation] = useState<LatLng>(DEFAULT_LOCATION);
	const { notifyError } = useNotifications();
	const { storeLocator } = useStoreLocatorState();
	const { open, setOpen } = useContext(StoreInventoryContext);

	const toggleDrawer = useCallback((newOpen: boolean) => () => setOpen(newOpen), [setOpen]);

	useEffect(() => {
		findNearStore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		<ContentProvider value={storeListValues}>
			<Drawer
				anchor="right"
				open={open}
				onClose={toggleDrawer(false)}
				PaperProps={storeInventoryDrawerPaper}
				sx={storeInventoryDrawerSX}
				onScrollCapture={onDrawerScroll}
			>
				<StoreInventoryList partNumber={partNumber} currentLocation={currentLocation} />
			</Drawer>
		</ContentProvider>
	);
};
