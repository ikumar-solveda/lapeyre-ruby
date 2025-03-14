/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteAttachmentsTableToolbarSX } from '@/components/blocks/QuoteAttachmentsTable/styles/toolbar';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { Delete } from '@mui/icons-material';
import { Toolbar } from '@mui/material';
import type { RowSelectionState } from '@tanstack/react-table';
import { type FC, useCallback, useContext } from 'react';
import { OneClick } from '@/components/blocks/OneClick';

export const QuoteAttachmentsTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const localization = useLocalization('QuoteAttachmentsTable');
	const { deleteMultipleAttachments } = useContext(ContentContext) as ReturnType<
		typeof useQuoteCreateEdit
	>;

	const deleteSelected = useCallback(async () => {
		const ids = Object.keys(rowSelection).map((id) => dFix(id, 0));
		await deleteMultipleAttachments(ids);
	}, [rowSelection, deleteMultipleAttachments]);

	return (
		<Toolbar sx={quoteAttachmentsTableToolbarSX}>
			<OneClick
				id="quote-attachments-table-toolbar-delete-selected-button"
				data-testid="quote-attachments-table-toolbar-delete-selected-button"
				onClick={deleteSelected}
				startIcon={<Delete />}
			>
				{localization.DeleteSelected.t()}
			</OneClick>
		</Toolbar>
	);
};
