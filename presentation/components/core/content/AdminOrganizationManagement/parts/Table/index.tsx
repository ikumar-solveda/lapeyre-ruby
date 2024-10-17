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
import { AdminOrganizationManagementDistinguishedNameCell } from '@/components/content/AdminOrganizationManagement/parts/Table/DistinguishedNameCell';
import { AdminOrganizationManagementTableHeaderRow } from '@/components/content/AdminOrganizationManagement/parts/Table/HeaderRow';
import { AdminOrganizationManagementNameCell } from '@/components/content/AdminOrganizationManagement/parts/Table/NameCell';
import { AdminOrganizationManagementTableRow } from '@/components/content/AdminOrganizationManagement/parts/Table/Row';
import { AdminOrganizationManagementTableTypeCell } from '@/components/content/AdminOrganizationManagement/parts/Table/TypeCell';
import { useAdmin_OrganizationManagement } from '@/data/Content/Admin_OrganizationManagement';
import { useLocalization } from '@/data/Localization';
import {
	ORGANIZATION_MANAGEMENT_TABLE,
	ORGANIZATION_MANAGEMENT_TABLE_ACCESSOR_KEYS,
} from '@/data/constants/admin_organizationManagement';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { OrganizationManagementTableData } from '@/data/types/Admin_OrganizationManagement';
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

type AdminOrganizationManagementContextValues = {
	useAdmin_OrganizationManagementValue: ReturnType<typeof useAdmin_OrganizationManagement>;
};

const EMPTY_DATA = [] as ReturnType<typeof useAdmin_OrganizationManagement>['organizations'];
export const AdminOrganizationManagementTable: FC = () => {
	const { useAdmin_OrganizationManagementValue } = useContext(
		ContentContext
	) as AdminOrganizationManagementContextValues;
	const {
		organizations = EMPTY_DATA,
		totalRecords,
		pageCount,
		pagination,
		setPagination,
	} = useAdmin_OrganizationManagementValue;
	const organizationManagementNLS = useLocalization('OrganizationManagement');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const columns = useMemo(
		() => [
			{
				accessorKey: ORGANIZATION_MANAGEMENT_TABLE_ACCESSOR_KEYS.organizationName,
				cell: AdminOrganizationManagementNameCell,
				header: organizationManagementNLS.OrganizationName.t(),
				enableSorting: false,
			},
			{
				accessorKey: ORGANIZATION_MANAGEMENT_TABLE_ACCESSOR_KEYS.type,
				cell: AdminOrganizationManagementTableTypeCell,
				header: organizationManagementNLS.Type.t(),
				enableSorting: false,
			},
			{
				accessorKey: ORGANIZATION_MANAGEMENT_TABLE_ACCESSOR_KEYS.dn,
				cell: AdminOrganizationManagementDistinguishedNameCell,
				header: organizationManagementNLS.DistinguishedName.t(),
				enableSorting: false,
			},
		],
		[organizationManagementNLS]
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
		data: organizations,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
		manualPagination: true,
		manualSorting: true,
		pageCount,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
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
		totalCount: totalRecords,
	};

	const { rows } = getRowModel();
	const headers: HeaderGroup<OrganizationManagementTableData> | undefined =
		getHeaderGroups().at(-1);
	return (
		<TableContainer component={Paper} variant="outlined">
			<Table
				size={isMobile ? 'small' : 'medium'}
				padding={isMobile ? 'none' : 'normal'}
				id={`${ORGANIZATION_MANAGEMENT_TABLE}`}
				data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}`}
			>
				<TableHead
					id={`${ORGANIZATION_MANAGEMENT_TABLE}-head`}
					data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<AdminOrganizationManagementTableHeaderRow
							key={`${ORGANIZATION_MANAGEMENT_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${ORGANIZATION_MANAGEMENT_TABLE}-body`}
					data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<AdminOrganizationManagementTableRow
								row={row}
								key={`${ORGANIZATION_MANAGEMENT_TABLE}-row-${row.id}`}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{organizationManagementNLS.NoItem.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
