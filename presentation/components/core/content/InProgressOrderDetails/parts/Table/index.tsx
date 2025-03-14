/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { tableContainerResponsiveSX } from '@/components/blocks/Table/styles/tableContainerResponsive';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { InProgressOrderDetailsTableActionsCell } from '@/components/content/InProgressOrderDetails/parts/Table/ActionsCell';
import { InProgressOrderDetailsTableCheckboxCell } from '@/components/content/InProgressOrderDetails/parts/Table/CheckboxCell';
import { InProgressOrderDetailsTableCollapsibleCell } from '@/components/content/InProgressOrderDetails/parts/Table/CollapsibleCell';
import { InProgressOrderDetailsTableContributorCell } from '@/components/content/InProgressOrderDetails/parts/Table/ContributorCell';
import { InProgressOrderDetailsTableHeaderCheckbox } from '@/components/content/InProgressOrderDetails/parts/Table/HeaderCheckbox';
import { InProgressOrderDetailsTableHeaderRow } from '@/components/content/InProgressOrderDetails/parts/Table/HeaderRow';
import { InProgressOrderDetailsTableOrderItemCell } from '@/components/content/InProgressOrderDetails/parts/Table/OrderItemCell';
import { InProgressOrderDetailsTablePriceCell } from '@/components/content/InProgressOrderDetails/parts/Table/PriceCell';
import { InProgressOrderDetailsTableQuantityCell } from '@/components/content/InProgressOrderDetails/parts/Table/QuantityCell';
import { InProgressOrderDetailsTableRow } from '@/components/content/InProgressOrderDetails/parts/Table/Row';
import { InProgressOrderDetailsTableToolbar } from '@/components/content/InProgressOrderDetails/parts/Table/Toolbar';
import { inProgressOrderDetailsTableEmptyContentSX } from '@/components/content/InProgressOrderDetails/styles/Table/emptyContent';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import type { OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Paper, TableCell, TableContainer, TableRow, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	HeaderGroup,
	type RowSelectionState,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

const EMPTY_DATA = [] as OrderItem[];
const INIT_ROW_SELECTION = {};

export const InProgressOrderDetailsTable: FC = () => {
	const { view, pagination, setPagination, pageCount, data, user, activeOrderId } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails> & { view: string };
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const nls = useLocalization('InProgressOrderDetails');
	const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'));
	const { settings } = useSettings();

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<OrderItem>();
		return [
			columnHelper.display({
				id: 'select',
				header: InProgressOrderDetailsTableHeaderCheckbox,
				cell: InProgressOrderDetailsTableCheckboxCell,
				enableSorting: false,
			}),
			columnHelper.display({
				header: () => null,
				id: 'collapsible',
				cell: InProgressOrderDetailsTableCollapsibleCell,
			}),
			columnHelper.accessor((row) => row.orderItemId, {
				id: 'orderItem',
				header: nls.Table.orderItems.t(),
				cell: InProgressOrderDetailsTableOrderItemCell,
			}),
			columnHelper.accessor((row) => row.orderItemPrice, {
				id: 'price',
				header: nls.Table.price.t(),
				cell: InProgressOrderDetailsTablePriceCell,
			}),
			columnHelper.accessor((row) => row.quantity, {
				id: 'quantity',
				header: nls.Table.quantity.t(),
				cell: InProgressOrderDetailsTableQuantityCell,
			}),
			columnHelper.accessor((row) => row.xitem_firstName, {
				id: 'contributors',
				header: nls.Table.contributors.t(),
				cell: InProgressOrderDetailsTableContributorCell,
			}),
			columnHelper.display({
				id: 'actions',
				header: nls.Table.actions.t(),
				cell: InProgressOrderDetailsTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [nls]);

	const columnVisibility = useMemo<VisibilityState>(
		() =>
			(!isDesktop
				? { actions: false, select: false, collapsible: false, contributors: isB2BStore(settings) }
				: { contributors: isB2BStore(settings) }) as VisibilityState,
		[isDesktop, settings]
	);
	const {
		getHeaderGroups,
		getRowModel,
		getState,
		setPageSize,
		getCanPreviousPage,
		getCanNextPage,
		getPageCount,
		setPageIndex: gotoPage,
		nextPage,
		previousPage,
	} = useReactTable<OrderItem>({
		columns,
		data: data?.orderItem ?? EMPTY_DATA,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		enableRowSelection: (row) =>
			activeOrderId === data?.orderId || // current-cart (obviously mine)
			data?.buyerId === user?.userId || // my order
			user?.userId === row.original.xitem_memberId, // not my order but my item
		onRowSelectionChange: setRowSelection,
		pageCount,
		state: {
			pagination,
			rowSelection,
			columnVisibility,
		},
		onPaginationChange: setPagination,
		getRowCanExpand: () => true,
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
		totalCount: dFix(data?.recordSetTotal ?? 0, 0),
	};
	const { rows } = getRowModel();
	const headers: HeaderGroup<OrderItem> | undefined = getHeaderGroups().at(-1);
	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [data]);

	return (
		<TableContainer component={Paper} variant="outlined" sx={tableContainerResponsiveSX}>
			{!isEmpty(rowSelection) ? (
				<InProgressOrderDetailsTableToolbar rowSelection={rowSelection} />
			) : null}
			<Table
				id={AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}
				data-testid={AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
			>
				<TableHead
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-head`}
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<InProgressOrderDetailsTableHeaderRow
							key={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-body`}
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-body`}
				>
					{rows.length > 0 ? (
						rows.map((row) => (
							<InProgressOrderDetailsTableRow
								key={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-row-${row.id}`}
								row={row}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<EmptyContent
									altId={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-empty-content`}
									title={nls.NoItemsToDisplay.t()}
									description={nls.SearchAddDescription.t()}
									sx={inProgressOrderDetailsTableEmptyContentSX}
								/>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
