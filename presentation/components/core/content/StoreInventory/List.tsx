/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { GoogleMapsAutocomplete } from '@/components/blocks/GoogleMapsAutocomplete';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { OneClick } from '@/components/blocks/OneClick';
import { StoreListItem } from '@/components/blocks/StoreListItem';
import { storeInventoryListActionsStack } from '@/components/content/StoreInventory/styles/list/actionsStack';
import { storeInventoryListDividerSX } from '@/components/content/StoreInventory/styles/list/divider';
import { storeInventoryListIconSizeSX } from '@/components/content/StoreInventory/styles/list/iconSize';
import { storeInventoryListSearchStoreSX } from '@/components/content/StoreInventory/styles/list/searchStore';
import { storeInventoryListTitleSX } from '@/components/content/StoreInventory/styles/list/title';
import { storeInventoryListTitleFontSX } from '@/components/content/StoreInventory/styles/list/titleFont';
import { useStoreList } from '@/data/Content/StoreList';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { StoreInventoryContext } from '@/data/context/storeInventory';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { LatLng, StoreDetails } from '@/data/types/Store';
import CloseIcon from '@mui/icons-material/Close';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, List, ListItem, Stack, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { isEmpty } from 'lodash';

import { storeInventoryListActionsMenuStack } from '@/components/content/StoreInventory/styles/list/actionsMenuStack';
import { storeInventoryListNoStoresStack } from '@/components/content/StoreInventory/styles/list/noStoresStack';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

type Props = {
	partNumber: string;
	currentLocation: LatLng;
};

export const StoreInventoryList: FC<Props> = ({ partNumber, currentLocation }) => {
	const parentCtxValues = useContext(ContentContext) as ReturnType<typeof useStoreList>;
	const { searchTerm, locator } = parentCtxValues;
	const contextValue = useMemo(
		() => ({ ...parentCtxValues, currentLocation }),
		[currentLocation, parentCtxValues]
	);
	const localization = useLocalization('StoreLocator');
	const drawer = useLocalization('Inventory').Drawer;

	const { storeLocator } = useStoreLocatorState();

	const [checked, setChecked] = useState<boolean>(false);

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked),
		[]
	);
	const { setOpen } = useContext(StoreInventoryContext);

	const onClick = useCallback(() => setOpen((prev) => !prev), [setOpen]);

	const hasSelectedStore = useMemo(() => !isEmpty(storeLocator?.selectedStore), [storeLocator]);

	return (
		<ContentProvider value={contextValue}>
			<Stack>
				<Stack>
					<List>
						<ListItem sx={storeInventoryListTitleSX}>
							<Typography variant="subtitle2" sx={storeInventoryListTitleFontSX}>
								{drawer.Title.t()}
							</Typography>
							<OneClick wrapper="icon" onClick={onClick}>
								<CloseIcon fontSize="small" />
							</OneClick>
						</ListItem>
						<ListItem>
							<Divider sx={storeInventoryListDividerSX} />
						</ListItem>
						{hasSelectedStore ? (
							<StoreListItem
								partNumber={partNumber}
								physicalStore={storeLocator.selectedStore}
								showInStockLocation={checked}
							/>
						) : null}

						<ListItem>
							<Stack {...storeInventoryListActionsStack}>
								<Stack {...storeInventoryListActionsMenuStack}>
									<Stack>
										<LocalizationWithComponent
											text={drawer.InStockLocations.t()}
											components={[
												<Typography key="0" variant="body2" />,
												<Typography key="1" variant="body2" />,
											]}
										/>
									</Stack>
									<Switch checked={checked} onChange={onChange} />
								</Stack>
								<Typography variant="body2" sx={storeInventoryListSearchStoreSX}>
									{drawer.SearchStore.t()}
								</Typography>
								<GoogleMapsAutocomplete
									placeholder={localization.placeholder.t()}
									searchLabel={localization.findNearestStore.t()}
									clearLabel={localization.clearSearch.t()}
								/>
							</Stack>
						</ListItem>

						<ListItem>
							<Divider sx={storeInventoryListDividerSX} />
						</ListItem>

						{currentLocation && locator?.storeList?.length > 0 && !locator.noSearch
							? locator.storeList.map((store: StoreDetails, index: number) =>
									store?.coordinates && store.id !== storeLocator.selectedStore.id ? (
										<StoreListItem
											key={store.id}
											partNumber={partNumber}
											physicalStore={store}
											index={index}
											showInStockLocation={checked}
										/>
									) : null
							  )
							: null}
					</List>
				</Stack>
				{locator?.storeList?.length === 0 ? (
					<Stack {...storeInventoryListNoStoresStack}>
						{locator.noSearch ? (
							<SearchIcon sx={storeInventoryListIconSizeSX} />
						) : (
							<>
								<NotInterestedIcon sx={storeInventoryListIconSizeSX} />
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
		</ContentProvider>
	);
};
