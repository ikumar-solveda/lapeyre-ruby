/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { RequisitionListsUploadLogsTableDetailPanel } from '@/components/content/RequisitionListsUploadLogs/parts/Table/DetailPanel';
import { UPLOAD_LOGS_VIEW_TABLE } from '@/data/constants/requisitionLists';
import { UploadLogsData } from '@/data/types/RequisitionLists';
import { Row, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListUploadLogsTableRow: FC<{ row: Row<UploadLogsData> }> = ({ row }) => (
	<>
		<TableRow
			id={`${UPLOAD_LOGS_VIEW_TABLE}-row-${row.id}`}
			data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-row-${row.id}`}
			responsive
			expanded={row.getIsExpanded()}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${UPLOAD_LOGS_VIEW_TABLE}-cell-${cell.id}`}
					id={`${UPLOAD_LOGS_VIEW_TABLE}-cell-${cell.id}`}
					data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-cell-${cell.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
		{row.getIsExpanded() ? (
			<TableRow
				responsive
				id={`${UPLOAD_LOGS_VIEW_TABLE}-table-row-${row.id}-expanded`}
				expandedContent
			>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<RequisitionListsUploadLogsTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
