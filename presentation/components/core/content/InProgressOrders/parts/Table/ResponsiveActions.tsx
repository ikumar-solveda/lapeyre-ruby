/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ResponsiveActionsMenu } from '@/components/blocks/ResponsiveActionsMenu';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrdersDialogStateType,
	InProgressOrderSummaryItem,
} from '@/data/types/InProgressOrders';
import { MenuItem } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC, MouseEvent, useCallback, useContext, useMemo, useState } from 'react';

export const InProgressOrdersTableResponsiveActions: FC<
	CellContext<InProgressOrderSummaryItem, unknown>
> = ({ row }) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');
	const { setOrderId, openDialog, user } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const routes = useLocalization('Routes');
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget), []);
	const onClose = useCallback(() => setAnchor(null), []);
	const isForeign = useMemo(() => row.original.buyerId !== user?.userId, [row, user]);

	const onOpenDialog = useCallback(
		(dialogState: InProgressOrdersDialogStateType) => (_e: MouseEvent<HTMLLIElement>) => {
			openDialog(dialogState);
			setOrderId([row.original.orderId as string]);
			onClose();
		},
		[openDialog, onClose, setOrderId, row.original.orderId]
	);

	return (
		<ResponsiveActionsMenu
			anchor={anchor}
			onClose={onClose}
			onOpen={onOpen}
			id="in-progress-orders-actions"
			label={inProgressOrdersTableNLS.Labels.Actions.t()}
		>
			<MenuItem onClick={onOpenDialog(DIALOG_STATES.COPY)} disabled={isForeign}>
				{inProgressOrdersTableNLS.Copy.t()}
			</MenuItem>
			<MenuItem onClick={onOpenDialog(DIALOG_STATES.DELETE)} disabled={isForeign}>
				{inProgressOrdersTableNLS.Delete.t()}
			</MenuItem>
			<MenuItem>
				<Linkable
					color="inherit"
					href={{
						pathname: routes.InProgressOrderDetails.route.t(),
						query: { id: row.original?.orderId },
					}}
				>
					{inProgressOrdersTableNLS.OrderDetailsTitle.t()}
				</Linkable>
			</MenuItem>
		</ResponsiveActionsMenu>
	);
};
