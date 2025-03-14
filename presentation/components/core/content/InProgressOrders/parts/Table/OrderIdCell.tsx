/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContentV2 } from '@/components/blocks/Table/TableCellResponsiveContentV2';
import { InProgressOrdersTableResponsiveActions } from '@/components/content/InProgressOrders/parts/Table/ResponsiveActions';
import { inProgressOrdersNameTypographySX } from '@/components/content/InProgressOrders/styles/Table/nameTypography';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrderSummaryItem,
} from '@/data/types/InProgressOrders';
import { Stack, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, type FC } from 'react';

export const InProgressOrdersTableOrderIdCell: FC<
	CellContext<InProgressOrderSummaryItem, unknown>
> = (props) => {
	const { row } = props;
	const { original: order } = row;
	const routes = useLocalization('Routes');
	const nls = useLocalization('InProgressOrdersNew');
	const { cartData } = useContext(ContentContext) as InProgressOrdersContextValues;
	const isCurrentCart = order && cartData.data?.orderId === order.orderId;

	return (
		<TableCellResponsiveContentV2 menu={<InProgressOrdersTableResponsiveActions {...props} />}>
			<Linkable
				href={{ pathname: routes.InProgressOrderDetails.route.t(), query: { id: order?.orderId } }}
				id="in-progress-order-id"
				data-testid="in-progress-order-id"
			>
				{order?.orderId}
			</Linkable>
			<Stack>
				{order?.orderDescription ? (
					<Typography variant="body2" sx={inProgressOrdersNameTypographySX}>
						{order.orderDescription}
					</Typography>
				) : null}
				{isCurrentCart ? (
					<Typography sx={inProgressOrdersNameTypographySX}>{nls.CurrentCart.t()}</Typography>
				) : null}
			</Stack>
		</TableCellResponsiveContentV2>
	);
};
