/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { quotesTableStatusDotSX } from '@/components/content/Quotes/styles/Table/statusDot';
import { StateLabels } from '@/data/constants/quotes';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import { Circle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC, useMemo } from 'react';

export const QuotesTableStatusCell: FC<CellContext<QuoteItem, number>> = ({ getValue }) => {
	const nls = useLocalization('QuoteStates');
	const tableNls = useLocalization('QuotesTable');
	const status = useMemo(() => getValue(), [getValue]);
	return (
		<TableCellResponsiveContent label={tableNls.Status.t()}>
			{status in StateLabels ? <Circle sx={quotesTableStatusDotSX(status)} /> : null}
			<Typography component="span">
				{nls[StateLabels[`${status}`] as keyof typeof nls]?.t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
