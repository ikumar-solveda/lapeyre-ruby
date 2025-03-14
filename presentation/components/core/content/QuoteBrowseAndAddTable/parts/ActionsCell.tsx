/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductType } from '@/data/types/Product';
import { QuoteBrowseAndAddTableContextValues } from '@/data/types/Quote';
import { DeleteOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, type FC } from 'react';

export const QuoteBrowseAndAddTableActionsCell: FC<CellContext<ProductType, string>> = ({
	row,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const { onDeleteItem } = useContext(ContentContext) as QuoteBrowseAndAddTableContextValues;

	return (
		<TableCellResponsiveContent label={localization.Actions.t()}>
			<Tooltip title={localization.DeleteProduct.t()}>
				<IconButton
					id="quote-browse-and-add-table-actions-delete-button"
					data-testid="quote-browse-and-add-table-actions-delete-button"
					onClick={onDeleteItem(row.original.partNumber as string)}
					color="primary"
				>
					<DeleteOutlined />
				</IconButton>
			</Tooltip>
		</TableCellResponsiveContent>
	);
};
