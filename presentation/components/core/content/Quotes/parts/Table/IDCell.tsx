/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import type { CellContext } from '@tanstack/react-table';
import { type FC, useMemo } from 'react';

export const QuotesTableIDCell: FC<CellContext<QuoteItem, string>> = ({ getValue }) => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const routes = useLocalization('Routes');
	const id = useMemo(() => getValue(), [getValue]);
	return (
		<TableCellResponsiveContent label={quotesTableNLS.ID.t()}>
			<Linkable href={{ pathname: routes.QuoteDetails.route.t(), query: { quoteId: id } }}>
				{id}
			</Linkable>
		</TableCellResponsiveContent>
	);
};
