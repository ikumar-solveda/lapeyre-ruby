/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { OrderItemTableV2ActionCell } from '@/components/content/OrderItemTableV2/parts/ActionCell';
import { OrderItemTableV2AvailabilityCell } from '@/components/content/OrderItemTableV2/parts/AvailabilityCell';
import { OrderItemTableV2DetailsCell } from '@/components/content/OrderItemTableV2/parts/DetailsCell';
import { OrderItemTableV2HeaderRow } from '@/components/content/OrderItemTableV2/parts/HeaderRow';
import { OrderItemTableV2PriceCell } from '@/components/content/OrderItemTableV2/parts/PriceCell';
import { OrderItemTableV2QuantityCell } from '@/components/content/OrderItemTableV2/parts/QuantityCell';
import { OrderItemTableV2Row } from '@/components/content/OrderItemTableV2/parts/Row';
import { OrderItemTableV2TypeCell } from '@/components/content/OrderItemTableV2/parts/TypeCell';
import { orderItemTableV2TableSX } from '@/components/content/OrderItemTableV2/styles/table';
import { orderItemTableV2TableBodySX } from '@/components/content/OrderItemTableV2/styles/tableBody';
import { orderItemTableV2TableContainerSX } from '@/components/content/OrderItemTableV2/styles/tableContainer';
import { orderItemTableV2TableHeadSX } from '@/components/content/OrderItemTableV2/styles/tableHead';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useLocalization } from '@/data/Localization';
import { ColumnWithKey, OrderTableData, OrderTableMeta } from '@/data/types/OrderItemTableV2';
import { dFix } from '@/utils/floatingPoint';
import { Paper, TableContainer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	Row,
	VisibilityState,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ComponentPropsWithRef, FC, useMemo } from 'react';

export const OrderItemTableV2: FC<
	ComponentPropsWithRef<typeof TableContainer> & {
		data: OrderTableData[];
		readonly?: boolean;
		isShippingGroup?: boolean;
		orderStatus?: string;
	}
> = ({ data, id, readonly = false, isShippingGroup = false, orderStatus, ...otherProps }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const sort = useMemo(
		() => (rowA: Row<OrderTableData>, rowB: Row<OrderTableData>, columnId: string) => {
			const keyToCompare = rowA.getValue<ColumnWithKey>(columnId).key;
			const isNumeric: boolean | undefined = rowA.getValue<ColumnWithKey>(columnId).numeric;
			const rowAItem = rowA.getValue<ColumnWithKey>(columnId)[keyToCompare];
			const rowBItem = rowB.getValue<ColumnWithKey>(columnId)[keyToCompare];
			return keyToCompare === 'availability'
				? String(rowAItem?.inventoryStatus).localeCompare(String(rowBItem?.inventoryStatus))
				: isNumeric
				? dFix(rowAItem) - dFix(rowBItem)
				: String(rowAItem).localeCompare(String(rowBItem));
		},
		[]
	);
	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<OrderTableData>();
		return [
			columnHelper.accessor('itemDetails', {
				header: orderItemTableNLS.Labels.ItemDetails.t(),
				cell: OrderItemTableV2DetailsCell,
				sortingFn: sort,
			}),
			columnHelper.accessor('availability', {
				header: orderItemTableNLS.Labels.Availability.t(),
				cell: OrderItemTableV2AvailabilityCell,
				sortingFn: sort,
			}),
			columnHelper.accessor('fulfillment', {
				header: orderItemTableNLS.Labels.FulfillmentType.t(),
				cell: OrderItemTableV2TypeCell,
				enableSorting: false,
			}),
			columnHelper.accessor('quantity', {
				header: orderItemTableNLS.Labels.Quantity.t(),
				cell: OrderItemTableV2QuantityCell,
				sortingFn: sort,
			}),
			columnHelper.accessor('price', {
				header: orderItemTableNLS.Labels.Price.t(),
				cell: OrderItemTableV2PriceCell,
				sortingFn: sort,
			}),
			columnHelper.display({
				id: 'actions',
				cell: OrderItemTableV2ActionCell,
				enableSorting: false,
			}),
		];
	}, [orderItemTableNLS, sort]);

	const columnVisibility = useMemo<VisibilityState>(
		() =>
			(isShippingGroup || (readonly && isMobile)
				? { availability: false, actions: false, fulfillment: false }
				: readonly
				? { actions: false, availability: false, fulfillment: true }
				: isMobile
				? { actions: false, fulfillment: false }
				: { fulfillment: false }) as VisibilityState,
		[isShippingGroup, readonly, isMobile]
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
	} = useReactTable<OrderTableData>({
		columns,
		data,
		getRowId: (originalRow: OrderTableData, _index: number, _parent?: Row<OrderTableData>) =>
			originalRow.itemDetails.orderItemId ?? '',
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		meta: { readonly, isShippingGroup, orderStatus } as OrderTableMeta,
		state: {
			columnVisibility,
		},
		autoResetPageIndex: false,
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
		totalCount: data?.length,
	};
	const { rows } = getRowModel();

	return (
		<>
			<TableContainer
				component={Paper}
				variant="outlined"
				elevation={0}
				sx={orderItemTableV2TableContainerSX}
				{...otherProps}
			>
				<Table
					size={isMobile ? 'small' : 'medium'}
					padding={isMobile ? 'none' : 'normal'}
					id={`${id}-cart-table`}
					data-testid={`${id}-cart-table`}
					sx={orderItemTableV2TableSX}
				>
					<TableHead
						id={`${id}-table-head`}
						data-testid={`${id}-table-head`}
						sx={orderItemTableV2TableHeadSX}
						responsive
					>
						{getHeaderGroups().map((headerGroup) => (
							<OrderItemTableV2HeaderRow
								id={`${id}-header-row`}
								key={`${id}-header-${headerGroup.id}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
					<TableBody id={`${id}--table-body`} sx={orderItemTableV2TableBodySX}>
						{rows.length > 0
							? rows.map((row) => (
									<OrderItemTableV2Row row={row} key={`${id}-table-row-${row.id}`} />
							  ))
							: null}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination {...paginationComponentProps} />
		</>
	);
};
