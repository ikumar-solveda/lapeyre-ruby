/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TablePagination } from '@/components/blocks/TablePagination';
import { AdminBuyerManagementTableHeaderRow } from '@/components/content/AdminBuyerManagement/parts/Table/HeaderRow';
import { AdminBuyerManagementTableRow } from '@/components/content/AdminBuyerManagement/parts/Table/Row';
import { useAdmin_BuyerManagement } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { searchInitialValues } from '@/data/constants/admin_buyerManagement';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Paper, TableContainer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export type AdminBuyerManagementContextValues = {
	buyerManagementValue: ReturnType<typeof useAdmin_BuyerManagement>;
	searchFormValue: ReturnType<typeof useForm<typeof searchInitialValues>>;
};

export const AdminBuyerManagementTable: FC = () => {
	const ctxValues = useContext(ContentContext) as AdminBuyerManagementContextValues;
	const { buyerManagementValue } = ctxValues;
	const { buyers, sorting, setSorting, totalRecords, pageCount, pagination, setPagination } =
		buyerManagementValue;
	const theme = useTheme();
	const view = useMediaQuery(theme.breakpoints.down('md')) ? 'compact' : 'full';
	const labels = useLocalization('BuyerManagement');
	const columns = useMemo(
		() => [
			{
				header: labels.logonId.t(),
				id: 'logonId',
				accessorKey: 'logonId',
			},
			{ header: labels.firstName.t(), id: 'firstName', accessorKey: 'firstName' },
			{ header: labels.lastName.t(), id: 'lastName', accessorKey: 'lastName' },
			{ header: labels.role.t(), id: 'role', enableSorting: false },
			{ header: labels.access.t(), id: 'access', accessorKey: 'access' },
			{ header: labels.actions.t(), id: 'actions', enableSorting: false },
		],
		[labels]
	);

	const {
		getHeaderGroups,
		getRowModel,
		getState,
		setPageSize,
		setPageIndex: gotoPage,
		getCanPreviousPage,
		getCanNextPage,
		nextPage,
		previousPage,
		getPageCount,
	} = useReactTable({
		columns,
		data: buyers,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		manualSorting: true,
		pageCount,
		state: { pagination, sorting },
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		initialState: { pagination: { pageIndex: 0, pageSize: PAGINATION.sizes[0] } },
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
		<TableContainer component={Paper} variant="outlined">
			<Table
				id="buyer-management-table"
				data-testid="buyer-management-table"
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead
					id="buyer-management-table-head"
					data-testid="buyer-management-table-head"
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<AdminBuyerManagementTableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
					))}
				</TableHead>
				<TableBody>
					{buyers.length ? (
						getRowModel().rows.map((row) => (
							<AdminBuyerManagementTableRow key={row.id} row={row} {...ctxValues} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={getHeaderGroups()?.at(-1)?.headers.length}>
								<Typography textAlign="center">{labels.noBuyer.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{totalRecords > PAGINATION.sizes[0] ? (
				<TablePagination {...paginationComponentProps} />
			) : null}
		</TableContainer>
	);
};
