/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { Checkbox } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC } from 'react';

export const InProgressOrderDetailsTableCheckboxCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrderDetails');

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Select.t()}>
			<Checkbox
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-select-item-${row.id}`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-select-item-${row.id}`}
				aria-label={inProgressOrdersTableNLS.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
				disabled={!row.getCanSelect()}
			/>
		</TableCellResponsiveContent>
	);
};
