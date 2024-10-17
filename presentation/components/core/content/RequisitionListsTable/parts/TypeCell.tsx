/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';

export const RequisitionListsTableTypeCell = (
	info: CellContext<RequisitionListsItem, string | undefined>
) => {
	const { getValue, column } = info;
	const localization = useLocalization('RequisitionLists');
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography>{localization.Type[getValue() as keyof typeof localization.Type].t()}</Typography>
		</TableCellResponsiveContent>
	);
};
