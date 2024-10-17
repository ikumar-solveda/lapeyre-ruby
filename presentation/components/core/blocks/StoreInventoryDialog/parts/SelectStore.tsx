/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { StoreInventoryDialog } from '@/components/blocks/StoreInventoryDialog';
import { storeInventoryDialogSelectStoreButtonSX } from '@/components/blocks/StoreInventoryDialog/styles/selectStore/button';
import { storeInventoryDialogSelectStoreIconSX } from '@/components/blocks/StoreInventoryDialog/styles/selectStore/icon';
import { useStoreList } from '@/data/Content/StoreList';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { SelectStoreContextValue } from '@/data/types/StoreInventoryDialog';
import StoreIcon from '@mui/icons-material/Store';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useMemo } from 'react';

type Props = {
	children?: JSX.Element | JSX.Element[] | undefined;
	isLoading: boolean;
	current: StoreDetails;
	product: ProductType | undefined;
	dialogState: boolean;
	onDialog: () => void;
};

export const StoreInventoryDialogSelectStore: FC<Props> = ({
	product,
	current,
	children,
	isLoading,
	dialogState,
	onDialog,
}) => {
	const { PickupFrom } = useLocalization('SelectStore');
	const { setAsMyStore } = useStoreList();
	const ctxValue = useMemo(
		() =>
			({
				product,
				setAsMyStore,
				onDialog,
				dialogState,
				physicalStore: current,
			} as SelectStoreContextValue),
		[product, current, dialogState, onDialog, setAsMyStore]
	);

	return (
		<ContentProvider value={ctxValue}>
			<Stack direction="row" justifyContent="flex-end" alignItems="center">
				{isLoading ? (
					<CircularProgress />
				) : (
					<LocalizationWithComponent
						text={
							isEmpty(current)
								? PickupFrom.SelectAStore.t()
								: PickupFrom.PhysicalStore.t({ physicalStore: current.physicalStoreName })
						}
						components={[
							<StoreIcon key="0" sx={storeInventoryDialogSelectStoreIconSX} />,
							<Typography key="1" variant="subtitle1" component="span">
								<Linkable
									type="inline"
									id="button-select-a-store"
									data-testid="button-select-a-store"
									aria-label="button-select-a-store"
									sx={storeInventoryDialogSelectStoreButtonSX}
									onClick={onDialog}
								></Linkable>
							</Typography>,
						]}
					/>
				)}
			</Stack>
			{dialogState ? (
				<StoreInventoryDialog open={dialogState}>{children}</StoreInventoryDialog>
			) : null}
		</ContentProvider>
	);
};
