/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OrderStoreLocator } from '@/components/content/StoreLocator';
import { storeLocatorDialogSX } from '@/components/content/StoreLocatorDialog/styles';
import { useLocalization } from '@/data/Localization';
import { STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID } from '@/data/constants/storeLocator';
import type { Order } from '@/data/types/Order';
import { blurActiveInputElement } from '@/utils/blurActiveInputElement';
import { useMediaQuery, type DialogProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, type FC } from 'react';

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
	const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
	const props = useMemo(
		() =>
			({
				onScrollCapture: blurActiveInputElement(STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID),
				sx: storeLocatorDialogSX,
				maxWidth: 'lg',
				fullScreen,
			} as Partial<DialogProps>),
		[fullScreen]
	);

	return (
		<Dialog
			title={storeNLS.pickupLocation.t()}
			open={storeLocatorDialogState}
			onClose={onStoreLocatorDialog}
			content={<OrderStoreLocator order={order} />}
			actions={null}
			props={props}
		/>
	);
};
