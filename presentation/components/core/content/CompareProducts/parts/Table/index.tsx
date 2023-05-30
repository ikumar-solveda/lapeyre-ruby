/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { CompareProductsTableHeaderRow } from '@/components/content/CompareProducts/parts/Table/HeaderRow';
import { CompareProductsTableRow } from '@/components/content/CompareProducts/parts/Table/Row';
import { compareProductsTableInnerBorderSX } from '@/components/content/CompareProducts/styles/Table/innerBorder';
import { FC } from 'react';
import { Column, useTable } from 'react-table';

type Props = {
	columns: readonly Column<Record<string, unknown>>[];
	data: readonly Record<string, unknown>[];
};

export const CompareProductsTable: FC<Props> = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});
	return (
		<Table {...getTableProps()} sx={compareProductsTableInnerBorderSX}>
			<TableHead>
				{headerGroups.map((headerGroup, i) => (
					<CompareProductsTableHeaderRow
						key={`CompareProductsTableHeaderRow-${i}`}
						{...{ headerGroup }}
					/>
				))}
			</TableHead>
			<TableBody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return <CompareProductsTableRow key={`CompareProductsTableRow-${i}`} {...{ row }} />;
				})}
			</TableBody>
		</Table>
	);
};
