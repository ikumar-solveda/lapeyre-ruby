/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { StoreListItemInfo } from '@/components/blocks/StoreListItem/parts/Info';
import { storeListItemCardSX } from '@/components/blocks/StoreListItem/styles/card';
import { storeListItemDividerSX } from '@/components/blocks/StoreListItem/styles/divider';
import { storeListItemSetAsMyStoreSX } from '@/components/blocks/StoreListItem/styles/setAsMyStore';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useStoreList } from '@/data/Content/StoreList';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { LatLng, StoreDetails } from '@/data/types/Store';
import { calcDistance } from '@/utils/calcDistance';
import { Card, Divider, ListItem, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useContext, useMemo } from 'react';

type Props = {
	physicalStore: StoreDetails;
	showInStockLocation?: boolean;
	partNumber?: string;
	index?: number;
	displayInventory?: boolean;
	onSetCandidate?: (store: StoreDetails) => () => void;
};

export const StoreListItem: FC<Props> = ({
	partNumber,
	physicalStore,
	index,
	showInStockLocation,
	displayInventory = true,
	onSetCandidate,
}) => {
	const { setAsMyStore, searchTerm, locator, currentLocation } = useContext(
		ContentContext
	) as ReturnType<typeof useStoreList> & { currentLocation: LatLng };
	const { availability, isLoading: isInventoryLoading } = useInventoryV2({
		partNumber,
		physicalStore,
	});

	/** @deprecated  use `physicalStoreAvailabilityData` instead */
	const physicalStoreAvailability = useMemo(
		() => availability?.find((avail) => avail.physicalStoreStatus)?.availableQuantity,
		[availability]
	);

	const physicalStoreAvailabilityData = useMemo(
		() => availability?.find((avail) => avail.physicalStoreStatus),
		[availability]
	);

	const { storeLocator, actions } = useStoreLocatorState();
	const drawer = useLocalization('Inventory').Drawer;
	const isSelected = physicalStore?.id === storeLocator?.selectedStore.id;
	const onClick = useMemo(
		() => setAsMyStore(physicalStore, actions.selectStore, false),
		[physicalStore, actions, setAsMyStore]
	);

	const countDistance = useMemo(
		() => (store: StoreDetails) =>
			calcDistance(searchTerm ? locator.center : currentLocation, store.coordinates),
		[currentLocation, locator, searchTerm]
	);
	const id = useMemo(() => `store-list-item-card-${index}`, [index]);

	const showPhysicalStore = useMemo(
		() =>
			!showInStockLocation ||
			!!dFix(physicalStoreAvailabilityData?.availableQuantity ?? EMPTY_STRING),
		[showInStockLocation, physicalStoreAvailabilityData]
	);

	return !isEmpty(physicalStore) && showPhysicalStore ? (
		<>
			<ListItem>
				<Card
					variant="outlined"
					sx={storeListItemCardSX(isSelected, !displayInventory)}
					id={id}
					data-testid={id}
					onClick={onSetCandidate ? onSetCandidate(physicalStore) : undefined}
				>
					<Stack alignItems="center">
						<StoreListItemInfo
							storeLocator={storeLocator}
							physicalStoreAvailability={physicalStoreAvailability}
							physicalStoreAvailabilityData={physicalStoreAvailabilityData}
							isInventoryLoading={isInventoryLoading}
							physicalStore={physicalStore}
							countDistance={countDistance}
							displayInventory={displayInventory}
						/>
						{displayInventory && !isSelected ? (
							<OneClick variant="outlined" sx={storeListItemSetAsMyStoreSX} onClick={onClick}>
								{drawer.SetAsMyStore.t()}
							</OneClick>
						) : null}
					</Stack>
				</Card>
			</ListItem>
			{displayInventory ? (
				<ListItem>
					<Divider sx={storeListItemDividerSX} />
				</ListItem>
			) : null}
		</>
	) : null;
};
