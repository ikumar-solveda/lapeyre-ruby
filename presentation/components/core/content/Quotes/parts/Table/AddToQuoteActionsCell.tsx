/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { State } from '@/data/constants/quotes';
import { useAddToQuote } from '@/data/Content/AddToQuote';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import { Switch } from '@/utils/switch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Icon, IconButton, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';
import { useCallback, useContext, useMemo } from 'react';

export const QuotesTableAddToQuoteActionsCell: FC<CellContext<QuoteItem, number>> = ({
	row,
	getValue,
}) => {
	const nls = useLocalization('QuotesTable');
	const status = useMemo(() => getValue(), [getValue]);
	const quoteId = row.original.id as string;
	const { useAddToQuoteValue } = useContext(ContentContext) as {
		useAddToQuoteValue: ReturnType<typeof useAddToQuote>;
	};
	const rowSelected = row.getIsSelected();
	const { onEditQuoteList } = useAddToQuoteValue;
	const onQuote = useCallback(async () => {
		const newSelection = !row.getIsSelected();
		row.toggleSelected(newSelection);
		onEditQuoteList(quoteId, newSelection);
	}, [onEditQuoteList, quoteId, row]);
	const ActionIcon = rowSelected ? CheckCircleIcon : AddCircleOutlineIcon;

	return (
		<TableCellResponsiveContent label={nls.Add.t()}>
			{Switch(status)
				.case(State.DRAFT, () => (
					<Tooltip title={nls[rowSelected ? 'RemoveFromQuote' : 'AddToQuote'].t()}>
						<IconButton
							id="quotes-table-add-to-quote-actions-cell-button"
							data-testid="quotes-table-add-to-quote-actions-cell-button"
							onClick={onQuote}
						>
							<ActionIcon color="primary" />
						</IconButton>
					</Tooltip>
				))
				.defaultTo(() => (
					<IconButton
						id="quotes-table-add-to-quote-actions-disabled-button"
						data-testid="quotes-table-add-to-quote-actions-disabled-button"
						disabled={true}
					>
						<Icon />
					</IconButton>
				))}
		</TableCellResponsiveContent>
	);
};
