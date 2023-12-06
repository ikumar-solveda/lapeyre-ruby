/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { RecurringOrderHistoryTableHeaderRow } from '@/components/content/RecurringOrderHistory/parts/Table/HeaderRow';
import { RecurringOrderHistoryTableRow } from '@/components/content/RecurringOrderHistory/parts/Table/Row';
import { useRecurringOrderHistory } from '@/data/Content/RecurringOrderHistory';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { Paper, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import {
	HeaderGroup,
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const ID_KEY = 'recurring-order-history-table';
export type RecurringOrdersHistoryRowContextValue = {
	order: Order;
};

export const RecurringOrderHistoryTable: FC = () => {
	const { order } = useContext(ContentContext) as { order?: Order };
	const { orders, pagination, setPagination, pageCount } = useRecurringOrderHistory(
		order?.orderId as string
	);
	const { settings } = useSettings();
	const orderLabels = useLocalization('Order');
	const columns = useMemo(
		() => [
			{
				header: orderLabels.OrderId.t(),
				id: 'order',
				accessorFn: (row: Order) => row,
			},
			{ header: orderLabels.PlacedDate.t(), id: 'placedDate' },
			{ header: orderLabels.OrderStatus.t(), id: 'orderStatus' },
			{ header: orderLabels.TotalProductPrice.t(), id: 'totalProductPrice' },
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
		data: orders,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		manualSorting: false,
		pageCount,
		state: {
			pagination,
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
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
	};
	const { rows } = getRowModel();
	const headers: HeaderGroup<Order> | undefined = getHeaderGroups().at(-1);

	return (
		<TableContainer component={Paper} variant="outlined">
			<Table id={ID_KEY} data-testid={ID_KEY}>
				<TableHead id={`${ID_KEY}-head`} data-testid={`${ID_KEY}-head`} responsive>
					{getHeaderGroups().map((headerGroup) => (
						<RecurringOrderHistoryTableHeaderRow key={headerGroup.id} {...{ headerGroup }} />
					))}
				</TableHead>
				<TableBody>
					{rows.length > 0 ? (
						rows.map((row) => <RecurringOrderHistoryTableRow key={row.id} row={row} />)
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{orderLabels.NoRecord.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{orders.length > PAGINATION.sizes[0] ? (
				<TablePagination {...paginationComponentProps} />
			) : null}
		</TableContainer>
	);
};
