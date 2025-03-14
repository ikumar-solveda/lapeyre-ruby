/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { Checkbox } from '@mui/material';
import type { HeaderContext } from '@tanstack/react-table';
import { type FC } from 'react';

export const InProgressOrdersTableHeaderCheckbox: FC<
	HeaderContext<InProgressOrderSummaryItem, unknown>
> = ({ table }) => {
	const disabled = table.getRowModel().rows.some((row) => !row.getCanSelect());

	return (
		<Checkbox
			checked={disabled ? false : table.getIsAllRowsSelected()}
			indeterminate={disabled ? false : table.getIsSomeRowsSelected()}
			disabled={disabled}
			onChange={table.getToggleAllRowsSelectedHandler()}
		/>
	);
};
