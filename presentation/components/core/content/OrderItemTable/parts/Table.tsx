/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useMemo } from 'react';

import { Table as TableComponent } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { OrderItemTableHeaderRow } from '@/components/content/OrderItemTable/parts/HeaderRow';
import { OrderItemTableRow } from '@/components/content/OrderItemTable/parts/Row';
import { useOrderItemTable } from '@/data/Content/OrderItemTable';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import {
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

type ArrayType<T> = T extends (infer Item)[] ? Item : T;
type OrderItemTableData = ReturnType<typeof useOrderItemTable>['data'];
export type OrderItemTableRowData = ArrayType<OrderItemTableData>;

type Props = {
	columns: {
		header: string;
		accessorKey: string;
		id?: string;
	}[];
	data: OrderItemTableData;
};

const hiddenColumns: Record<string, boolean> = { availability: true, quantity: true, price: true };

export const OrderItemTable: FC<Props> = ({ columns, data }) => {
	const { view, pageCount, pagination, setPagination, totalRecords } = useContext(
		ContentContext
	) as ReturnType<typeof useOrderItemTable> & {
		view: string;
	};
	const columnVisibility = useMemo<VisibilityState>(
		() =>
			columns.reduce((acc, { accessorKey, id }) => {
				const key = id || accessorKey;
				return view !== 'full' && hiddenColumns[key] ? { ...acc, [key]: false } : acc;
			}, {}),
		[columns, view]
	);
	const {
		getHeaderGroups,
		getState,
		setPageSize,
		setPageIndex: gotoPage,
		getCanPreviousPage,
		getCanNextPage,
		nextPage,
		previousPage,
		getPageCount,
		getRowModel,
	} = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		state: { pagination, columnVisibility },
		pageCount,
		initialState: {
			pagination,
			columnVisibility,
		},
		onPaginationChange: setPagination,
		// autoResetPageIndex: false,     /** Default value of autoResetPageIndex is false if manualPagination is set to true. Hence commented this line */
	});

	const paginationComponentProps = {
		canPreviousPage: getCanPreviousPage(),
		canNextPage: getCanNextPage(),
		pageCount: getPageCount(),
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		pageIndex: getState().pagination.pageIndex,
		pageSize: getState().pagination.pageSize,
	};
	return (
		<>
			<TableComponent
				id="order-item-table"
				data-testid="order-item-table"
				{...(view !== 'full' ? { role: 'presentation' } : {})}
			>
				{view === 'full' ? (
					<TableHead>
						{getHeaderGroups().map((headerGroup, i) => (
							<OrderItemTableHeaderRow
								key={`OrderItemTableHeaderRow-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody>
					{getRowModel().rows.map((row) => (
						<OrderItemTableRow key={`order-item-table-row-${row.id}`} row={row} />
					))}
				</TableBody>
			</TableComponent>
			{view !== 'mini' && totalRecords > PAGINATION.sizes[0] ? (
				<TablePagination {...paginationComponentProps} />
			) : null}
		</>
	);
};
