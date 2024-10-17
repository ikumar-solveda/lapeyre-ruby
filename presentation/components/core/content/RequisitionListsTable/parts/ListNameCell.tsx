/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListsTableListNameTypographySX } from '@/components/content/RequisitionListsTable/styles/listNameTypography';
import { useLocalization } from '@/data/Localization';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';

export const RequisitionListsTableListNameCell = (
	info: CellContext<RequisitionListsItem, string | undefined>
) => {
	const { getValue, column, row } = info;
	const { RequisitionListDetails } = useLocalization('Routes');
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Linkable
				href={{ pathname: RequisitionListDetails.route.t(), query: { id: row.id } }}
				id={`requisition-list-details-${row.id}`}
				data-testid={`requisition-list-details-${row.id}`}
			>
				<Typography sx={requisitionListsTableListNameTypographySX}>{getValue()}</Typography>
			</Linkable>
		</TableCellResponsiveContent>
	);
};
