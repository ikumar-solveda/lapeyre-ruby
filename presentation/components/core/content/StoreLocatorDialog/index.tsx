/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { storeInventoryDialogCloseIconSX } from '@/components/blocks/StoreInventoryDialog/styles/closeIcon';
import { OrderStoreLocator } from '@/components/content/StoreLocator';
import { storeLocatorDialogSX } from '@/components/content/StoreLocatorDialog/styles';
import { useLocalization } from '@/data/Localization';
import { STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID } from '@/data/constants/storeLocator';
import { Order } from '@/data/types/Order';
import { blurActiveInputElement } from '@/utils/blurActiveInputElement';
import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

type Props = {
	order?: Order;
	storeLocatorDialogState: boolean;
	onStoreLocatorDialog: () => void;
};

export const StoreLocatorDialog: FC<Props> = ({
	order,
	storeLocatorDialogState,
	onStoreLocatorDialog,
}) => {
	const storeNLS = useLocalization('StoreLocatorDialog');
	const small = useMediaQuery(useTheme().breakpoints.down('md'));

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="lg"
			fullWidth
			fullScreen={small}
			open={storeLocatorDialogState}
			onClose={onStoreLocatorDialog}
			sx={storeLocatorDialogSX}
			onScrollCapture={blurActiveInputElement(STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID)}
		>
			<DialogTitle>{storeNLS.pickupLocation.t()}</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={onStoreLocatorDialog}
				sx={storeInventoryDialogCloseIconSX}
			>
				<CloseIcon />
			</IconButton>
			<Divider />
			<DialogContent>
				<OrderStoreLocator order={order} />
			</DialogContent>
		</Dialog>
	);
};
