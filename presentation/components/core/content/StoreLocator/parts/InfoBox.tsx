/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { StoreLocatorMarkerIcon } from '@/components/content/StoreLocator/parts/MarkerIcon';
import { storeLocatorInfoBoxSX } from '@/components/content/StoreLocator/styles/infoBox';
import { infoBoxStackLevelOneSX } from '@/components/content/StoreLocator/styles/infoBoxStackLevelOne';
import { infoBoxStackLevelThreeSX } from '@/components/content/StoreLocator/styles/infoBoxStackLevelThree';
import { infoBoxStackLevelTwoSX } from '@/components/content/StoreLocator/styles/infoBoxStackLevelTwo';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { Order } from '@/data/types/Order';
import { StoreAttribute } from '@/data/types/Store';
import { calcDistance } from '@/utils/calcDistance';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Paper, Stack, Typography } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import { FC, useContext, useMemo } from 'react';

export const StoreLocatorInfoBox: FC = () => {
	const {
		hidden,
		locator,
		closeInfoBox,
		clickedIndex,
		mapCenter,
		getDirection,
		showDirection,
		expand,
		noDirectionPath,
		order,
		setAsMyStore,
	} = useContext(ContentContext) as ReturnType<typeof useStoreLocator> & { order?: Order };
	const inOrderContext = !!order;

	const localization = useLocalization('StoreLocator');

	const {
		storeLocator,
		actions: { selectStore },
	} = useStoreLocatorState();
	const store = locator.storeList[clickedIndex];
	const storeName = store?.storeName;
	const address = store?.storeFullAddress;
	const storeHours = store?.attributes?.find(
		(attribute: StoreAttribute) => attribute.name === 'StoreHours'
	);

	const setMyStoreBtnText = useMemo(
		() =>
			store?.id === storeLocator.selectedStore?.id
				? localization.selected.t()
				: localization.setAsMyStore.t(),
		[store, storeLocator, localization]
	);

	const distance = useMemo(
		() => (store ? calcDistance(mapCenter, store?.coordinates) : 0),
		[mapCenter, store]
	);

	const setMyStore = useMemo(
		() => setAsMyStore(store, selectStore, inOrderContext),
		[inOrderContext, selectStore, setAsMyStore, store]
	);

	return (
		<Paper sx={storeLocatorInfoBoxSX(hidden)}>
			<Stack direction="row" spacing={2} sx={infoBoxStackLevelOneSX}>
				<StoreLocatorMarkerIcon label={String(clickedIndex + 1)} />
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={infoBoxStackLevelTwoSX}>
					<Stack sx={infoBoxStackLevelThreeSX} spacing={1}>
						{storeName ? (
							<Typography variant="h6">
								{storeName}
								<Typography variant="caption" marginLeft={2}>
									{localization.distanceKM.t({ distance })}
								</Typography>
							</Typography>
						) : null}
						{address ? <Typography>{address}</Typography> : null}
						{expand ? (
							<>
								<Button
									data-testid="store-locator-info-box-get-directions"
									id="store-locator-info-box-get-directions"
									onClick={getDirection}
									variant="outlined"
								>
									{showDirection ? localization.stopDirections.t() : localization.getDirections.t()}
								</Button>
								{noDirectionPath && showDirection ? (
									<Typography variant="caption" color="textSecondary">
										{localization.directionNotAvailable.t()}
									</Typography>
								) : null}
								{storeHours ? (
									<>
										<Typography>{storeHours.displayName + ':'}</Typography>
										<Typography>{HTMLReactParser(storeHours.displayValue)}</Typography>
									</>
								) : null}
							</>
						) : null}
					</Stack>
					<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={infoBoxStackLevelThreeSX}>
						<OneClick
							data-testid="store-locator-set-as-my-store"
							id="store-locator-set-as-my-store"
							variant="contained"
							overlay
							onClick={setMyStore}
							disabled={store?.id === storeLocator.selectedStore?.id}
						>
							{setMyStoreBtnText}
						</OneClick>
						<Button
							data-testid="store-locator-info-box-hide-button"
							id="store-locator-info-box-hide-button"
							variant="outlined"
							onClick={closeInfoBox}
							endIcon={expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
						>
							{expand ? localization.hide.t() : localization.expand.t()}
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	);
};
