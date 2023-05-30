/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useMemo, useEffect } from 'react';
import { useTable, Column, usePagination } from 'react-table';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { OrderHistoryTableHeaderRow } from '@/components/content/OrderHistory/parts/Table/HeaderRow';
import { Stack, Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderHistoryTableRow } from '@/components/content/OrderHistory/parts/Table/Row';
import { ReactTableRow } from '@/data/types/Table';
import { useOrderHistory } from '@/data/Content/OrderHistory';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TablePagination } from '@/components/blocks/TablePagination';

export type OrderHistoryTableRowValueType = Record<
	string,
	ReturnType<typeof useOrderHistory>['orders'][0] | undefined
>;
export type OrderHistoryTableRowType = ReactTableRow & {
	values: OrderHistoryTableRowValueType;
};

type OrderHistoryTableProps = {
	showLimit?: number;
};

export const OrderHistoryTable: FC<OrderHistoryTableProps> = ({ showLimit = -1 }) => {
	const { orders, view } = useContext(ContentContext) as {
		orders: ReturnType<typeof useOrderHistory>['orders'];
		view: string;
	};
	const displayOrders = useMemo(
		() => (showLimit < 1 ? orders : orders.slice(0, showLimit)),
		[orders, showLimit]
	);
	const orderLabels = useLocalization('Order');
	const columns = useMemo(
		() =>
			[
				{ Header: orderLabels.OrderId.t(), id: 'order', accessor: (row) => row },
				{ Header: orderLabels.OrderDate.t(), id: 'orderDate' },
				{ Header: orderLabels.Status.t(), id: 'orderStatus' },
				{ Header: orderLabels.TotalPrice.t(), id: 'orderPrice' },
				{ Header: orderLabels.Actions.t(), id: 'orderActions' },
			] as readonly Column<Record<string, unknown>>[],
		[orderLabels]
	);

	const {
		getTableProps,
		headerGroups,
		page,
		prepareRow,
		setHiddenColumns,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		pageOptions,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: displayOrders as Record<string, unknown>[],
			initialState: { pageIndex: 0, pageSize: PAGINATION.sizes[0] },
		},
		usePagination
	);
	useEffect(() => {
		const hiddenColumns = view !== 'full' ? ['orderActions'] : [];
		setHiddenColumns(hiddenColumns);
	}, [view, setHiddenColumns]);

	return !orders.length ? (
		<Typography p={2} variant="h5">
			{orderLabels.NoRecord.t()}
		</Typography>
	) : (
		<Stack>
			<Table
				{...getTableProps()}
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead>
					{headerGroups.map((headerGroup, i) => (
						<OrderHistoryTableHeaderRow key={i} {...{ headerGroup }} />
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return <OrderHistoryTableRow key={i} row={row as OrderHistoryTableRowType} />;
					})}
				</TableBody>
			</Table>
			{displayOrders.length > PAGINATION.sizes[0] ? (
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
		</Stack>
	);
};
