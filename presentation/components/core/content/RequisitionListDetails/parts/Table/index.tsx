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
import { RequisitionListDetailsTableActionsCell } from '@/components/content/RequisitionListDetails/parts/Table/ActionsCell';
import { RequisitionListDetailsTableCheckboxCell } from '@/components/content/RequisitionListDetails/parts/Table/CheckboxCell';
import { RequisitionListDetailsTableHeaderCheckbox } from '@/components/content/RequisitionListDetails/parts/Table/HeaderCheckbox';
import { RequisitionListDetailsTableHeaderRow } from '@/components/content/RequisitionListDetails/parts/Table/HeaderRow';
import { RequisitionListDetailsTableItemDetailsCell } from '@/components/content/RequisitionListDetails/parts/Table/ItemDetailsCell';
import { RequisitionListDetailsTableManufacturerCell } from '@/components/content/RequisitionListDetails/parts/Table/ManufacturerCell';
import { RequisitionListDetailsTableQuantityCell } from '@/components/content/RequisitionListDetails/parts/Table/QuantityCell';
import { RequisitionListDetailsTableRow } from '@/components/content/RequisitionListDetails/parts/Table/Row';
import { RequisitionListDetailsTableToggleAttributesCell } from '@/components/content/RequisitionListDetails/parts/Table/ToggleAttributesCell';
import { RequisitionListDetailsTableToolbar } from '@/components/content/RequisitionListDetails/parts/Table/Toolbar';
import { requisitionListDetailsTableSX } from '@/components/content/RequisitionListDetails/styles/Table';
import { requisitionListDetailsTableContainerSX } from '@/components/content/RequisitionListDetails/styles/Table/container';
import { requisitionListDetailsTableHeadSX } from '@/components/content/RequisitionListDetails/styles/Table/head';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Paper, TableContainer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	Row,
	RowSelectionState,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

const EMPTY_DATA = [] as OrderItem[];
const INIT_ROW_SELECTION = {};
export const RequisitionListDetailsTable: FC = () => {
	const { data, pagination, setPagination, pageCount, sorting, setSorting } = useContext(
		ContentContext
	) as ReturnType<typeof useRequisitionListDetails>;
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const localization = useLocalization('RequisitionListItems');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<OrderItem>();
		return [
			columnHelper.display({
				id: 'select',
				header: RequisitionListDetailsTableHeaderCheckbox,
				cell: RequisitionListDetailsTableCheckboxCell,
				enableSorting: false,
			}),
			columnHelper.display({
				id: 'toggleAttributes',
				cell: RequisitionListDetailsTableToggleAttributesCell,
				enableSorting: false,
			}),
			columnHelper.accessor('partNumber', {
				header: localization.orderItem.t(),
				cell: RequisitionListDetailsTableItemDetailsCell,
			}),
			columnHelper.accessor('productId', {
				// dummy accessor
				header: localization.manufacturer.t(),
				id: 'manufacturer',
				cell: RequisitionListDetailsTableManufacturerCell,
				enableSorting: false,
			}),
			columnHelper.accessor('quantity', {
				header: localization.quantity.t(),
				cell: RequisitionListDetailsTableQuantityCell,
			}),
			columnHelper.display({
				id: 'actions',
				header: localization.actions.t(),
				cell: RequisitionListDetailsTableActionsCell,
				enableSorting: false,
			}),
		];
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
	} = useReactTable<OrderItem>({
		columns,
		data: data?.orderItem ?? EMPTY_DATA,
		getRowId: (originalRow: OrderItem, _index: number, _parent?: Row<OrderItem>) =>
			originalRow.orderItemId ?? '',
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		pageCount,
		state: {
			pagination,
			rowSelection,
			sorting,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		getRowCanExpand: () => true,
	});
	const { rows } = getRowModel();

	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [data]);

	return (
		<TableContainer
			component={Paper}
			variant="outlined"
			sx={requisitionListDetailsTableContainerSX}
		>
			<RequisitionListDetailsTableToolbar rowSelection={rowSelection} />
			<Table
				size={isMobile ? 'small' : 'medium'}
				padding={isMobile ? 'none' : 'normal'}
				id={REQUISITION_LIST_DETAILS_TABLE}
				data-testid={REQUISITION_LIST_DETAILS_TABLE}
				sx={requisitionListDetailsTableSX}
			>
				<TableHead
					id={`${REQUISITION_LIST_DETAILS_TABLE}-head`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-head`}
					sx={requisitionListDetailsTableHeadSX}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<RequisitionListDetailsTableHeaderRow
							key={`${REQUISITION_LIST_DETAILS_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody id={`${REQUISITION_LIST_DETAILS_TABLE}-body`} sx={{}}>
					{rows.length > 0 ? (
						rows.map((row) => (
							<RequisitionListDetailsTableRow
								row={row}
								key={`${REQUISITION_LIST_DETAILS_TABLE}-row-${row.id}`}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length}>
								<Typography textAlign="center">{localization.noItems.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				{...{
					pageSize: getState().pagination.pageSize,
					setPageSize,
					gotoPage,
					canPreviousPage: getCanPreviousPage(),
					canNextPage: getCanNextPage(),
					nextPage,
					pageIndex: getState().pagination.pageIndex,
					previousPage,
					pageCount: getPageCount(),
					totalCount: data?.recordSetTotal ? dFix(data?.recordSetTotal, 0) : undefined,
				}}
			/>
		</TableContainer>
	);
};
