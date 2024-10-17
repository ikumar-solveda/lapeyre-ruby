/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { CheckOutV2ShippingMultiShipmentTableCheckbox } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/Checkbox';
import { CheckOutV2ShippingMultiShipmentTableHeaderCheckbox } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/HeaderCheckbox';
import { CheckOutV2ShippingMultiShipmentTableHeaderRow } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/HeaderRow';
import { CheckOutV2ShippingMultiShipmentTableItemDetails } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/ItemDetails';
import { CheckOutV2ShippingMultiShipmentTableQuantity } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/Quantity';
import { CheckOutV2ShippingMultiShipmentTableRow } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/Row';
import { CheckOutV2ShippingMultiShipmentTableItemShippingDetails } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/ShippingDetails';
import { CheckOutV2ShippingMultiShipmentTableToolbar } from '@/components/content/CheckOutV2/parts/Shipping/MultiShipmentTable/Toolbar';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
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

export const CheckOutV2ShippingMultiShipmentItemTable: FC = () => {
	const shippingContext = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;
	const { deliveryOrderItems, setShowError } = shippingContext;
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([] as string[]);

	const data = useMemo(
		() =>
			(deliveryOrderItems ?? []).map((orderItem) => {
				const { partNumber, quantity, orderItemId, contractId } = orderItem || {};

				return {
					orderItemId,
					itemDetails: { partNumber, contractId },
					quantity: { quantity: dFix(quantity, 0) },
					shippingDetails: { item: orderItem },
				} as ShippingTableData;
			}),
		[deliveryOrderItems]
	);

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<ShippingTableData>();
		return [
			columnHelper.display({
				id: 'checkbox',
				header: CheckOutV2ShippingMultiShipmentTableHeaderCheckbox,
				cell: CheckOutV2ShippingMultiShipmentTableCheckbox,
			}),
			columnHelper.accessor('itemDetails', {
				header: multipleShipmentTableNLS.Labels.ItemDetails.t(),
				cell: CheckOutV2ShippingMultiShipmentTableItemDetails,
			}),
			columnHelper.accessor('quantity', {
				header: multipleShipmentTableNLS.Labels.Quantity.t(),
				cell: CheckOutV2ShippingMultiShipmentTableQuantity,
			}),
			columnHelper.accessor('shippingDetails', {
				header: multipleShipmentTableNLS.Labels.ShippingDetails.t(),
				cell: CheckOutV2ShippingMultiShipmentTableItemShippingDetails,
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

	return deliveryOrderItems?.length ? (
		<ContentProvider value={{ ...shippingContext, selectedItemIds, setSelectedItemIds }}>
			<CheckOutV2ShippingMultiShipmentTableToolbar selectedItemIds={selectedItemIds} />
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
						<CheckOutV2ShippingMultiShipmentTableHeaderRow
							key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-${headerGroup.id}`}
							headerGroup={headerGroup}
						/>
					))}
				</TableHead>
				<TableBody id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-body`}>
					{getRowModel().rows.map((row) => (
						<CheckOutV2ShippingMultiShipmentTableRow
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
