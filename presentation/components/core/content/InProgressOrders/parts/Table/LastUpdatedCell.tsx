/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { inProgressOrdersTableTypographySX } from '@/components/content/InProgressOrders/styles/Table/typography';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { Typography } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { type FC, useMemo } from 'react';

export const InProgressOrdersTableLastUpdatedCell: FC<
	CellContext<InProgressOrderSummaryItem, string>
> = ({ getValue }) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');
	const formatter = useDateTimeFormat();
	const lastUpdateDate = useMemo(
		() => formatter.format(new Date(getValue() as string)),
		[formatter, getValue]
	);

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Labels.LastUpdated.t()}>
			<Typography sx={inProgressOrdersTableTypographySX}>{lastUpdateDate}</Typography>
		</TableCellResponsiveContent>
	);
};
