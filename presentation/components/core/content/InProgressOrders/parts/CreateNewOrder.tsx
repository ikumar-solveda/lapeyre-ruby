/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrdersDialogStateType,
} from '@/data/types/InProgressOrders';
import { Button } from '@mui/material';
import { type FC, useCallback, useContext } from 'react';

export const InProgressOrdersCreateNewOrder: FC = () => {
	const { openDialog } = useContext(ContentContext) as InProgressOrdersContextValues;
	const localization = useLocalization('InProgressOrdersNew');

	const onOpenDialog = useCallback(
		(dialogState: InProgressOrdersDialogStateType) => () => openDialog(dialogState),
		[openDialog]
	);

	return (
		<Button
			variant="contained"
			onClick={onOpenDialog(DIALOG_STATES.CREATE)}
			id="in-progress-orders-create-new-button"
			data-testid="in-progress-orders-create-new-button"
		>
			{localization.CreateNewOrder.t()}
		</Button>
	);
};
