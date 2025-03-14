/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { RequisitionListDetailsTableDetailPanel } from '@/components/content/RequisitionListDetails/parts/Table/DetailPanel';
import { requisitionListDetailsTableCellSX } from '@/components/content/RequisitionListDetails/styles/Table/cell';
import { requisitionListDetailsTableRowSX } from '@/components/content/RequisitionListDetails/styles/Table/row';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useRequisitionListItemTableRow } from '@/data/Content/RequisitionListItemTableRow';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { Row, flexRender } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const RequisitionListDetailsTableRow: FC<{
	row: Row<OrderItem>;
}> = ({ row }) => {
	const {
		updateRequisitionListItem,
		addItemToCart,
		deleteRequisitionListItems,
		addToQuoteValue,
		readOnly,
	} = useContext(ContentContext) as ReturnType<typeof useRequisitionListDetails>;
	const { partNumber, orderItemId } = row.original;
	const itemRowValues = useRequisitionListItemTableRow({ partNumber, orderItemId });
	return (
		<ContentProvider
			value={{
				...itemRowValues,
				updateRequisitionListItem,
				deleteRequisitionListItems,
				addItemToCart,
				addToQuoteValue,
				readOnly,
			}}
		>
			<TableRow
				id={`${REQUISITION_LIST_DETAILS_TABLE}-row-${row.id}`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-row-${row.id}`}
				sx={requisitionListDetailsTableRowSX}
				responsive
				selected={row.getIsSelected()}
				expanded={row.getIsExpanded()}
			>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={`${REQUISITION_LIST_DETAILS_TABLE}-cell-${cell.id}`}
						id={`${REQUISITION_LIST_DETAILS_TABLE}-cell-${cell.id}`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-cell-${cell.id}`}
						sx={requisitionListDetailsTableCellSX}
						responsive
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
			</TableRow>
			{row.getIsExpanded() ? (
				<TableRow
					responsive
					id={`${REQUISITION_LIST_DETAILS_TABLE}-table-row-${row.id}-expanded`}
					expandedContent
				>
					<TableCell colSpan={row.getVisibleCells().length} responsive>
						<RequisitionListDetailsTableDetailPanel />
					</TableCell>
				</TableRow>
			) : null}
		</ContentProvider>
	);
};
