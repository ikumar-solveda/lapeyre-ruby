/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { DATE_TIME_FORMAT_OPTION } from '@/data/constants/dateTime';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import type { CellContext } from '@tanstack/react-table';
import { useMemo, type FC } from 'react';

export const QuotesTableDateCell: FC<CellContext<QuoteItem, string>> = ({ getValue }) => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const formatter = useDateTimeFormat(DATE_TIME_FORMAT_OPTION);
	const dateValue = useMemo(() => formatter.format(new Date(getValue())), [formatter, getValue]);

	return (
		<TableCellResponsiveContent label={quotesTableNLS.Date.t()}>
			{dateValue}
		</TableCellResponsiveContent>
	);
};
