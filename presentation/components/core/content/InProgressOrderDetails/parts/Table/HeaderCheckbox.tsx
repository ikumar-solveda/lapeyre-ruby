/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { OrderItem } from '@/data/types/Order';
import { Checkbox } from '@mui/material';
import type { HeaderContext } from '@tanstack/react-table';
import { type FC } from 'react';

export const InProgressOrderDetailsTableHeaderCheckbox: FC<HeaderContext<OrderItem, unknown>> = ({
	table,
}) => {
	// Check if any row is disabled
	const isAnyRowDisabled = table.getRowModel().rows.some((row) => !row.getCanSelect());

	return (
		<Checkbox
			checked={isAnyRowDisabled ? false : table.getIsAllRowsSelected()}
			indeterminate={isAnyRowDisabled ? false : table.getIsSomeRowsSelected()}
			onChange={table.getToggleAllRowsSelectedHandler()}
			disabled={isAnyRowDisabled}
		/>
	);
};
