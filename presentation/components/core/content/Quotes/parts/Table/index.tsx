/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { QuotesTableActionsCell } from '@/components/content/Quotes/parts/Table/ActionsCell';
import { QuotesTableContractCell } from '@/components/content/Quotes/parts/Table/ContractCell';
import { QuotesTableDateCell } from '@/components/content/Quotes/parts/Table/DateCell';
import { QuotesTableHeaderRow } from '@/components/content/Quotes/parts/Table/HeaderRow';
import { QuotesTableIDCell } from '@/components/content/Quotes/parts/Table/IDCell';
import { QuotesTableRow } from '@/components/content/Quotes/parts/Table/Row';
import { QuotesTableStatusCell } from '@/components/content/Quotes/parts/Table/StatusCell';
import { QuotesTableTitleCell } from '@/components/content/Quotes/parts/Table/TitleCell';
import { AVAILABLE_QUOTES_LIST_TABLE } from '@/data/constants/quotes';
import { PAGINATION } from '@/data/constants/tablePagination';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import {
	CircularProgress,
	Paper,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material';
import {
	type HeaderGroup,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { type FC, useContext, useMemo } from 'react';

const EMPTY_DATA = [] as QuoteItem[];

export const QuotesTable: FC = () => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const { quotes, pagination, setPagination, quotesPageCount, isLoading, sorting, setSorting } =
		quotesContent;
	const initialPagination = useMemo(() => {
		const p = { pageIndex: 0, pageSize: PAGINATION.sizes[0] };
		return p;
	}, []);
	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<QuoteItem>();
		return [
			columnHelper.accessor((row) => row.id, {
				header: quotesTableNLS.ID.t(),
				id: 'quoteID',
				cell: QuotesTableIDCell,
			}),
			columnHelper.accessor((row) => row.name, {
				header: quotesTableNLS.Title.t(),
				id: 'quoteTitle',
				cell: QuotesTableTitleCell,
			}),
			columnHelper.accessor((row) => row.updatedAt, {
				header: quotesTableNLS.Date.t(),
				id: 'quoteDate',
				cell: QuotesTableDateCell,
			}),
			columnHelper.accessor((row) => row.contract, {
				header: quotesTableNLS.Contract.t(),
				id: 'quoteContract',
				cell: QuotesTableContractCell,
			}),
			columnHelper.accessor((row) => row.status, {
				header: quotesTableNLS.Status.t(),
				id: 'quoteStatus',
				cell: QuotesTableStatusCell,
			}),
			columnHelper.accessor((row) => row.status, {
				id: 'quoteActions',
				header: quotesTableNLS.Actions.t(),
				cell: QuotesTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [quotesTableNLS]);

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
	} = useReactTable<QuoteItem>({
		columns,
		data: quotes?.contents ?? EMPTY_DATA,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		initialState: {
			pagination: initialPagination,
		},
		manualPagination: true,
		manualSorting: true,
		pageCount: quotesPageCount,
		state: {
			pagination,
			sorting,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
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
		totalCount: quotes?.count ?? 0,
	};
	const { rows } = getRowModel();
	const headers: HeaderGroup<QuoteItem> | undefined = getHeaderGroups().at(-1);

	return (
		<TableContainer component={Paper} variant="outlined">
			<Table id={`${AVAILABLE_QUOTES_LIST_TABLE}`} data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}`}>
				<TableHead
					id={`${AVAILABLE_QUOTES_LIST_TABLE}-head`}
					data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<QuotesTableHeaderRow
							key={`${AVAILABLE_QUOTES_LIST_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${AVAILABLE_QUOTES_LIST_TABLE}-body`}
					data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<QuotesTableRow key={`${AVAILABLE_QUOTES_LIST_TABLE}-row-${row.id}`} row={row} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">
									{isLoading ? <CircularProgress size={25} /> : quotesTableNLS.NoQuotes.t()}
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
