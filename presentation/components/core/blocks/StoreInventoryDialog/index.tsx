/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StoreInventoryDialogDetails } from '@/components/blocks/StoreInventoryDialog/parts/Details';
import { StoreInventoryDialogEmptyListSearchIcon } from '@/components/blocks/StoreInventoryDialog/parts/EmptyListSearchIcon';
import { StoreInventoryDialogList } from '@/components/blocks/StoreInventoryDialog/parts/List';
import { StoreInventoryDialogPanel } from '@/components/blocks/StoreInventoryDialog/parts/Panel';
import { storeInventoryDialogCloseIconSX } from '@/components/blocks/StoreInventoryDialog/styles/closeIcon';
import { storeInventoryDialogContainerSX } from '@/components/blocks/StoreInventoryDialog/styles/container';
import { storeInventoryDialogContentSectionSX } from '@/components/blocks/StoreInventoryDialog/styles/contentSection';
import { storeInventoryDialogGridContainerSX } from '@/components/blocks/StoreInventoryDialog/styles/gridContainer';
import { storeInventoryDialogPaperContainerSX } from '@/components/blocks/StoreInventoryDialog/styles/paperContainer';
import { useLocalization } from '@/data/Localization';
import { GOOGLE_MAPS_SEARCH_FIELD_ID } from '@/data/constants/googleMaps';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { StoreDetails } from '@/data/types/Store';
import {
	SelectStoreContextValue,
	StoreInventoryDialogContextValue,
} from '@/data/types/StoreInventoryDialog';
import { blurActiveInputElement } from '@/utils/blurActiveInputElement';
import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Props = {
	open: boolean;
	children: JSX.Element | JSX.Element[] | undefined;
	pickupItemsExist?: boolean;
};
export const StoreInventoryDialog: FC<Props> = ({ open, children, pickupItemsExist = true }) => {
	const storeNLS = useLocalization('StoreInventoryDialog');
	const parentCtxValue = useContext(ContentContext) as SelectStoreContextValue;
	const { physicalStore, onDialog } = parentCtxValue;
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const [candidate, setCandidate] = useState<StoreDetails>(physicalStore);
	const onSetCandidate = useCallback((store: StoreDetails) => () => setCandidate(store), []);
	const ctxValue: StoreInventoryDialogContextValue = useMemo(
		() => ({ ...parentCtxValue, candidate, pickupItemsExist }),
		[candidate, parentCtxValue, pickupItemsExist]
	);

	useEffect(() => {
		// set and reset to physicalStore on dialog state change
		setCandidate(physicalStore);
	}, [open]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="lg"
			fullWidth
			fullScreen={small}
			open={open}
			onClose={onDialog}
			sx={storeInventoryDialogContainerSX}
			onScrollCapture={blurActiveInputElement(GOOGLE_MAPS_SEARCH_FIELD_ID)}
		>
			<DialogTitle>
				{isEmpty(candidate) ? storeNLS.SelectStore.t() : storeNLS.SelectedPickupLocation.t()}
			</DialogTitle>
			<IconButton aria-label="close" onClick={onDialog} sx={storeInventoryDialogCloseIconSX}>
				<CloseIcon />
			</IconButton>
			<Divider />
			<DialogContent sx={storeInventoryDialogContentSectionSX}>
				<ContentProvider value={ctxValue}>
					<Grid container spacing={2} sx={storeInventoryDialogGridContainerSX}>
						<Grid item xs md={4} sx={storeInventoryDialogGridContainerSX}>
							<StoreInventoryDialogPanel label={storeNLS.Labels.StoreList.t()}>
								<Paper sx={storeInventoryDialogPaperContainerSX} variant="outlined">
									<StoreInventoryDialogList onSetCandidate={onSetCandidate} />
								</Paper>
							</StoreInventoryDialogPanel>
						</Grid>
						<Grid item xs={12} md={8} sx={storeInventoryDialogGridContainerSX}>
							<StoreInventoryDialogPanel label={storeNLS.Labels.Inventory.t()}>
								<Paper variant="outlined" sx={storeInventoryDialogPaperContainerSX}>
									<StoreInventoryDialogDetails>
										{isEmpty(candidate) || !pickupItemsExist ? (
											<Stack
												alignItems="center"
												justifyContent="center"
												sx={storeInventoryDialogPaperContainerSX}
											>
												<StoreInventoryDialogEmptyListSearchIcon />
												<Typography variant="h6">
													{isEmpty(candidate) && !pickupItemsExist
														? storeNLS.NoStoreAndNoPickupItems.t()
														: isEmpty(candidate)
														? storeNLS.StoreNotSelected.t()
														: storeNLS.NoPickupItems.t()}
												</Typography>
												<Typography align="center">
													{isEmpty(candidate) && !pickupItemsExist
														? storeNLS.SelectAStoreAndPickupItems.t()
														: isEmpty(candidate)
														? storeNLS.PleaseSelectAStore.t()
														: storeNLS.AddPickupItems.t()}
												</Typography>
											</Stack>
										) : (
											<>{children}</>
										)}
									</StoreInventoryDialogDetails>
								</Paper>
							</StoreInventoryDialogPanel>
						</Grid>
					</Grid>
				</ContentProvider>
			</DialogContent>
		</Dialog>
	);
};
