/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteProductsTableToolbarSX } from '@/components/blocks/QuoteProductsTable/styles/toolbar';
import { EMPTY_STRING } from '@/data/constants/marketing';
import type { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { DeleteOutlined } from '@mui/icons-material';
import { Button, Toolbar } from '@mui/material';
import { RowSelectionState } from '@tanstack/react-table';
import { FC, useCallback, useContext } from 'react';

export const QuoteProductsTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const localization = useLocalization('QuoteProductsTable');
	const { deleteQuoteItems, dataProducts } = useContext(ContentContext) as ReturnType<
		typeof useQuoteProducts
	>;

	const deleteSelected = useCallback(() => {
		const ids =
			dataProducts?.contents
				.filter(({ sku }) => rowSelection[`${sku}`])
				.map(({ id }) => `${id}`)
				.join(',') ?? EMPTY_STRING;
		deleteQuoteItems(ids);
	}, [rowSelection, deleteQuoteItems, dataProducts]);

	return (
		<Toolbar sx={quoteProductsTableToolbarSX}>
			<Button
				data-testid="quote-products-table-toolbar-delete-selected-button"
				onClick={deleteSelected}
				startIcon={<DeleteOutlined />}
			>
				{localization.DeleteSelected.t()}
			</Button>
		</Toolbar>
	);
};
