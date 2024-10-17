/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { orderHistoryActionButtonSX } from '@/components/content/OrderHistory/styles/orderHistoryActionButton';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ArrowForwardIos, Replay } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryTableOrderActions: FC = () => {
	const labels = useLocalization('Order');
	const routes = useLocalization('Routes');
	const { order, onReOrder } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};

	return (
		<TableCellResponsiveContent label={labels.Actions.t()}>
			<Stack direction="row" columnGap={1} alignItems="flex-start">
				<Tooltip title={labels.TooltipReOrder.t()}>
					<IconButton
						data-testid="re-order"
						id="re-order"
						sx={orderHistoryActionButtonSX}
						onClick={onReOrder ? onReOrder(order?.orderId as string) : undefined}
					>
						<Replay color="primary" />
					</IconButton>
				</Tooltip>
				<Linkable
					data-testid="order-details"
					id="order-details"
					href={{ pathname: routes.OrderDetails.route.t(), query: { orderId: order?.orderId } }}
				>
					<Tooltip title={labels.OrderDetails.t()}>
						<Box>
							<ArrowForwardIos color="primary" />
						</Box>
					</Tooltip>
				</Linkable>
			</Stack>
		</TableCellResponsiveContent>
	);
};
