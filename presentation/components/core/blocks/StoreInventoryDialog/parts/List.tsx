/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { GoogleMapsAutocomplete } from '@/components/blocks/GoogleMapsAutocomplete';
import { storeInventoryDialogListDividerSX } from '@/components/blocks/StoreInventoryDialog/styles/list/divider';
import { storeInventoryDialogListIconSX } from '@/components/blocks/StoreInventoryDialog/styles/list/icon';
import { storeInventoryDialogListItemSX } from '@/components/blocks/StoreInventoryDialog/styles/list/item';
import { storeInventoryDialogListNoStoresStack } from '@/components/blocks/StoreInventoryDialog/styles/list/noStoresStack';
import { storeInventoryDialogListStackHeightSX } from '@/components/blocks/StoreInventoryDialog/styles/list/stackHeight';
import { storeInventoryDialogListStackOverflowSX } from '@/components/blocks/StoreInventoryDialog/styles/list/stackOverflow';
import { StoreListItem } from '@/components/blocks/StoreListItem';
import { useNotifications } from '@/data/Content/Notifications';
import { useStoreList } from '@/data/Content/StoreList';
import { onLocationUpdate } from '@/data/Content/_StoreLocator';
import { useLocalization } from '@/data/Localization';
import { DEFAULT_LOCATION } from '@/data/constants/storeLocator';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ErrorType } from '@/data/types/Error';
import { LatLng, StoreDetails } from '@/data/types/Store';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, List, ListItem, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useEffect, useMemo, useState } from 'react';

type Props = {
	onSetCandidate: (store: StoreDetails) => () => void;
};

export const StoreInventoryDialogList: FC<Props> = ({ onSetCandidate }) => {
	const storeListValues = useStoreList();
	const { data, searchLatLng, searchTerm, findNearStore, locator, setLocator, onDrawerScroll } =
		storeListValues;
	const { storeLocator } = useStoreLocatorState();
	const localization = useLocalization('StoreLocator');
	const { notifyError } = useNotifications();
	const [currentLocation, setCurrentLocation] = useState<LatLng>(DEFAULT_LOCATION);
	const contextValue = useMemo(
		() => ({ ...storeListValues, currentLocation }),
		[currentLocation, storeListValues]
	);

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

	const hasSelectedStore = useMemo(() => !isEmpty(storeLocator?.selectedStore), [storeLocator]);
	const storeListLen = useMemo(() => locator?.storeList?.length, [locator]);

	return (
		<Stack sx={storeInventoryDialogListStackHeightSX}>
			<ContentProvider value={contextValue}>
				<Stack sx={storeInventoryDialogListStackOverflowSX} onScroll={onDrawerScroll}>
					<List>
						<ListItem sx={storeInventoryDialogListItemSX}>
							<Typography variant="body2">{localization.searchStore.t()}</Typography>
							<GoogleMapsAutocomplete
								placeholder={localization.placeholder.t()}
								searchLabel={localization.findNearestStore.t()}
								clearLabel={localization.clearSearch.t()}
							/>
						</ListItem>
						<ListItem>
							<Divider sx={storeInventoryDialogListDividerSX} />
						</ListItem>

						{hasSelectedStore ? (
							<StoreListItem
								physicalStore={storeLocator.selectedStore}
								displayInventory={false}
								onSetCandidate={onSetCandidate}
							/>
						) : null}

						{currentLocation && !locator.noSearch
							? locator?.storeList?.map((store: StoreDetails, index: number) =>
									store?.coordinates && store.id !== storeLocator.selectedStore.id ? (
										<StoreListItem
											key={store.id}
											physicalStore={store}
											index={index}
											displayInventory={false}
											onSetCandidate={onSetCandidate}
										/>
									) : null
							  )
							: null}
					</List>
				</Stack>
			</ContentProvider>

			{!hasSelectedStore && storeListLen === 0 ? (
				<Stack {...storeInventoryDialogListNoStoresStack}>
					{locator.noSearch ? (
						<SearchIcon sx={storeInventoryDialogListIconSX} />
					) : (
						<>
							<NotInterestedIcon sx={storeInventoryDialogListIconSX} />
							<Typography variant="subtitle2">
								{searchTerm
									? localization.noResults.t({ p: searchTerm })
									: localization.noResultsNearYou.t()}
							</Typography>
						</>
					)}
				</Stack>
			) : null}
		</Stack>
	);
};
