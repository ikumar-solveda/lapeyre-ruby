/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { PRODUCTS_TABLE } from '@/data/constants/quotes';
import { useLocalization } from '@/data/Localization';
import type { ProductItem } from '@/data/types/Quote';
import { Checkbox } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteProductsTableCheckboxCell: FC<CellContext<ProductItem, unknown>> = ({ row }) => {
	const localization = useLocalization('QuoteProductsTable');

	return (
		<TableCellResponsiveContent label={localization.Select.t()}>
			<Checkbox
				id={`${PRODUCTS_TABLE}-select-item-${row.id}`}
				data-testid={`${PRODUCTS_TABLE}-select-item-${row.id}`}
				aria-label={localization.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		</TableCellResponsiveContent>
	);
};
