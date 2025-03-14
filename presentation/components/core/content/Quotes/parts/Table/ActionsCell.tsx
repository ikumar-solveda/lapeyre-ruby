/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { DIALOG_STATES, State } from '@/data/constants/quotes';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { QuoteDialogStateType, QuoteItem } from '@/data/types/Quote';
import { Switch } from '@/utils/switch';
import { DeleteOutlineOutlined, HighlightOff } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';
import { useCallback, useContext, useMemo } from 'react';

export const QuotesTableActionsCell: FC<CellContext<QuoteItem, number>> = ({ getValue, row }) => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const status = useMemo(() => getValue(), [getValue]);
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const { setDialogState, openDialog, setQuoteId } = quotesContent;

	const onOpenDialog = useCallback(
		(dialogState: QuoteDialogStateType) => async () => {
			setDialogState(dialogState);
			setQuoteId(row.original.id);
			openDialog();
		},
		[openDialog, setDialogState, setQuoteId, row.original.id]
	);

	return (
		<TableCellResponsiveContent label={quotesTableNLS.Actions.t()}>
			{Switch(status)
				.case(State.DRAFT, () => (
					<Tooltip title={quotesTableNLS.DeleteQuote.t()}>
						<IconButton
							id="quotes-table-actions-delete-button"
							data-testid="quotes-table-actions-delete-button"
							onClick={onOpenDialog(DIALOG_STATES.DELETE)}
							color="primary"
						>
							<DeleteOutlineOutlined />
						</IconButton>
					</Tooltip>
				))
				.case(State.PENDING, () => (
					<IconButton
						id="quotes-table-actions-cancel-button"
						data-testid="quotes-table-actions-cancel-button"
						onClick={onOpenDialog(DIALOG_STATES.CANCEL)}
					>
						<HighlightOff />
					</IconButton>
				))
				.case(State.READY, () => null)
				.case(State.ACCEPTED, () => null)
				.case(State.DECLINED, () => null)
				.case(State.CANCELED, () => null)
				.case(State.EXPIRED, () => null)
				.defaultTo(() => null)}
		</TableCellResponsiveContent>
	);
};
