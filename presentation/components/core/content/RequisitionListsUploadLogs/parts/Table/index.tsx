/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TablePagination } from '@/components/blocks/TablePagination';
import { requisitionListsTableSX } from '@/components/content/RequisitionListsTable/styles';
import { requisitionListsTableContainerSX } from '@/components/content/RequisitionListsTable/styles/container';
import { RequisitionListsUploadLogsTableHeaderRow } from '@/components/content/RequisitionListsUploadLogs/parts/Table/HeaderRow';
import { RequisitionListUploadLogsTableRow } from '@/components/content/RequisitionListsUploadLogs/parts/Table/Row';
import { RequisitionListsUploadLogsTableStatus } from '@/components/content/RequisitionListsUploadLogs/parts/Table/Status';
import { RequisitionListsUploadLogsTableToggleView } from '@/components/content/RequisitionListsUploadLogs/parts/Table/ToggleView';
import { RequisitionListsUploadLogsTableToolbar } from '@/components/content/RequisitionListsUploadLogs/parts/Table/Toolbar';
import { RequisitionListsUploadLogsTableUploadTime } from '@/components/content/RequisitionListsUploadLogs/parts/Table/UploadTime';
import { RequisitionListsUploadLogsTableUploadedFile } from '@/components/content/RequisitionListsUploadLogs/parts/Table/UploadedFile';
import { useRequisitionListsViewUploadLogs } from '@/data/Content/RequisitionListsViewUploadLogs';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { UPLOAD_LOGS_VIEW_TABLE } from '@/data/constants/requisitionLists';
import { UploadLogsData } from '@/data/types/RequisitionLists';
import { Paper, TableContainer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	FilterFn,
	FilterMeta,
	Row,
	SortingState,
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useCallback, useMemo, useState } from 'react';

const EMPTY_DATA = [] as UploadLogsData[];

export const RequisitionListsUploadLogsTable: FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState(EMPTY_STRING);
	const {
		data: logData,
		pagination,
		setPagination,
		pageCount,
		mutateRequisitionListsViewLogs,
	} = useRequisitionListsViewUploadLogs();

	const data = useMemo(
		() =>
			logData?.resultList?.map((fileUploadLog: any) => {
				const { fileUploadJobId, processFile, uploadFile } = fileUploadLog;
				return {
					fileUploadJobId,
					uploadedFile: uploadFile.fileInfo.fileName,
					status: processFile[0].status,
					uploadTime: uploadFile.uploadTime,
				} as UploadLogsData;
			}),
		[logData?.resultList]
	);

	const LogTableLabels = useLocalization('RequisitionLists');

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<UploadLogsData>();
		return [
			columnHelper.display({
				id: 'toggleFileUploadLog',
				cell: RequisitionListsUploadLogsTableToggleView,
			}),
			columnHelper.accessor('uploadedFile', {
				cell: RequisitionListsUploadLogsTableUploadedFile,
				header: LogTableLabels.UploadedFile.t(),
				sortingFn: (rowA: Row<UploadLogsData>, rowB: Row<UploadLogsData>, columnId: string) => {
					const rowAItem: string = rowA.getValue(columnId);
					const rowBItem: string = rowB.getValue(columnId);
					return rowAItem.localeCompare(rowBItem);
				},
			}),
			columnHelper.accessor('status', {
				cell: RequisitionListsUploadLogsTableStatus,
				header: LogTableLabels.Status.t(),
				sortingFn: (rowA: Row<UploadLogsData>, rowB: Row<UploadLogsData>, columnId: string) => {
					const rowAItem: string = rowA.getValue(columnId);
					const rowBItem: string = rowB.getValue(columnId);
					return rowAItem.localeCompare(rowBItem);
				},
			}),
			columnHelper.accessor('uploadTime', {
				cell: RequisitionListsUploadLogsTableUploadTime,
				header: LogTableLabels.UploadTime.t(),
				sortingFn: (rowA: Row<UploadLogsData>, rowB: Row<UploadLogsData>, columnId: string) => {
					const rowAItem: string = rowA.getValue(columnId);
					const rowBItem: string = rowB.getValue(columnId);
					return rowAItem.localeCompare(rowBItem);
				},
			}),
		];
	}, [LogTableLabels]);

	const globalFilterFn: FilterFn<UploadLogsData> = useCallback(
		(
			row: Row<UploadLogsData>,
			columnId: string,
			filterValue: any,
			_addMeta: (meta: FilterMeta) => void
		) => {
			if (columnId === 'uploadedFile') {
				return (
					row.getValue(columnId) !== undefined &&
					(row.getValue(columnId) as string).toLowerCase().includes(filterValue.toLowerCase())
				);
			} else {
				return false;
			}
		},
		[]
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
	} = useReactTable<UploadLogsData>({
		columns,
		data: data ?? EMPTY_DATA,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: { sorting, pagination, globalFilter },
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		getRowCanExpand: () => true,
		onPaginationChange: setPagination,
		manualPagination: true,
		getPaginationRowModel: getPaginationRowModel(),
		pageCount,
		globalFilterFn,
	});

	const { rows } = getRowModel();

	return (
		<TableContainer component={Paper} variant="outlined" sx={requisitionListsTableContainerSX}>
			<RequisitionListsUploadLogsTableToolbar
				setGlobalFilter={setGlobalFilter}
				mutate={mutateRequisitionListsViewLogs}
			/>
			<Table
				size={isMobile ? 'medium' : 'small'}
				padding={isMobile ? 'none' : 'normal'}
				id={UPLOAD_LOGS_VIEW_TABLE}
				data-testid={UPLOAD_LOGS_VIEW_TABLE}
			>
				<TableHead
					id={`${UPLOAD_LOGS_VIEW_TABLE}-head`}
					data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-head`}
					sx={requisitionListsTableSX}
					responsive
				>
					{getHeaderGroups().map((headerGroup, i) => (
						<RequisitionListsUploadLogsTableHeaderRow
							key={`${UPLOAD_LOGS_VIEW_TABLE}-head-${i}`}
							{...{ headerGroup }}
						/>
					))}
				</TableHead>

				<TableBody
					id={`${UPLOAD_LOGS_VIEW_TABLE}-body`}
					data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row, i) => <RequisitionListUploadLogsTableRow row={row} key={i} />)
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} responsive>
								<Typography textAlign="center">{LogTableLabels.NoViewRecord.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{data ? (
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
	);
};
