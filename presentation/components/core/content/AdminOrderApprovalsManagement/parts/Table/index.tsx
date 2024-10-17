/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TablePagination } from '@/components/blocks/TablePagination';
import { adminApprovalsManagementTableContainerSX } from '@/components/content/AdminApprovalsManagement/styles/tableContainer';
import { AdminOrderApprovalsManagementTableActionsCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/ActionsCell';
import { AdminOrderApprovalsManagementTableApprovedOrRejectedCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/ApprovedOrRejectedCell';
import { AdminOrderApprovalsManagementTableBuyerCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/BuyerCell';
import { AdminOrderApprovalsManagementTableHeaderRow } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/HeaderRow';
import { AdminOrderApprovalsManagementTableOrderIdCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/OrderIdCell';
import { AdminOrderApprovalsManagementTableRow } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/Row';
import { AdminOrderApprovalsManagementTableStatusCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/StatusCell';
import { AdminOrderApprovalsManagementTableSubmittedCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/SubmittedCell';
import { AdminOrderApprovalsManagementTableTotalPriceCell } from '@/components/content/AdminOrderApprovalsManagement/parts/Table/TotalPriceCell';
import { useAdmin_OrderApprovalsManagementTable } from '@/data/Content/Admin_OrderApprovalsManagementTable';
import { useLocalization } from '@/data/Localization';
import {
	APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS,
	ORDER_APPROVALS_MANAGEMENT_TABLE,
} from '@/data/constants/admin_approvalsManagement';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Paper, TableContainer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	HeaderGroup,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

const EMPTY_DATA = [] as AdminApprovalsManagementTableData[];

export const AdminOrderApprovalsManagementTable: FC = () => {
	const { data, pagination, setPagination, totalRecords, pageCount, sorting, setSorting } =
		useContext(ContentContext) as ReturnType<typeof useAdmin_OrderApprovalsManagementTable>;
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const columns = useMemo(
		() => [
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.orderId,
				cell: AdminOrderApprovalsManagementTableOrderIdCell,
				header: approvalsManagementNLS.Columns.OrderId.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.buyer,
				cell: AdminOrderApprovalsManagementTableBuyerCell,
				header: approvalsManagementNLS.Columns.Buyer.t(),
				enableSorting: false,
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.totalPrice,
				cell: AdminOrderApprovalsManagementTableTotalPriceCell,
				header: approvalsManagementNLS.Columns.TotalPrice.t(),
				enableSorting: false,
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.status,
				cell: AdminOrderApprovalsManagementTableStatusCell,
				header: approvalsManagementNLS.Columns.Status.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.submitted,
				cell: AdminOrderApprovalsManagementTableSubmittedCell,
				header: approvalsManagementNLS.Columns.Submitted.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.approvedOrRejected,
				cell: AdminOrderApprovalsManagementTableApprovedOrRejectedCell,
				header: approvalsManagementNLS.Columns.ApprovedOrRejected.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.actions,
				cell: AdminOrderApprovalsManagementTableActionsCell,
				header: approvalsManagementNLS.Columns.Actions.t(),
				enableSorting: false,
			},
		],
		[approvalsManagementNLS]
	);

	const {
		getState,
		setPageSize,
		setPageIndex: gotoPage,
		getCanPreviousPage,
		getCanNextPage,
		nextPage,
		previousPage,
		getPageCount,
		getHeaderGroups,
		getRowModel,
	} = useReactTable({
		columns,
		data: data?.resultList ?? EMPTY_DATA,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
		},
		manualPagination: true,
		manualSorting: true,
		pageCount,
		state: {
			pagination,
			sorting,
		},
		onSortingChange: setSorting,
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
		totalCount: totalRecords,
	};

	const { rows } = getRowModel();
	const headers: HeaderGroup<AdminApprovalsManagementTableData> | undefined =
		getHeaderGroups().at(-1);
	return (
		<TableContainer
			component={Paper}
			variant="outlined"
			sx={adminApprovalsManagementTableContainerSX}
		>
			<Table
				size={isMobile ? 'small' : 'medium'}
				padding={isMobile ? 'none' : 'normal'}
				id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}`}
				data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}`}
			>
				<TableHead
					id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-head`}
					data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<AdminOrderApprovalsManagementTableHeaderRow
							key={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-body`}
					data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<AdminOrderApprovalsManagementTableRow
								row={row}
								key={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-row-${row.id}`}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{approvalsManagementNLS.NoItem.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
