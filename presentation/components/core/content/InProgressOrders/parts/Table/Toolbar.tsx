/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { inProgressOrdersTableToolbarStack } from '@/components/content/InProgressOrders/styles/Table/toolbarStack';
import {
	AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE,
	DIALOG_STATES,
} from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrdersDialogStateType,
} from '@/data/types/InProgressOrders';
import { Stack, Toolbar, Typography } from '@mui/material';
import { RowSelectionState } from '@tanstack/react-table';
import { type FC, useCallback, useContext, useMemo } from 'react';

export const InProgressOrdersTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const { orders, openDialog, setOrderId } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const nls = useLocalization('InProgressOrdersNew');
	const selectedItems = useMemo(
		() =>
			orders
				?.filter(({ orderId }) => orderId && rowSelection[orderId])
				.map(({ orderId }) => orderId) ?? [],
		[orders, rowSelection]
	);

	const onOpenDialog = useCallback(
		(dialogState: InProgressOrdersDialogStateType) => async () => {
			openDialog(dialogState);
			setOrderId(selectedItems as string[]);
		},
		[openDialog, selectedItems, setOrderId]
	);

	return (
		<Toolbar
			id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-toolbar`}
			data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-toolbar`}
		>
			<Stack {...inProgressOrdersTableToolbarStack}>
				{selectedItems.length ? (
					<>
						<Typography variant="subtitle1">
							{nls.nOrdersSel.t({ n: selectedItems.length })}
						</Typography>
						<OneClick
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-toolbar-group-delete`}
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-toolbar-group-delete`}
							variant="outlined"
							onClick={onOpenDialog(DIALOG_STATES.DELETE)}
						>
							{nls.DeleteSelected.t()}
						</OneClick>
					</>
				) : null}
			</Stack>
		</Toolbar>
	);
};
