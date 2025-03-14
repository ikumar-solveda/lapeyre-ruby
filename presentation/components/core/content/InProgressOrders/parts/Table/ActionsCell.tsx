/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import {
	AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE,
	DIALOG_STATES,
} from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrdersDialogStateType,
	InProgressOrderSummaryItem,
} from '@/data/types/InProgressOrders';
import { ArrowForwardIos, ContentCopyOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useCallback, useContext, useMemo, type FC } from 'react';

export const InProgressOrdersTableActionsCell: FC<
	CellContext<InProgressOrderSummaryItem, unknown>
> = ({ row }) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');
	const { setOrderId, openDialog, user } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const routes = useLocalization('Routes');
	const isForeign = useMemo(() => row.original.buyerId !== user?.userId, [row, user]);

	const onOpenDialog = useCallback(
		(dialogState: InProgressOrdersDialogStateType) => async () => {
			openDialog(dialogState);
			setOrderId([row.original.orderId as string]);
		},
		[openDialog, row.original.orderId, setOrderId]
	);

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Labels.Actions.t()}>
			<Stack direction="row" alignItems="center">
				<Tooltip title={inProgressOrdersTableNLS.CopyTitle.t()}>
					<Box component="span">
						<IconButton
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-copy-button`}
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-copy-button`}
							color="primary"
							onClick={onOpenDialog(DIALOG_STATES.COPY)}
							disabled={isForeign}
						>
							<ContentCopyOutlined />
						</IconButton>
					</Box>
				</Tooltip>
				<Tooltip title={inProgressOrdersTableNLS.DeleteTitle.t()}>
					<Box component="span">
						<IconButton
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-delete-button`}
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-delete-button`}
							color="primary"
							onClick={onOpenDialog(DIALOG_STATES.DELETE)}
							disabled={isForeign}
						>
							<DeleteOutlineOutlined />
						</IconButton>
					</Box>
				</Tooltip>
				<Linkable
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-order-details-button`}
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-${row.id}-actions-order-details-button`}
					href={{
						pathname: routes.InProgressOrderDetails.route.t(),
						query: { id: row.original.orderId },
					}}
				>
					<Tooltip title={inProgressOrdersTableNLS.OrderDetailsTitle.t()}>
						<IconButton color="primary">
							<ArrowForwardIos />
						</IconButton>
					</Tooltip>
				</Linkable>
			</Stack>
		</TableCellResponsiveContent>
	);
};
