/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { ShippingMultiShipmentTableCheckbox } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Checkbox';
import { ShippingMultiShipmentTableHeaderCheckbox } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/HeaderCheckbox';
import { ShippingMultiShipmentTableHeaderRow } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/HeaderRow';
import { ShippingMultiShipmentTableItemDetails } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/ItemDetails';
import { Quantity } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Quantity';
import { ShippingMultiShipmentTableRow } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Row';
import { ShippingMultiShipmentTableItemShippingDetails } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/ShippingDetails';
import { ShippingMultiShipmentTableToolbar } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Toolbar';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { dFix } from '@/utils/floatingPoint';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	Row,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

export const ShippingMultiShipmentItemTable: FC = () => {
	const shippingContext = useContext(ContentContext) as ReturnType<typeof useCheckOut> &
		ReturnType<typeof useShipping>;
	const { orderItems, setShowError } = shippingContext;
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([] as string[]);

	const data = useMemo(
		() =>
			(orderItems ?? []).map((orderItem) => {
				const { partNumber, quantity, orderItemId, contractId } = orderItem || {};

				return {
					orderItemId,
					itemDetails: { partNumber, contractId },
					quantity: { quantity: dFix(quantity, 0) },
					shippingDetails: { item: orderItem },
				} as ShippingTableData;
			}),
		[orderItems]
	);

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<ShippingTableData>();
		return [
			columnHelper.display({
				id: 'checkbox',
				header: ShippingMultiShipmentTableHeaderCheckbox,
				cell: ShippingMultiShipmentTableCheckbox,
			}),
			columnHelper.accessor('itemDetails', {
				header: multipleShipmentTableNLS.Labels.ItemDetails.t(),
				cell: ShippingMultiShipmentTableItemDetails,
			}),
			columnHelper.accessor('quantity', {
				header: multipleShipmentTableNLS.Labels.Quantity.t(),
				cell: Quantity,
			}),
			columnHelper.accessor('shippingDetails', {
				header: multipleShipmentTableNLS.Labels.ShippingDetails.t(),
				cell: ShippingMultiShipmentTableItemShippingDetails,
			}),
		];
	}, [multipleShipmentTableNLS]);

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
	} = useReactTable<ShippingTableData>({
		columns,
		data,
		getRowId: (originalRow: ShippingTableData, _index: number, _parent?: Row<ShippingTableData>) =>
			originalRow.orderItemId,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	useEffect(() => {
		setShowError(false);
	}, [selectedItemIds, setShowError]);

	return orderItems?.length ? (
		<ContentProvider value={{ ...shippingContext, selectedItemIds, setSelectedItemIds }}>
			<ShippingMultiShipmentTableToolbar selectedItemIds={selectedItemIds} />
			<Table
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
				id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table`}
				data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table`}
			>
				<TableHead
					id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-header`}
					data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup) => (
						<ShippingMultiShipmentTableHeaderRow
							key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-body`}>
					{getRowModel().rows.map((row) => (
						<ShippingMultiShipmentTableRow
							row={row}
							key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-row-${row.id}`}
						/>
					))}
				</TableBody>
			</Table>
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
		</ContentProvider>
	) : null;
};
