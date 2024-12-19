/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StoreListItemDetails } from '@/components/blocks/StoreListItem/parts/Details';
import { StoreListItemExpander } from '@/components/blocks/StoreListItem/parts/Expander';
import { StoreListItemMarkerIcon } from '@/components/blocks/StoreListItem/parts/MarkerIcon';
import { storeListItemInfoCheckCircleRoundedIconSX } from '@/components/blocks/StoreListItem/styles/info/checkCircleRoundedIcon';
import { storeListItemInfoPrimaryStack } from '@/components/blocks/StoreListItem/styles/info/primaryStack';
import { storeListItemInfoSecondStack } from '@/components/blocks/StoreListItem/styles/info/secondStack';
import { storeListItemInfoThirdStack } from '@/components/blocks/StoreListItem/styles/info/thirdStack';
import { useLocalization } from '@/data/Localization';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

type Props = {
	storeLocator: SelectedStoreLocator;
	physicalStore: StoreDetails;
	isInventoryLoading?: boolean;
	physicalStoreAvailability?: string;
	physicalStoreAvailabilityData?: ProductAvailabilityData;
	countDistance: (store: StoreDetails) => number;
	displayInventory: boolean;
};
export const StoreListItemInfo: FC<Props> = ({
	storeLocator,
	physicalStore: store,
	isInventoryLoading = false,
	physicalStoreAvailability,
	physicalStoreAvailabilityData,
	countDistance,
	displayInventory,
}) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const localization = useLocalization('StoreLocator');
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
					<Stack>
						<CheckCircleRoundedIcon sx={storeListItemInfoCheckCircleRoundedIconSX} />
					</Stack>
				) : !displayInventory ? (
					<StoreListItemExpander
						physicalStoreAvailability={physicalStoreAvailability}
						physicalStoreAvailabilityData={physicalStoreAvailabilityData}
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
						physicalStoreAvailabilityData={physicalStoreAvailabilityData}
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
