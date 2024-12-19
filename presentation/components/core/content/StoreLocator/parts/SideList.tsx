/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { GoogleMapsAutocompleteWithResize } from '@/components/blocks/GoogleMapsAutocompleteWithResize';
import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { StoreLocatorRemovalDialog } from '@/components/content/StoreLocator/parts/RemovalDialog';
import { StoreLocatorStoreEntity } from '@/components/content/StoreLocator/parts/StoreEntity';
import { storeLocatorSideListAutoCompleteSX } from '@/components/content/StoreLocator/styles/SideList/autoComplete';
import { storeLocatorSideListDividerSX } from '@/components/content/StoreLocator/styles/SideList/divider';
import { storeLocatorSideListElementSX } from '@/components/content/StoreLocator/styles/SideList/element';
import { storeLocatorGridContainerSX } from '@/components/content/StoreLocator/styles/SideList/gridContainer';
import { storeLocatorSideListIconSX } from '@/components/content/StoreLocator/styles/SideList/icon';
import { storeLocatorSideListNoStoresStack } from '@/components/content/StoreLocator/styles/SideList/noStoresStack';
import { storeLocatorSideListSideListSX } from '@/components/content/StoreLocator/styles/SideList/sideList';
import { storeLocatorSideListStoreItemButtonSX } from '@/components/content/StoreLocator/styles/SideList/storeItemButton';
import { storeLocatorSideListTitleTypographySX } from '@/components/content/StoreLocator/styles/SideList/titleTypography';
import { storeLocatorDeselectButtonSX } from '@/components/content/StoreLocator/styles/deselectButton';
import { useStoreInventoryByOrder } from '@/data/Content/StoreInventoryByOrder';
import type { useStoreLocator } from '@/data/Content/StoreLocator';
import { useLocalization } from '@/data/Localization';
import { STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID } from '@/data/constants/storeLocator';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import type { StoreLocatorBaseProps } from '@/data/types/StoreLocator';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SearchIcon from '@mui/icons-material/Search';
import {
	Divider,
	Grid,
	InputAdornment,
	ListItem,
	ListItemButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { type FC, type MouseEvent, useCallback, useContext, useEffect, useState } from 'react';

export const StoreLocatorSideList: FC = () => {
	const {
		searchTextFieldRef,
		currentLocation,
		locator,
		searchTerm,
		findNearStore,
		searchBoxOnLoad,
		onPlaceChanged,
		onListItemClick,
		clearSearch,
		order,
		onScroll,
		pickupOrderItems,
		physicalStoreIdInCart,
		embedded,
	} = useContext(ContentContext) as ReturnType<typeof useStoreLocator> & StoreLocatorBaseProps;
	const localization = useLocalization('StoreLocator');

	const { availabilities, isLoading } = useStoreInventoryByOrder({
		order,
		physicalStores: locator.storeList,
	});

	const {
		storeLocator,
		actions: { resetSelectedStore },
	} = useStoreLocatorState();
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const onDialog = useCallback(() => setDialogOpen((prev) => !prev), []);
	const onDeselect = useCallback(
		(_e: MouseEvent) =>
			!physicalStoreIdInCart && !pickupOrderItems?.length ? resetSelectedStore() : onDialog(),
		[onDialog, physicalStoreIdInCart, pickupOrderItems, resetSelectedStore]
	);

	useEffect(() => {
		findNearStore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Stack sx={storeLocatorGridContainerSX}>
			<Stack sx={storeLocatorSideListSideListSX} onScroll={onScroll}>
				<Typography variant="subtitle2" sx={storeLocatorSideListTitleTypographySX}>
					{localization.searchStore.t()}
				</Typography>
				<GoogleMapsAutocompleteWithResize
					onLoad={searchBoxOnLoad}
					onPlaceChanged={onPlaceChanged}
					searchTextFieldRef={searchTextFieldRef}
					sx={storeLocatorSideListAutoCompleteSX}
				>
					<TextField
						fullWidth
						autoFocus
						autoComplete="off"
						placeholder={localization.placeholder.t()}
						name="searchTerm"
						inputRef={searchTextFieldRef}
						data-testid={STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID}
						id={STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</GoogleMapsAutocompleteWithResize>

				<Grid container justifyContent="space-between" alignItems="flex-end">
					<Grid item>
						<Linkable type="inline" onClick={findNearStore}>
							{localization.findNearestStore.t()}
						</Linkable>
					</Grid>
					{locator?.storeList?.length > 0 && !locator.noSearch ? (
						<Grid item>
							<Linkable
								type="inline"
								onClick={clearSearch}
								sx={storeLocatorSideListElementSX}
								data-testid="store-locator-side-list-clear-search"
								id="store-locator-side-list-clear-search"
							>
								{localization.clearSearch.t()}
							</Linkable>
						</Grid>
					) : null}
				</Grid>
				<Divider sx={storeLocatorSideListDividerSX} />
				{!embedded && storeLocator.selectedStore?.id ? (
					<>
						<OneClick
							data-testid="store-locator-remove-selection"
							id="store-locator-remove-selection"
							variant="outlined"
							overlay
							onClick={onDeselect}
							sx={storeLocatorDeselectButtonSX}
						>
							{localization.deselectStore.t()}
						</OneClick>
						<Divider sx={storeLocatorSideListDividerSX} />
					</>
				) : null}
				{currentLocation
					? locator?.storeList?.map((store, index) =>
							store?.coordinates ? (
								<ListItem key={store.id} disablePadding>
									<ListItemButton
										dense
										data-testid={`pickup-store-${store?.storeName.toLowerCase()}-list-button`}
										id={`pickup-store-${store?.storeName.toLowerCase()}-list-button`}
										onClick={(e) => onListItemClick(e, index)}
										sx={storeLocatorSideListStoreItemButtonSX}
									>
										<StoreLocatorStoreEntity
											physicalStore={store}
											index={index}
											availabilities={availabilities}
											inventoryLoading={isLoading}
										/>
									</ListItemButton>
								</ListItem>
							) : null
					  )
					: null}
			</Stack>
			{locator?.storeList?.length === 0 ? (
				<Stack {...storeLocatorSideListNoStoresStack}>
					{locator.noSearch ? (
						<SearchIcon sx={storeLocatorSideListIconSX} />
					) : (
						<>
							<NotInterestedIcon sx={storeLocatorSideListIconSX} />
							<Typography variant="subtitle2">
								{searchTerm
									? localization.noResults.t({ p: searchTerm })
									: localization.noResultsNearYou.t()}
							</Typography>
						</>
					)}
				</Stack>
			) : null}
			<StoreLocatorRemovalDialog open={dialogOpen} onDialog={onDialog} />
		</Stack>
	);
};
