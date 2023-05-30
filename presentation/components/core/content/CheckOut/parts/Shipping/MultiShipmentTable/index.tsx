/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { Column, usePagination, useTable } from 'react-table';
import { dFix } from '@/utils/floatingPoint';
import { ShippingMultiShipmentTableItemDetails } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/ItemDetails';
import { ShippingMultiShipmentTableItemShippingDetails } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/ShippingDetails';
import { ShippingMultiShipmentTableHeaderRow } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/HeaderRow';
import { ShippingMultiShipmentTableRow } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Row';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ShippingMultiShipmentTableToolbar } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Toolbar';
import { PAGINATION } from '@/data/constants/tablePagination';
import { TablePagination } from '@/components/blocks/TablePagination';
import { ShippingMultiShipmentTableHeaderCheckbox } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/HeaderCheckbox';
import { ShippingMultiShipmentTableCheckbox } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Checkbox';
import { Quantity } from '@/components/content/CheckOut/parts/Shipping/MultiShipmentTable/Quantity';

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
				const { partNumber, quantity, orderItemId } = orderItem || {};

				return {
					orderItemId,
					checkbox: { orderItemId },
					itemDetails: { partNumber },
					quantity: { quantity: dFix(quantity, 0) },
					shippingDetails: { item: orderItem },
				} as ShippingTableData;
			}),
		[orderItems]
	);

	const columns: Array<Column<ShippingTableData>> = useMemo(
		() => [
			{
				Header: ShippingMultiShipmentTableHeaderCheckbox,
				accessor: 'checkbox',
				Cell: ShippingMultiShipmentTableCheckbox,
			},
			{
				Header: multipleShipmentTableNLS.Labels.ItemDetails.t(),
				accessor: 'itemDetails',
				Cell: ShippingMultiShipmentTableItemDetails,
			},
			{
				Header: multipleShipmentTableNLS.Labels.Quantity.t(),
				accessor: 'quantity',
				Cell: Quantity,
			},
			{
				Header: multipleShipmentTableNLS.Labels.ShippingDetails.t(),
				accessor: 'shippingDetails',
				Cell: ShippingMultiShipmentTableItemShippingDetails,
			},
		],
		[multipleShipmentTableNLS]
	);

	const {
		getTableProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		pageOptions,
		state: { pageIndex, pageSize },
	} = useTable<ShippingTableData>(
		{
			columns,
			data: data as readonly ShippingTableData[],
			initialState: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
		},
		usePagination
	);

	useEffect(() => {
		setShowError(false);
	}, [selectedItemIds, setShowError]);

	return orderItems?.length ? (
		<ContentProvider value={{ ...shippingContext, selectedItemIds, setSelectedItemIds }}>
			<ShippingMultiShipmentTableToolbar selectedItemIds={selectedItemIds} />
			<Table
				{...getTableProps()}
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
				id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table`}
				data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table`}
			>
				{view === 'full' ? (
					<TableHead
						id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-header`}
						data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-head`}
					>
						{headerGroups.map((headerGroup) => (
							<ShippingMultiShipmentTableHeaderRow
								key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-${headerGroup.id}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-body`}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<ShippingMultiShipmentTableRow
								row={row}
								key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-row-${row.original.orderItemId}`}
							/>
						);
					})}
				</TableBody>
			</Table>
			<TablePagination
				{...{
					pageSize,
					setPageSize,
					gotoPage,
					canPreviousPage,
					canNextPage,
					nextPage,
					pageIndex,
					previousPage,
					pageOptions,
					pageCount,
				}}
			/>
		</ContentProvider>
	) : null;
};
