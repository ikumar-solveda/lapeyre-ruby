/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useEffect } from 'react';
import { useTable, Column, useSortBy, usePagination } from 'react-table';

import { ReactTableRow } from '@/data/types/Table';
import { Table as TableComponent } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { useOrderItemTable } from '@/data/Content/OrderItemTable';
import { OrderItemTableHeaderRow } from '@/components/content/OrderItemTable/parts/HeaderRow';
import { OrderItemTableRow } from '@/components/content/OrderItemTable/parts/Row';
import { ContentContext } from '@/data/context/content';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TablePagination } from '@/components/blocks/TablePagination';
import { intersection } from 'lodash';

type ArrayType<T> = T extends (infer Item)[] ? Item : T;
type OrderItemTableData = ReturnType<typeof useOrderItemTable>['data'];
export type OrderItemTableRowData = ArrayType<OrderItemTableData>;

export type OrderItemTableRowProp = ReactTableRow & {
	values: OrderItemTableRowData;
};

type Props = {
	columns: readonly Column<Record<string, unknown>>[];
	data: OrderItemTableData;
};

const getHiddenColumns = (view: string) =>
	view === 'full' ? [] : ['availability', 'quantity', 'price'];

export const OrderItemTable: FC<Props> = ({ columns, data }) => {
	const { view } = useContext(ContentContext) as { view: string };
	const {
		getTableProps,
		headerGroups,
		pageOptions,
		prepareRow,
		setHiddenColumns,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				hiddenColumns: intersection(
					getHiddenColumns(view),
					columns.map(({ id, accessor }) => id ?? (accessor as string))
				),
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
		},
		useSortBy,
		usePagination
	);

	useEffect(() => {
		setHiddenColumns(
			intersection(
				getHiddenColumns(view),
				columns.map(({ id, accessor }) => id ?? (accessor as string))
			)
		);
	}, [view, setHiddenColumns, columns]);

	return (
		<>
			<TableComponent
				{...{ ...getTableProps(), ...(view !== 'full' ? { role: 'presentation' } : {}) }}
			>
				{view === 'full' ? (
					<TableHead>
						{headerGroups.map((headerGroup, i) => (
							<OrderItemTableHeaderRow
								key={`OrderItemTableHeaderRow-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<OrderItemTableRow
								key={`OrderItemTableRow-${i}`}
								row={row as OrderItemTableRowProp}
							/>
						);
					})}
				</TableBody>
			</TableComponent>
			{view !== 'mini' && data.length > PAGINATION.sizes[0] ? (
				<TablePagination
					{...{
						pageSize,
						setPageSize,
						gotoPage,
						canPreviousPage,
						canNextPage,
						nextPage,
						pageIndex,
						previousPage,
						pageOptions,
						pageCount,
					}}
				/>
			) : null}
		</>
	);
};
