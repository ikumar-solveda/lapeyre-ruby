/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table as TableComponent } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { SaveForLaterTableHeaderRow } from '@/components/content/SaveForLater/parts/Table/HeaderRow';
import { SaveForLaterTableRow } from '@/components/content/SaveForLater/parts/Table/Row';
import { useSaveForLaterTable } from '@/data/Content/SaveForLaterTable';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import {
	Row,
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useEffect, useMemo } from 'react';

type ArrayType<T> = T extends (infer Item)[] ? Item : T;
type SaveForLaterTableData = ReturnType<typeof useSaveForLaterTable>['data'];
export type SaveForLaterTableRowData = ArrayType<SaveForLaterTableData>;

type Props = {
	columns: {
		header: string;
		accessorKey: string;
		id?: string;
	}[];
	data: SaveForLaterTableData;
};

const hiddenColumns: Record<string, boolean> = { price: true, moveToCart: true };

export const SaveForLaterTable: FC<Props> = ({ columns, data }) => {
	const { view } = useContext(ContentContext) as ReturnType<typeof useSaveForLaterTable> & {
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
		getRowId: (originalRow: (typeof data)[0], _index: number, _parent?: Row<(typeof data)[0]>) =>
			originalRow.itemDetails.partNumber ?? '',
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
			columnVisibility,
		},
		autoResetPageIndex: false,
	});

	useEffect(() => {
		if (data.length === 0) {
			gotoPage(getState().pagination.pageIndex - 1);
		}
	}, [data, gotoPage, getState]);

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
		hideRowChoice: true,
		totalCount: data.length,
	};

	const role = useMemo(() => (view !== 'full' ? { role: 'presentation' } : {}), [view]);

	return (
		<>
			<TableComponent id="save-for-later-table" data-testid="save-for-later-table" {...role}>
				{view === 'full' ? (
					<TableHead>
						{getHeaderGroups().map((headerGroup, i) => (
							<SaveForLaterTableHeaderRow
								key={`SaveForLaterTableHeaderRow-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody>
					{getRowModel().rows.map((row) => (
						<SaveForLaterTableRow key={`save-for-later-table-row-${row.id}`} row={row} />
					))}
				</TableBody>
			</TableComponent>
			<TablePagination {...paginationComponentProps} />
		</>
	);
};
