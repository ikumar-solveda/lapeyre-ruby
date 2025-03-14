/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { inProgressOrdersTableTypographySX } from '@/components/content/InProgressOrders/styles/Table/typography';
import { useLocalization } from '@/data/Localization';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { dFix } from '@/utils/floatingPoint';
import { Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrdersTableTotalPriceCell: FC<
	CellContext<InProgressOrderSummaryItem, unknown>
> = ({ row }) => {
	const { original: order } = row;
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Labels.TotalPrice.t()}>
			<Typography
				data-testid="in-progress-order-grand-total"
				id="in-progress-order-grand-total"
				sx={inProgressOrdersTableTypographySX}
			>
				{order ? (
					<PriceDisplayBase
						currency={order.grandTotalCurrency as string}
						min={dFix(`${order.grandTotal}`)}
					/>
				) : null}
			</Typography>
		</TableCellResponsiveContent>
	);
};
