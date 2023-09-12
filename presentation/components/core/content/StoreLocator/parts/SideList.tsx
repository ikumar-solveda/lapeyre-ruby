/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { StoreLocatorAutocomplete } from '@/components/content/StoreLocator/parts/Autocomplete';
import { StoreLocatorMarkerIcon } from '@/components/content/StoreLocator/parts/MarkerIcon';
import { storeLocatorSideListAutoCompleteSX } from '@/components/content/StoreLocator/styles/SideList/autoComplete';
import { storeLocatorSideListCheckCircleRoundedIcon } from '@/components/content/StoreLocator/styles/SideList/checkCircleRoundedIcon';
import { storeLocatorSideListElementSX } from '@/components/content/StoreLocator/styles/SideList/element';
import { storeLocatorGridContainerSX } from '@/components/content/StoreLocator/styles/SideList/gridContainer';
import { storeLocatorSideListNotInterestedIconSX } from '@/components/content/StoreLocator/styles/SideList/notInterestedIcon';
import { storeLocatorSideListSearchIconSX } from '@/components/content/StoreLocator/styles/SideList/searchIcon';
import { storeLocatorSideListSelectedSX } from '@/components/content/StoreLocator/styles/SideList/selected';
import { storeLocatorSideListSideListSX } from '@/components/content/StoreLocator/styles/SideList/sideList';
import { storeLocatorSideListTextImageCenterSX } from '@/components/content/StoreLocator/styles/SideList/textImageCenter';
import { storeLocatorSideListTitleTypographySX } from '@/components/content/StoreLocator/styles/SideList/titleTypography';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SearchIcon from '@mui/icons-material/Search';
import {
	Button,
	Divider,
	Grid,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC, useContext } from 'react';

export const StoreLocatorSideList: FC = () => {
	const {
		searchTextFieldRef,
		currentLocation,
		locator,
		searchTerm,
		clickedIndex,
		findNearStore,
		searchBoxOnLoad,
		onPlaceChanged,
		onListItemClick,
		clearSearch,
		calcDistance,
	} = useContext(ContentContext) as ReturnType<typeof useStoreLocator>;
	const localization = useLocalization('StoreLocator');
	const { storeLocator } = useStoreLocatorState();

	return (
		<Stack sx={storeLocatorGridContainerSX}>
			<Stack sx={storeLocatorSideListSideListSX}>
				<List disablePadding>
					<ListItem>
						<Grid container justifyContent="space-between" alignItems="flex-end" spacing={1}>
							<Grid item flex={1}>
								<ListItemText
									sx={storeLocatorSideListElementSX}
									primary={
										<Typography variant="subtitle2" sx={storeLocatorSideListTitleTypographySX}>
											{localization.searchAPickUpStore.t()}
										</Typography>
									}
								/>
							</Grid>
							<Grid item flex={1}>
								<Button
									variant="contained"
									onClick={findNearStore}
									sx={storeLocatorSideListElementSX}
									data-testid="button-store-locator-find-nearest-store"
									id="button-store-locator-find-nearest-store"
								>
									{localization.findNearestStore.t()}
								</Button>
							</Grid>
						</Grid>
					</ListItem>
					<ListItem>
						<StoreLocatorAutocomplete
							onLoad={searchBoxOnLoad}
							onPlaceChanged={onPlaceChanged}
							sx={storeLocatorSideListAutoCompleteSX}
						>
							<TextField
								fullWidth
								autoFocus
								autoComplete="off"
								placeholder={localization.searchStore.t()}
								name="searchTerm"
								inputRef={searchTextFieldRef}
								data-testid="store-locator-store-search-text-field"
								id="store-locator-store-search-text-field"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								}}
							/>
						</StoreLocatorAutocomplete>
					</ListItem>
					{locator?.storeList?.length > 0 && !locator.noSearch ? (
						<ListItem divider>
							<Grid container justifyContent="space-between" alignItems="flex-end" spacing={1}>
								<Grid item flex={1}>
									<ListItemText
										sx={storeLocatorSideListElementSX}
										primary={
											searchTerm
												? localization.searchResults.t({
														n: locator.storeList.length,
														p: searchTerm,
												  })
												: localization.searchResultsNearYou.t({ n: locator.storeList.length })
										}
									/>
								</Grid>
								<Grid item flex={1}>
									<Button
										onClick={clearSearch}
										variant="contained"
										sx={storeLocatorSideListElementSX}
										data-testid="store-locator-side-list-clear-search"
										id="store-locator-side-list-clear-search"
									>
										{localization.clearSearch.t()}
									</Button>
								</Grid>
							</Grid>
						</ListItem>
					) : (
						<Divider />
					)}

					{currentLocation
						? locator?.storeList?.map((store, index) =>
								store?.coordinates ? (
									<ListItemButton
										key={store.id}
										data-testid={`pickup-store-${store?.storeName.toLowerCase()}-list-button`}
										id={`pickup-store-${store?.storeName.toLowerCase()}-list-button`}
										onClick={(e) => onListItemClick(e, index)}
										divider
									>
										<ListItemIcon>
											<StoreLocatorMarkerIcon
												label={`${index + 1}`}
												selected={clickedIndex === index}
											/>
										</ListItemIcon>
										<ListItemText
											primary={
												<Typography
													sx={storeLocatorSideListSelectedSX(clickedIndex === index)}
													variant="subtitle2"
												>
													{store.storeName}
													{store.id === storeLocator.selectedStore?.id ? (
														<CheckCircleRoundedIcon
															color={clickedIndex === index ? 'inherit' : 'primary'}
															sx={storeLocatorSideListCheckCircleRoundedIcon}
														/>
													) : null}
												</Typography>
											}
											secondary={
												<Typography
													sx={storeLocatorSideListSelectedSX(clickedIndex === index)}
													variant="caption"
												>
													{store.storeFullAddress}
												</Typography>
											}
										></ListItemText>
										<Typography
											sx={storeLocatorSideListSelectedSX(clickedIndex === index)}
											variant="caption"
										>
											{localization.distanceKM.t({
												distance: calcDistance(
													searchTerm ? locator.center : currentLocation,
													store.coordinates
												),
											})}
										</Typography>
									</ListItemButton>
								) : null
						  )
						: null}
				</List>
			</Stack>
			{locator?.storeList?.length === 0 && locator.noSearch ? (
				<Stack
					alignItems="center"
					justifyContent="center"
					flexGrow={1}
					sx={storeLocatorSideListTextImageCenterSX}
				>
					<SearchIcon htmlColor="lightgrey" sx={storeLocatorSideListSearchIconSX} />
				</Stack>
			) : null}
			{locator?.storeList?.length === 0 && !locator.noSearch ? (
				<Stack
					alignItems="center"
					justifyContent="center"
					flexGrow={1}
					sx={storeLocatorSideListTextImageCenterSX}
				>
					<NotInterestedIcon htmlColor="lightgrey" sx={storeLocatorSideListNotInterestedIconSX} />
					<Typography variant="subtitle2">
						{searchTerm
							? localization.noResults.t({ p: searchTerm })
							: localization.noResultsNearYou.t()}
					</Typography>
				</Stack>
			) : null}
		</Stack>
	);
};
