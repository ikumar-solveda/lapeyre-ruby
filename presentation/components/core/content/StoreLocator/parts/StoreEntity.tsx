/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { StoreLocatorMarkerIcon } from '@/components/content/StoreLocator/parts/MarkerIcon';
import { storeLocatorSideListSelectedSX } from '@/components/content/StoreLocator/styles/SideList/selected';
import { storeLocatorStoreEntityCardSX } from '@/components/content/StoreLocator/styles/StoreEntity/card';
import { storeLocatorStoreEntityCheckCircleRoundedIconSX } from '@/components/content/StoreLocator/styles/StoreEntity/checkCircleRoundedIcon';
import { storeLocatorStoreEntityDividerSX } from '@/components/content/StoreLocator/styles/StoreEntity/divider';
import { storeLocatorSideEntityStoreItemSX } from '@/components/content/StoreLocator/styles/StoreEntity/storeItem';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { useLocalization } from '@/data/Localization';
import { UNIFIED_STATUSES } from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { StoreInventoryByOrder } from '@/data/types/Inventory';
import { Order } from '@/data/types/Order';
import { StoreDetails } from '@/data/types/Store';
import { calcDistance } from '@/utils/calcDistance';
import { AccessAlarm, Check, RemoveCircleOutline } from '@mui/icons-material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Card, CircularProgress, Divider, Stack, SvgIconProps, Typography } from '@mui/material';

import { FC, useContext, useMemo } from 'react';

type Props = {
	physicalStore: StoreDetails;
	index: number;
	availabilities: Record<string, StoreInventoryByOrder>;
	inventoryLoading?: boolean;
};

export const StoreLocatorStoreEntity: FC<Props> = ({
	physicalStore: store,
	index,
	availabilities,
	inventoryLoading,
}) => {
	const localization = useLocalization('StoreLocator');
	const inventory = useLocalization('Inventory');
	const { storeLocator } = useStoreLocatorState();
	const { clickedIndex, searchTerm, locator, currentLocation, order } = useContext(
		ContentContext
	) as ReturnType<typeof useStoreLocator> & { order: Order };
	const countDistance = useMemo(
		() => (store: StoreDetails) =>
			calcDistance(searchTerm ? locator.center : currentLocation, store.coordinates),
		[currentLocation, locator, searchTerm]
	);
	const { Icon, color, availability } = useMemo(() => {
		const availability = availabilities[store.id];
		const Icon =
			availability?.overallInventoryStatus === UNIFIED_STATUSES.AVAILABLE
				? Check
				: availability?.overallInventoryStatus === UNIFIED_STATUSES.UNAVAILABLE
				? RemoveCircleOutline
				: ReportProblemOutlinedIcon;
		const color =
			availability?.overallInventoryStatus === UNIFIED_STATUSES.AVAILABLE
				? 'success'
				: availability?.overallInventoryStatus === UNIFIED_STATUSES.UNAVAILABLE
				? 'error'
				: 'warning';
		return { availability, Icon, color };
	}, [availabilities, store.id]);

	return (
		<Card
			variant="outlined"
			sx={storeLocatorSideEntityStoreItemSX(
				store.id === storeLocator.selectedStore.id,
				store.id === locator?.storeList[clickedIndex]?.id
			)}
		>
			<Stack spacing={1} sx={storeLocatorStoreEntityCardSX}>
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="row" justifyContent="flex-start" spacing={1}>
						<StoreLocatorMarkerIcon label={`${index + 1}`} />
						<Stack>
							<Typography variant="subtitle1">{store.storeName}</Typography>
							<Typography variant="caption">
								{localization.distanceKM.t({
									distance: countDistance(store),
								})}
							</Typography>
						</Stack>
					</Stack>

					{store.id === storeLocator.selectedStore?.id ? (
						<Stack>
							<CheckCircleRoundedIcon sx={storeLocatorStoreEntityCheckCircleRoundedIconSX} />
						</Stack>
					) : null}
				</Stack>

				<Stack spacing={1} sx={storeLocatorSideListSelectedSX(clickedIndex === index)}>
					{order && (availability || availabilities || inventoryLoading) ? (
						<Stack>
							<Divider sx={storeLocatorStoreEntityDividerSX} />
							<Stack>
								<Stack direction="row" spacing={1}>
									{inventoryLoading ? (
										<CircularProgress size={15} />
									) : (
										<>
											<Icon fontSize="small" color={color as SvgIconProps['color']} />
											<Typography variant="caption">
												{!availability
													? inventory.ByOrder.Unavailable.t()
													: !availability.counts
													? inventory.ByOrder[
															availability.overallInventoryStatus as keyof typeof inventory.ByOrder
													  ].t()
													: inventory.ByOrderPartial.PartialAvailable.t({
															numberOfAvailable: availability.counts.available,
															numberOfTotal: availability.counts.total,
													  })}
											</Typography>
										</>
									)}
								</Stack>
								{availability?.backorder ? (
									<Stack direction="row" spacing={1}>
										<AccessAlarm fontSize="small" color="success" />
										<Typography variant="caption">
											{inventory.ByOrderPartial.Backorder.t({ count: availability?.backorder })}
										</Typography>
									</Stack>
								) : null}
							</Stack>
						</Stack>
					) : null}
				</Stack>
			</Stack>
		</Card>
	);
};
