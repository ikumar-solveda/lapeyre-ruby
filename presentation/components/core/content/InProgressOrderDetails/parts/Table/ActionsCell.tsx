/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { AddShoppingCart, DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, Stack, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC, useContext, useMemo } from 'react';

export const InProgressOrderDetailsTableActionsCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrderDetails');
	const { onDelete, onMoveOrderItemToCart, activeOrderId, data } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails>;
	const isActiveOrder = useMemo(() => activeOrderId === data?.orderId, [activeOrderId, data]);

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Table.actions.t()}>
			<Stack direction="row" alignItems="center">
				<Tooltip title={inProgressOrdersTableNLS.Tooltip.MoveToCart.t()}>
					<Box component="span">
						<OneClick
							wrapper="icon"
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-actions-add-to-cart-button`}
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-actions-add-to-cart-button`}
							color="primary"
							onClick={onMoveOrderItemToCart(row.original.partNumber, row.original.quantity)}
							disabled={isActiveOrder}
						>
							<AddShoppingCart />
						</OneClick>
					</Box>
				</Tooltip>
				<Tooltip title={inProgressOrdersTableNLS.Tooltip.RemoveItem.t()}>
					<Box component="span">
						<OneClick
							wrapper="icon"
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-actions-delete-button`}
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-actions-delete-button`}
							color="primary"
							onClick={onDelete(row.original.orderItemId)}
							disabled={!row.getCanSelect()}
						>
							<DeleteOutlineOutlined />
						</OneClick>
					</Box>
				</Tooltip>
			</Stack>
		</TableCellResponsiveContent>
	);
};
