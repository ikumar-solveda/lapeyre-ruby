/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrderItem } from '@/data/types/Order';
import { Checkbox } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListDetailsTableHeaderCheckbox: FC<HeaderContext<OrderItem, unknown>> = ({
	table,
}) => (
	<Checkbox
		checked={table.getIsAllRowsSelected()}
		indeterminate={table.getIsSomeRowsSelected()}
		onChange={table.getToggleAllRowsSelectedHandler()}
	/>
);
