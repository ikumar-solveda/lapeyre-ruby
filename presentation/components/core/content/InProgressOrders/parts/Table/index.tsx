/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { tableContainerResponsiveSX } from '@/components/blocks/Table/styles/tableContainerResponsive';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { InProgressOrdersTableActionsCell } from '@/components/content/InProgressOrders/parts/Table/ActionsCell';
import { InProgressOrdersTableCheckboxCell } from '@/components/content/InProgressOrders/parts/Table/CheckboxCell';
import { InProgressOrdersTableHeaderCheckbox } from '@/components/content/InProgressOrders/parts/Table/HeaderCheckbox';
import { InProgressOrdersTableHeaderRow } from '@/components/content/InProgressOrders/parts/Table/HeaderRow';
import { InProgressOrdersTableLastUpdatedCell } from '@/components/content/InProgressOrders/parts/Table/LastUpdatedCell';
import { InProgressOrdersTableOrderIdCell } from '@/components/content/InProgressOrders/parts/Table/OrderIdCell';
import { InProgressOrdersTableOrderTypeCell } from '@/components/content/InProgressOrders/parts/Table/OrderTypeCell';
import { InProgressOrdersTableRow } from '@/components/content/InProgressOrders/parts/Table/Row';
import { InProgressOrdersTableToolbar } from '@/components/content/InProgressOrders/parts/Table/Toolbar';
import { InProgressOrdersTableTotalPriceCell } from '@/components/content/InProgressOrders/parts/Table/TotalPriceCell';
import { inProgressOrdersTableEmptyContentSX } from '@/components/content/InProgressOrders/styles/Table/emptyContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE } from '@/data/constants/inProgressOrders';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import type {
	InProgressOrdersContextValues,
	InProgressOrderSummaryItem,
} from '@/data/types/InProgressOrders';
import {
	CircularProgress,
	Paper,
	TableCell,
	TableContainer,
	TableRow,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	HeaderGroup,
	type RowSelectionState,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

const EMPTY_DATA = [] as InProgressOrderSummaryItem[];
const INIT_ROW_SELECTION = {};

export const InProgressOrdersTable: FC = () => {
	const ctxValues = useContext(ContentContext) as InProgressOrdersContextValues;
	const { view, data, orders, isLoading, pagination, setPagination, pageCount, user } = ctxValues;
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const { settings } = useSettings();
	const inProgressOrdersTableNLS = useLocalization('InProgressOrdersNew');
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<InProgressOrderSummaryItem>();
		return [
			columnHelper.display({
				id: 'select',
				header: InProgressOrdersTableHeaderCheckbox,
				cell: InProgressOrdersTableCheckboxCell,
				enableSorting: false,
			}),
			columnHelper.accessor((row) => row.orderId, {
				id: 'orderId',
				header: inProgressOrdersTableNLS.Labels.OrderId.t(),
				cell: InProgressOrdersTableOrderIdCell,
			}),
			columnHelper.accessor((row) => row.lastUpdateDate, {
				id: 'lastUpdated',
				header: inProgressOrdersTableNLS.Labels.LastUpdated.t(),
				cell: InProgressOrdersTableLastUpdatedCell,
			}),
			columnHelper.accessor((row) => row.totalProductPrice, {
				id: 'totalPrice',
				header: inProgressOrdersTableNLS.Labels.TotalPrice.t(),
				cell: InProgressOrdersTableTotalPriceCell,
			}),
			columnHelper.accessor((row) => row.orderTypeCode, {
				id: 'orderType',
				header: inProgressOrdersTableNLS.Labels.OrderType.t(),
				cell: InProgressOrdersTableOrderTypeCell,
			}),
			columnHelper.display({
				id: 'actions',
				header: inProgressOrdersTableNLS.Labels.Actions.t(),
				cell: InProgressOrdersTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [inProgressOrdersTableNLS]);

	const columnVisibility = useMemo<VisibilityState>(
		() => ({
			orderType: isB2BStore(settings),
			...(!isDesktop && { select: false, actions: false, orderType: isB2BStore(settings) }),
		}),
		[isDesktop, settings]
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
	} = useReactTable<InProgressOrderSummaryItem>({
		columns,
		data: orders ?? EMPTY_DATA,
		getRowId: (row) => row.orderId ?? EMPTY_STRING,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableRowSelection: (row) => row.original.buyerId === user?.userId,
		manualPagination: true,
		onRowSelectionChange: setRowSelection,
		pageCount,
		state: {
			pagination,
			rowSelection,
			columnVisibility,
		},
		onPaginationChange: setPagination,
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
		totalCount: data.length,
	};
	const { rows } = getRowModel();
	const headers: HeaderGroup<InProgressOrderSummaryItem> | undefined = getHeaderGroups().at(-1);

	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [orders]);

	return (
		<TableContainer component={Paper} variant="outlined" sx={tableContainerResponsiveSX}>
			{!isEmpty(rowSelection) ? <InProgressOrdersTableToolbar rowSelection={rowSelection} /> : null}
			<Table
				id={AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}
				data-testid={AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head`}
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<InProgressOrdersTableHeaderRow
							key={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-body`}
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<InProgressOrdersTableRow
								key={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-row-${row.id}`}
								row={row}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length} align="center">
								{isLoading ? (
									<CircularProgress size={25} />
								) : (
									<EmptyContent
										altId={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-empty-content`}
										title={inProgressOrdersTableNLS.NoInProgressOrders.t()}
										description={inProgressOrdersTableNLS.CreateNewOrderText.t()}
										sx={inProgressOrdersTableEmptyContentSX}
									/>
								)}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
