/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { RecurringOrdersTableHeaderRow } from '@/components/content/RecurringOrders/parts/Table/HeaderRow';
import { RecurringOrdersTableRow } from '@/components/content/RecurringOrders/parts/Table/Row';
import {
	SubscriptionIBMStoreSummaryItem,
	useRecurringOrders,
} from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { Paper, TableContainer, TableRow, Typography } from '@mui/material';
import {
	HeaderGroup,
	VisibilityState,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export type RecurringOrdersContextValues = ReturnType<typeof useRecurringOrders> & {
	view: string;
};

type RecurringOrdersTableProps = {
	showLimit?: number;
};

export const RecurringOrdersTable: FC<RecurringOrdersTableProps> = ({ showLimit = -1 }) => {
	const ctxValues = useContext(ContentContext) as RecurringOrdersContextValues;
	const { subscriptions, view } = ctxValues;
	const { settings } = useSettings();
	const displayOrders = useMemo(
		() => (showLimit < 1 ? subscriptions : subscriptions.slice(0, showLimit)),
		[subscriptions, showLimit]
	);
	const orderLabels = useLocalization('Order');
	const columns = useMemo(
		() => [
			{
				header: orderLabels.OrderId.t(),
				id: 'order',
				accessorFn: (row: SubscriptionIBMStoreSummaryItem) => row,
			},
			{ header: orderLabels.Schedule.t(), id: 'orderSchedule' },
			{ header: orderLabels.NextOrder.t(), id: 'nextOrder' },
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
	};

	const { rows } = getRowModel();
	const headers: HeaderGroup<SubscriptionIBMStoreSummaryItem> | undefined =
		getHeaderGroups().at(-1);
	return (
		<TableContainer component={Paper} variant="outlined">
			<Table
				id="recurring-order-table"
				data-testid="recurring-order-table"
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead
					id="recurring-order-table-head"
					data-testid="recurring-order-table-head"
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<RecurringOrdersTableHeaderRow key={headerGroup.id} {...{ headerGroup }} />
					))}
				</TableHead>
				<TableBody>
					{rows.length > 0 ? (
						rows.map((row) => <RecurringOrdersTableRow key={row.id} row={row} {...ctxValues} />)
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{orderLabels.NoRecord.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{displayOrders.length > PAGINATION.sizes[0] ? (
				<TablePagination {...paginationComponentProps} />
			) : null}
		</TableContainer>
	);
};
