/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE } from '@/data/constants/inProgressOrders';
import { useLocalization } from '@/data/Localization';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { Checkbox } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrdersTableCheckboxCell: FC<
	CellContext<InProgressOrderSummaryItem, unknown>
> = ({ row }) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Select.t()}>
			<Checkbox
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-select-item-${row.id}`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-select-item-${row.id}`}
				aria-label={inProgressOrdersTableNLS.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
				disabled={!row.getCanSelect()}
			/>
		</TableCellResponsiveContent>
	);
};
