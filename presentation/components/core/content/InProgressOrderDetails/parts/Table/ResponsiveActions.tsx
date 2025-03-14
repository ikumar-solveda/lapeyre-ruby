/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { ResponsiveActionsMenu } from '@/components/blocks/ResponsiveActionsMenu';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { MenuItem } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC, MouseEvent, useCallback, useContext, useMemo, useState } from 'react';

export const InProgressOrdersTableResponsiveActions: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const nls = useLocalization('InProgressOrderDetails');
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget), []);
	const onClose = useCallback(() => setAnchor(null), []);
	const { onDelete, onMoveOrderItemToCart, activeOrderId, data } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails>;
	const isActiveOrder = useMemo(() => activeOrderId === data?.orderId, [activeOrderId, data]);
	const onCloseWrapper = useCallback(
		(callback: () => void | Promise<void>) => async () => {
			await callback();
			onClose();
		},
		[onClose]
	);

	return (
		<ResponsiveActionsMenu
			anchor={anchor}
			onClose={onClose}
			onOpen={onOpen}
			id="in-progress-order-details-actions"
			label={nls.Table.actions.t()}
		>
			<MenuItem
				onClick={onCloseWrapper(
					onMoveOrderItemToCart(row.original.partNumber, row.original.quantity)
				)}
				disabled={isActiveOrder}
			>
				{nls.Tooltip.MoveToCart.t()}
			</MenuItem>
			<MenuItem
				onClick={onCloseWrapper(onDelete(row.original.orderItemId))}
				disabled={!row.getCanSelect()}
			>
				{nls.Tooltip.RemoveItem.t()}
			</MenuItem>
			<MenuItem onClick={onCloseWrapper(row.getToggleExpandedHandler())}>
				{row.getIsExpanded() ? nls.Table.hide.t() : nls.Table.show.t()}
			</MenuItem>
		</ResponsiveActionsMenu>
	);
};
