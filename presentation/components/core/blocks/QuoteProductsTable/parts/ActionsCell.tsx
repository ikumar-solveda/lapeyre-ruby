/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import type { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductItem } from '@/data/types/Quote';
import { DeleteOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, type FC } from 'react';

export const QuoteProductsTableActionsCell: FC<CellContext<ProductItem, string>> = ({ row }) => {
	const localization = useLocalization('QuoteProductsTable');
	const { deleteQuoteItem } = useContext(ContentContext) as ReturnType<typeof useQuoteProducts>;

	return (
		<TableCellResponsiveContent label={localization.Actions.t()}>
			<Tooltip title={localization.DeleteProduct.t()}>
				<IconButton
					id="quote-products-table-actions-cell-delete-product"
					data-testid="quote-products-table-actions-cell-delete-product"
					onClick={deleteQuoteItem(row.original.id as string)}
					color="primary"
				>
					<DeleteOutlined />
				</IconButton>
			</Tooltip>
		</TableCellResponsiveContent>
	);
};
