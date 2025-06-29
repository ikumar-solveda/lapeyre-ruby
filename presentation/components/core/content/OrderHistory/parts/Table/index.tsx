/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { OrderHistoryTableHeaderRow } from '@/components/content/OrderHistory/parts/Table/HeaderRow';
import { OrderHistoryTableRow } from '@/components/content/OrderHistory/parts/Table/Row';
import { orderHistoryTableContainerSX } from '@/components/content/OrderHistory/styles/tableContainer';
import { OrderOrderSummaryItem, useOrderHistory } from '@/data/Content/OrderHistory';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { Paper, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import {
	HeaderGroup,
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export type OrderHistoryContextValues = ReturnType<typeof useOrderHistory> & {
	view: string;
};

type OrderHistoryTableProps = {
	showLimit?: number;
};

export const OrderHistoryTable: FC<OrderHistoryTableProps> = ({ showLimit = -1 }) => {
	const ctxValues = useContext(ContentContext) as OrderHistoryContextValues;
	const { orders, view } = ctxValues;
	const { settings } = useSettings();
	const displayOrders = useMemo(
		() => (showLimit < 1 ? orders : orders.slice(0, showLimit)),
		[orders, showLimit]
	);
	const orderLabels = useLocalization('Order');
	const columns = useMemo(
		() => [
			{
				header: orderLabels.OrderId.t(),
				id: 'order',
				accessorFn: (row: OrderOrderSummaryItem) => row,
			},
			{ header: orderLabels.purchaseOrder.t(), id: 'purchaseOrder' },
			{ header: orderLabels.OrderDate.t(), id: 'orderDate' },
			{ header: orderLabels.Status.t(), id: 'orderStatus' },
			{ header: orderLabels.TotalPrice.t(), id: 'orderPrice' },
			{ header: orderLabels.Actions.t(), id: 'orderActions' },
		],
		[orderLabels]
	);
	const columnVisibility = useMemo<VisibilityState>(
		() => (!isB2BStore(settings) ? { purchaseOrder: false } : {}) as VisibilityState,
		[settings]
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
		data: displayOrders,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
			columnVisibility,
		},
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
		totalCount: orders.length,
	};
	const { rows } = getRowModel();
	const headers: HeaderGroup<OrderOrderSummaryItem> | undefined = getHeaderGroups().at(-1);
	return (
		<TableContainer component={Paper} variant="outlined" sx={orderHistoryTableContainerSX}>
			<Table
				id="order-history-table"
				data-testid="order-history-table"
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead id="order-history-table-head" data-testid="order-history-table-head" responsive>
					{getHeaderGroups().map((headerGroup) => (
						<OrderHistoryTableHeaderRow key={headerGroup.id} {...{ headerGroup }} />
					))}
				</TableHead>
				<TableBody>
					{rows.length > 0 ? (
						rows.map((row) => <OrderHistoryTableRow key={row.id} row={row} {...ctxValues} />)
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{orderLabels.NoRecord.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
