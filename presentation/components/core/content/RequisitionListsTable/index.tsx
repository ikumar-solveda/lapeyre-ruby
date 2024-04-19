/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TablePagination } from '@/components/blocks/TablePagination';
import { RequisitionListsTableActionsCell } from '@/components/content/RequisitionListsTable/parts/ActionsCell';
import { RequisitionListsTableCreatedByCell } from '@/components/content/RequisitionListsTable/parts/CreatedByCell';
import { RequisitionListsTableHeaderRow } from '@/components/content/RequisitionListsTable/parts/HeaderRow';
import { RequisitionListsTableLastUpdateCell } from '@/components/content/RequisitionListsTable/parts/LastUpdateCell';
import { RequisitionListsTableListNameCell } from '@/components/content/RequisitionListsTable/parts/ListNameCell';
import { RequisitionListsTableRow } from '@/components/content/RequisitionListsTable/parts/Row';
import { RequisitionListsTableTypeCell } from '@/components/content/RequisitionListsTable/parts/TypeCell';
import { requisitionListsTableSX } from '@/components/content/RequisitionListsTable/styles';
import { requisitionListsTableBodySX } from '@/components/content/RequisitionListsTable/styles/body';
import { requisitionListsTableContainerSX } from '@/components/content/RequisitionListsTable/styles/container';
import { requisitionListsTableHeadSX } from '@/components/content/RequisitionListsTable/styles/head';
import { useRequisitionListsTable } from '@/data/Content/RequisitionListsTable';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ID } from '@/data/types/Basic';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Paper, TableContainer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	HeaderGroup,
	Row,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useMemo } from 'react';

const EMPTY_DATA = [] as RequisitionListsItem[];

export const RequisitionListsTable: FC<{ id: ID }> = ({ id: _id }) => {
	const {
		data,
		pagination,
		setPagination,
		pageCount,
		mutateRequisitionLists,
		sorting,
		setSorting,
		totalRecords,
	} = useRequisitionListsTable();
	const localization = useLocalization('RequisitionLists');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { ViewUploadLogs } = useLocalization('RequisitionLists');
	const { RequisitionListsUploadLogs } = useLocalization('Routes');

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<RequisitionListsItem>();
		return [
			columnHelper.group({
				id: 'uploadLogView',
				header: () => (
					<Linkable
						type="link"
						href={RequisitionListsUploadLogs.route.t()}
						id={RequisitionListsUploadLogs.route.t()}
						data-testid={RequisitionListsUploadLogs.route.t()}
					>
						<Typography textAlign="right">{ViewUploadLogs.t()}</Typography>
					</Linkable>
				),
				columns: [
					columnHelper.accessor('description', {
						header: localization.Columns.ListName.t(),
						id: 'description',
						cell: RequisitionListsTableListNameCell,
					}),
					columnHelper.accessor('userRegistration', {
						header: localization.Columns.CreatedBy.t(),
						id: 'creator',
						cell: RequisitionListsTableCreatedByCell,
					}),
					columnHelper.accessor('lastUpdate', {
						header: localization.Columns.LastUpdate.t(),
						id: 'lastUpdate',
						cell: RequisitionListsTableLastUpdateCell,
					}),
					columnHelper.accessor('status', {
						header: localization.Columns.Type.t(),
						id: 'status',
						cell: RequisitionListsTableTypeCell,
					}),
					columnHelper.display({
						id: 'actions',
						header: localization.Columns.Actions.t(),
						cell: RequisitionListsTableActionsCell,
						enableSorting: false,
					}),
				],
			}),
		];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localization]);

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
	} = useReactTable<RequisitionListsItem>({
		meta: { mutateRequisitionLists },
		columns,
		data: data?.resultList ?? EMPTY_DATA,
		getRowId: (
			originalRow: RequisitionListsItem,
			_index: number,
			_parent?: Row<RequisitionListsItem>
		) => originalRow.orderId ?? '',
		getCoreRowModel: getCoreRowModel(),
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

	const { rows } = getRowModel();
	const headers: HeaderGroup<RequisitionListsItem> | undefined = getHeaderGroups().at(-1);

	return data ? (
		<TableContainer component={Paper} variant="outlined" sx={requisitionListsTableContainerSX}>
			<Table
				size={isMobile ? 'small' : 'medium'}
				padding={isMobile ? 'none' : 'normal'}
				id={`${REQUISITION_LISTS_TABLE}`}
				data-testid={`${REQUISITION_LISTS_TABLE}`}
				sx={requisitionListsTableSX}
			>
				<TableHead
					id={`${REQUISITION_LISTS_TABLE}-header`}
					data-testid={`${REQUISITION_LISTS_TABLE}-head`}
					sx={requisitionListsTableHeadSX}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<RequisitionListsTableHeaderRow
							key={`${REQUISITION_LISTS_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody id={`${REQUISITION_LISTS_TABLE}-body`} sx={requisitionListsTableBodySX}>
					{rows.length > 0 ? (
						rows.map((row) => (
							<RequisitionListsTableRow
								row={row}
								key={`${REQUISITION_LISTS_TABLE}-row-${row.id}`}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{localization.NoRecord.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{totalRecords > PAGINATION.sizes[0] ? (
				<TablePagination
					pageSize={getState().pagination.pageSize}
					setPageSize={setPageSize}
					gotoPage={gotoPage}
					canPreviousPage={getCanPreviousPage()}
					canNextPage={getCanNextPage()}
					nextPage={nextPage}
					pageIndex={getState().pagination.pageIndex}
					previousPage={previousPage}
					pageCount={getPageCount()}
				/>
			) : null}
		</TableContainer>
	) : null;
};
