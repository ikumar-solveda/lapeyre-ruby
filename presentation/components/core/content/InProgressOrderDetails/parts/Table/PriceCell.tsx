/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useMemo, type FC } from 'react';

export const InProgressOrderDetailsTablePriceCell: FC<CellContext<OrderItem, unknown>> = (
	props
) => {
	const nls = useLocalization('InProgressOrderDetails');
	const priceNLS = useLocalization('PriceDisplay');
	const { row } = props;
	const { orderItemPrice, currency } = row.original;
	const price = useMemo(() => dFix(orderItemPrice ?? 0), [orderItemPrice]);

	return (
		<TableCellResponsiveContent label={nls.Table.price.t()}>
			<Typography
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-price`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-price`}
			>
				{orderItemPrice ? (
					<PriceDisplayBase currency={currency} min={price} />
				) : (
					priceNLS.Labels.Pending.t()
				)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
