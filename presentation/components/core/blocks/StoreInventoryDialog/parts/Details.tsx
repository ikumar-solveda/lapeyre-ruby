/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { storeInventoryDialogDetailsContainerSX } from '@/components/blocks/StoreInventoryDialog/styles/details/container';
import { storeInventoryDialogDetailsSAMSButtonSX } from '@/components/blocks/StoreInventoryDialog/styles/details/samsButton';
import { storeInventoryDialogDetailsTitleStack } from '@/components/blocks/StoreInventoryDialog/styles/details/title';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { StoreDetails } from '@/data/types/Store';
import { StoreInventoryDialogContextValue } from '@/data/types/StoreInventoryDialog';
import { Button, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useContext, useMemo } from 'react';

type Props = {
	candidate?: StoreDetails; // deprecated -- use from context
	children: JSX.Element | JSX.Element[] | undefined;
};
export const StoreInventoryDialogDetails: FC<Props> = ({ children }) => {
	const { setAsMyStore, physicalStore, candidate, pickupItemsExist } = useContext(
		ContentContext
	) as StoreInventoryDialogContextValue;
	const storeNLS = useLocalization('StoreInventoryDialog');

	const { actions } = useStoreLocatorState();
	const sameAsSelected = candidate?.id === physicalStore?.id;
	const onClick = useMemo(
		() => setAsMyStore(candidate, actions.selectStore, false),
		[actions.selectStore, candidate, setAsMyStore]
	);

	return (
		<Stack spacing={2} sx={storeInventoryDialogDetailsContainerSX}>
			<Stack {...storeInventoryDialogDetailsTitleStack}>
				{pickupItemsExist ? (
					<LocalizationWithComponent
						text={
							isEmpty(candidate)
								? storeNLS.InventoryDetailsWithoutStore.t()
								: storeNLS.InventoryDetailsWithStore.t({ store: candidate.physicalStoreName })
						}
						components={[
							<Typography key="0" variant="h6" component="span">
								<Typography color="primary" variant="strong" />
							</Typography>,
						]}
					/>
				) : (
					<Typography variant="h6">
						{isEmpty(candidate) ? storeNLS.SelectStoreFromList.t() : candidate.physicalStoreName}
					</Typography>
				)}
				<Button
					variant="contained"
					onClick={onClick}
					disabled={sameAsSelected}
					sx={storeInventoryDialogDetailsSAMSButtonSX}
				>
					{sameAsSelected && !isEmpty(physicalStore)
						? storeNLS.Labels.Selected.t()
						: storeNLS.Labels.SetAsMyStore.t()}
				</Button>
			</Stack>
			{children}
		</Stack>
	);
};
