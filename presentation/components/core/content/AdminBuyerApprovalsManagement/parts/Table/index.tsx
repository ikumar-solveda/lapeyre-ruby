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
import { AdminBuyerApprovalsManagementTableActionsCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/ActionsCell';
import { AdminBuyerApprovalsManagementTableApprovalIdCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/ApprovalIdCell';
import { AdminBuyerApprovalsManagementTableApprovedOrRejectedCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/ApprovedOrRejectedCell';
import { AdminBuyerApprovalsManagementTableBuyerCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/BuyerCell';
import { AdminBuyerApprovalsManagementTableHeaderRow } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/HeaderRow';
import { AdminBuyerApprovalsManagementTableRow } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/Row';
import { AdminBuyerApprovalsManagementTableStatusCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/StatusCell';
import { AdminBuyerApprovalsManagementTableSubmittedCell } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table/SubmittedCell';
import { useAdmin_BuyerApprovalsManagementTable } from '@/data/Content/Admin_BuyerApprovalsManagementTable';
import { useLocalization } from '@/data/Localization';
import {
	APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS,
	BUYER_APPROVALS_MANAGEMENT_TABLE,
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

export const AdminBuyerApprovalsManagementTable: FC = () => {
	const { data, pagination, setPagination, pageCount, sorting, setSorting } = useContext(
		ContentContext
	) as ReturnType<typeof useAdmin_BuyerApprovalsManagementTable>;
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const theme = useTheme();

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const columns = useMemo(
		() => [
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.approvalId,
				cell: AdminBuyerApprovalsManagementTableApprovalIdCell,
				header: approvalsManagementNLS.Columns.ApprovalId.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.buyer,
				cell: AdminBuyerApprovalsManagementTableBuyerCell,
				header: approvalsManagementNLS.Columns.Buyer.t(),
				enableSorting: false,
			},

			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.status,
				cell: AdminBuyerApprovalsManagementTableStatusCell,
				header: approvalsManagementNLS.Columns.Status.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.submitted,
				cell: AdminBuyerApprovalsManagementTableSubmittedCell,
				header: approvalsManagementNLS.Columns.Submitted.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.approvedOrRejected,
				cell: AdminBuyerApprovalsManagementTableApprovedOrRejectedCell,
				header: approvalsManagementNLS.Columns.ApprovedOrRejected.t(),
			},
			{
				accessorKey: APPROVALS_MANAGEMENT_TABLE_ACCESSOR_KEYS.actions,
				cell: AdminBuyerApprovalsManagementTableActionsCell,
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
		totalCount: data?.recordSetTotal,
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
				id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}`}
				data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}`}
			>
				<TableHead
					id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-head`}
					data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<AdminBuyerApprovalsManagementTableHeaderRow
							key={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-body`}
					data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<AdminBuyerApprovalsManagementTableRow
								row={row}
								key={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-row-${row.id}`}
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
