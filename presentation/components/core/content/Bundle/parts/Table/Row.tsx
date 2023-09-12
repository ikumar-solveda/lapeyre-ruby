/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FC } from 'react';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { BUNDLE_TABLE_PREFIX } from '@/data/constants/product';
import { Row, flexRender } from '@tanstack/react-table';
import { BundleTableRowData } from '@/data/types/Product';
import { BundleTableDetailPanel } from '@/components/content/Bundle/parts/Table/DetailPanel';

type Props = {
	row: Row<BundleTableRowData>;
};
export const BundleTableRow: FC<Props> = ({ row }) => (
	<>
		<TableRow
			key={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}`}
			id={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}`}
			data-testid={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}`}
			expanded={row.getIsExpanded()}
			responsive
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
					id={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
					data-testid={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
		{row.getIsExpanded() ? (
			<TableRow
				responsive
				id={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}-expanded`}
				expandedContent
			>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<BundleTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
