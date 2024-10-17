/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StoreListItemDetails } from '@/components/blocks/StoreListItem/parts/Details';
import { StoreListItemExpander } from '@/components/blocks/StoreListItem/parts/Expander';
import { StoreListItemMarkerIcon } from '@/components/blocks/StoreListItem/parts/MarkerIcon';
import { storeListItemInfoChipSX } from '@/components/blocks/StoreListItem/styles/info/chip';
import { storeListItemInfoPrimaryStack } from '@/components/blocks/StoreListItem/styles/info/primaryStack';
import { storeListItemInfoSecondStack } from '@/components/blocks/StoreListItem/styles/info/secondStack';
import { storeListItemInfoThirdStack } from '@/components/blocks/StoreListItem/styles/info/thirdStack';
import { useLocalization } from '@/data/Localization';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';
import { Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

type Props = {
	storeLocator: SelectedStoreLocator;
	physicalStore: StoreDetails;
	isInventoryLoading?: boolean;
	physicalStoreAvailability?: string;
	countDistance: (store: StoreDetails) => number;
	displayInventory: boolean;
};
export const StoreListItemInfo: FC<Props> = ({
	storeLocator,
	physicalStore: store,
	isInventoryLoading = false,
	physicalStoreAvailability,
	countDistance,
	displayInventory,
}) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const localization = useLocalization('StoreLocator');
	const drawer = useLocalization('Inventory').Drawer;
	const isSelected = store?.id === storeLocator?.selectedStore.id;

	return isInventoryLoading ? (
		<CircularProgress size={30} />
	) : (
		<Stack {...storeListItemInfoPrimaryStack}>
			<Stack {...storeListItemInfoSecondStack}>
				<Stack {...storeListItemInfoThirdStack}>
					<StoreListItemMarkerIcon />
					<Stack>
						<Typography variant="subtitle1">{store?.storeName}</Typography>
						<Typography variant="caption">
							{localization.distanceKM.t({ distance: countDistance(store) })}
						</Typography>
					</Stack>
				</Stack>

				{isSelected ? (
					<Chip
						variant="outlined"
						label={<Typography variant="body2">{drawer.CurrentSelectedStore.t()}</Typography>}
						sx={storeListItemInfoChipSX}
					/>
				) : !displayInventory ? (
					<StoreListItemExpander
						physicalStoreAvailability={physicalStoreAvailability}
						displayInventory={displayInventory}
						expanded={expanded}
						setExpanded={setExpanded}
					/>
				) : null}
			</Stack>

			{isSelected || displayInventory ? (
				<>
					<Divider />
					<StoreListItemExpander
						physicalStoreAvailability={physicalStoreAvailability}
						displayInventory={displayInventory}
						expanded={expanded}
						setExpanded={setExpanded}
					/>
				</>
			) : null}
			<StoreListItemDetails expanded={expanded} store={store} />
		</Stack>
	);
};
