/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';

export const RequisitionListsTableLastUpdateCell = (
	info: CellContext<RequisitionListsItem, string | undefined>
) => {
	const { getValue, column } = info;

	const dateFormatter = useDateTimeFormat();
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{column.columnDef.header as string}</Typography>}
		>
			<Typography>{dateFormatter.format(new Date(getValue() as string))}</Typography>
		</TableCellResponsiveContent>
	);
};
