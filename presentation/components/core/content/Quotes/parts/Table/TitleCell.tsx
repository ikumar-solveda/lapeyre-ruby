/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import type { CellContext } from '@tanstack/react-table';
import { type FC, useMemo } from 'react';

export const QuotesTableTitleCell: FC<CellContext<QuoteItem, string>> = ({ getValue }) => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const title = useMemo(() => getValue(), [getValue]);
	return (
		<TableCellResponsiveContent label={quotesTableNLS.Title.t()}>
			{title}
		</TableCellResponsiveContent>
	);
};
