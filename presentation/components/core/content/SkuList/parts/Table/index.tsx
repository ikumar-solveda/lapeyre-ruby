/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import {
	InventoryStatusType,
	OfflineInventoryType,
	OnlineInventoryType,
} from '@/components/content/Bundle/parts/Table/Availability';
import { SkuListTableAvailability } from '@/components/content/SkuList/parts/Table/Availability';
import { SkuListTableCollapsibleCell } from '@/components/content/SkuList/parts/Table/CollapsibleCell';
import { SkuListTableDefiningAttributes } from '@/components/content/SkuList/parts/Table/DefiningAttributes';
import { SkuListTableHeaderRow } from '@/components/content/SkuList/parts/Table/HeaderRow';
import { SkuListTableItemDetails } from '@/components/content/SkuList/parts/Table/ItemDetails';
import { SkuListTablePrice } from '@/components/content/SkuList/parts/Table/Price';
import { SkuListTableQuantity } from '@/components/content/SkuList/parts/Table/Quantity';
import { SkuListTableRow } from '@/components/content/SkuList/parts/Table/Row';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	SKU_LIST_TABLE_ACCESSOR_KEYS,
	SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE,
	SKU_LIST_TABLE_PREFIX,
} from '@/data/constants/product';
import { PAGINATION } from '@/data/constants/tablePagination';
import { EMPTY_PRODUCT, useSkuListTable } from '@/data/Content/SkuListTable';
import { getInventoryRecord, hasInStock } from '@/data/Content/_Inventory';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { useMediaQuery, useTheme } from '@mui/material';
import {
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

type GetRowAvailabilitySortTextProps = ReturnType<typeof findSkuAvailability> & {
	inventoryStatusOnline: OnlineInventoryType;
	inventoryStatusStore: OfflineInventoryType;
	store?: string;
};

const getInventoryStatus = (iv: ProductAvailabilityData): InventoryStatusType => {
	let rc: InventoryStatusType;
	const inStock = hasInStock(iv);
	if (!inStock) {
		rc = { status: false, translationKey: 'OOS' };
	} else {
		rc = { status: true, translationKey: 'Available' };
	}
	return rc;
};

const getStatusText = (
	container: InventoryStatusType | undefined,
	localization: OnlineInventoryType | OfflineInventoryType,
	store = EMPTY_STRING
) => {
	const { status } = container ?? {};
	const text =
		status === undefined
			? EMPTY_STRING
			: localization[container?.translationKey as keyof typeof localization].t({ store } as any);
	return text;
};

const getRowAvailabilitySortText = (props: GetRowAvailabilitySortTextProps) => {
	const { offlineStatus, onlineStatus, inventoryStatusOnline, inventoryStatusStore, store } = props;
	const onlineStatusText = getStatusText(onlineStatus, inventoryStatusOnline);
	const offlineStatusText = store
		? getStatusText(offlineStatus, inventoryStatusStore, store)
		: undefined;
	const rc =
		onlineStatus.status === undefined ? EMPTY_STRING : onlineStatusText + offlineStatusText;
	return rc;
};

export const findSkuAvailability = (row: SkuListTableData, physicalStoreName: string) => {
	const { availability, partNumber } = row;
	const online = getInventoryRecord(availability, partNumber);
	const offline = getInventoryRecord(availability, partNumber, physicalStoreName);
	const onlineStatus = getInventoryStatus(online);
	const offlineStatus = physicalStoreName ? getInventoryStatus(offline) : undefined;
	return { onlineStatus, offlineStatus };
};

export const SkuListTable: FC = () => {
	const productDetailsLabel = useLocalization('productDetail');
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');
	const {
		product = EMPTY_PRODUCT,
		data,
		attrSz,
		findPrice,
		findAttributeValue,
		store,
	} = useContext(ContentContext) as ReturnType<typeof useSkuListTable> & { store: string };
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';

	const columns = useMemo(
		() => [
			...(attrSz && attrSz === SKU_LIST_TABLE_MAX_ATTRIBUTE_HEADER_SIZE
				? [
						{
							header: EMPTY_STRING,
							accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.attributes,
							cell: SkuListTableCollapsibleCell,
						},
				  ]
				: []),

			{
				accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.partNumber,
				cell: SkuListTableItemDetails,
				header: productDetailsLabel.SKU.t(),
				sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) => {
					const rowAData = rowA.original;
					const rowBData = rowB.original;
					return rowAData.partNumber.localeCompare(rowBData.partNumber);
				},
			},
			...(attrSz
				? Array.from({ length: attrSz }, (x, i) => ({
						accessorKey: product?.definingAttributes[i].identifier,
						cell: SkuListTableDefiningAttributes,
						header: product?.definingAttributes[i].name,
						sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) => {
							const rowAData = rowA.original;
							const rowBData = rowB.original;
							const rowAValue = findAttributeValue(
								rowAData,
								product?.definingAttributes[i].identifier
							);
							const rowBValue = findAttributeValue(
								rowBData,
								product?.definingAttributes[i].identifier
							);
							return rowAValue.localeCompare(rowBValue);
						},
				  }))
				: []),
			{
				accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.price,
				cell: SkuListTablePrice,
				header: productDetailsLabel.Price.t(),
				sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) => {
					const rowAData = rowA.original;
					const rowBData = rowB.original;
					const { value: rowAItem } = findPrice(rowAData.price);
					const { value: rowBItem } = findPrice(rowBData.price);
					return rowAItem - rowBItem;
				},
			},
			{
				accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.quantity,
				cell: SkuListTableQuantity,
				header: productDetailsLabel.QUANTITY.t(),
				enableSorting: false,
			},
			{
				accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.availability,
				cell: SkuListTableAvailability,
				header: productDetailsLabel.Availability.t(),
				sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) => {
					const translatable = { inventoryStatusOnline, inventoryStatusStore };
					const rowAData = findSkuAvailability(rowA.original, store);
					const rowAItem = getRowAvailabilitySortText({
						...rowAData,
						...translatable,
						store,
					});

					const rowBData = findSkuAvailability(rowB.original, store);
					const rowBItem = getRowAvailabilitySortText({
						...rowBData,
						...translatable,
						store,
					});

					return rowAItem.localeCompare(rowBItem);
				},
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[productDetailsLabel, product, attrSz, inventoryStatusOnline, inventoryStatusStore, store]
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
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
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
	};

	return (
		<>
			<Table
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
				id={SKU_LIST_TABLE_PREFIX}
				data-testid={SKU_LIST_TABLE_PREFIX}
			>
				{view === 'full' ? (
					<TableHead
						id={`${SKU_LIST_TABLE_PREFIX}-head`}
						data-testid={`${SKU_LIST_TABLE_PREFIX}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup, i) => (
							<SkuListTableHeaderRow
								key={`${SKU_LIST_TABLE_PREFIX}-head-${i}`}
								{...{ headerGroup }}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody
					id={`${SKU_LIST_TABLE_PREFIX}-body`}
					data-testid={`${SKU_LIST_TABLE_PREFIX}-body`}
				>
					{getRowModel().rows.map((row) => (
						<SkuListTableRow row={row} key={row.original.partNumber} />
					))}
				</TableBody>
			</Table>
			{data.length > PAGINATION.sizes[0] ? <TablePagination {...paginationComponentProps} /> : null}
		</>
	);
};
