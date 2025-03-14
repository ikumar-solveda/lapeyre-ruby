/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { inProgressOrdersTableTypographySX } from '@/components/content/InProgressOrders/styles/Table/typography';
import { useLocalization } from '@/data/Localization';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrdersTableOrderTypeCell: FC<
	CellContext<InProgressOrderSummaryItem, string>
> = ({ getValue }) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Labels.OrderType.t()}>
			<Typography sx={inProgressOrdersTableTypographySX}>
				{inProgressOrdersTableNLS.Status[
					getValue() as keyof typeof inProgressOrdersTableNLS.Status
				].t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
