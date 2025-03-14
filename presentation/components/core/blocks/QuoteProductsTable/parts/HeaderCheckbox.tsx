/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PRODUCTS_TABLE } from '@/data/constants/quotes';
import type { ProductItem } from '@/data/types/Quote';
import { Checkbox } from '@mui/material';
import type { HeaderContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteProductsTableHeaderCheckbox: FC<HeaderContext<ProductItem, unknown>> = ({
	table,
}) => (
	<Checkbox
		checked={table.getIsAllRowsSelected()}
		indeterminate={table.getIsSomeRowsSelected()}
		onChange={table.getToggleAllRowsSelectedHandler()}
		data-testid={`${PRODUCTS_TABLE}-header-checkbox`}
		id={`${PRODUCTS_TABLE}-header-checkbox`}
	/>
);
