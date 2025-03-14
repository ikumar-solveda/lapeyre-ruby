/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { SkuListTableAvailability } from '@/components/content/SkuList/parts/Table/Availability';
import { SkuListTableCollapsibleCell } from '@/components/content/SkuList/parts/Table/CollapsibleCell';
import { SkuListTableDefiningAttributes } from '@/components/content/SkuList/parts/Table/DefiningAttributes';
import { SkuListTableHeaderRow } from '@/components/content/SkuList/parts/Table/HeaderRow';
import { SkuListTableItemDetails } from '@/components/content/SkuList/parts/Table/ItemDetails';
import { SkuListTablePickup } from '@/components/content/SkuList/parts/Table/Pickup';
import { SkuListTablePrice } from '@/components/content/SkuList/parts/Table/Price';
import { SkuListTableQuantity } from '@/components/content/SkuList/parts/Table/Quantity';
import { SkuListTableRow } from '@/components/content/SkuList/parts/Table/Row';
import { SkuListTableScheduleForLaterIcon } from '@/components/content/SkuList/parts/Table/ScheduleForLaterIcon';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { EMPTY_PRODUCT } from '@/data/Content/SkuListTable';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { getInventoryRecord } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SKU_LIST_TABLE_ACCESSOR_KEYS, SKU_LIST_TABLE_PREFIX } from '@/data/constants/product';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ContentContext } from '@/data/context/content';
import { SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { compareAvailability } from '@/utils/compareAvailability';
import { getInventoryStatus } from '@/utils/getInventoryStatus';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	Row,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

/**
 * @deprecated use `findSkuListSkuAvailability` instead
 */
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
	const storeNLS = useLocalization('Inventory');
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');
	const {
		product = EMPTY_PRODUCT,
		data,
		findPrice,
		findAttributeValue,
		physicalStore,
		embedded,
	} = useContext(ContentContext) as SkuListTableAuxiliaryContextValue;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const { localeName: locale } = useStoreLocale();
	const { data: ff } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = ff.featureEnabled;

	const columns = useMemo(
		() => {
			const { limit, overflow, total } = getSkuListDisplayableColumns(product, embedded);
			const defaultColumnsOnSkuListTable = [
				...(overflow > 0
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
				...(embedded
					? []
					: [
							{
								header: EMPTY_STRING,
								accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.scheduleForLater,
								cell: SkuListTableScheduleForLaterIcon,
							},
					  ]),
				...(total > 0
					? Array.from({ length: limit }, (x, i) => ({
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
			];
			const columnsOnPhysicalStoreDialogSkuListTable = [
				{
					header: storeNLS.Drawer.Title.t(),
					accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.pickup,
					cell: SkuListTablePickup,
					sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) =>
						compareAvailability({
							a: rowA.original,
							b: rowB.original,
							physicalStore,
							showCount,
							nls: storeNLS.ByCount,
							locale,
							pickupOnly: true,
						}),
				},
			];
			const columnsOnSkuListTable = [
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
					sortingFn: (rowA: Row<SkuListTableData>, rowB: Row<SkuListTableData>) =>
						compareAvailability({
							a: rowA.original,
							b: rowB.original,
							physicalStore,
							showCount,
							nls: storeNLS.ByCount,
							locale,
						}),
				},
			];
			return [
				...defaultColumnsOnSkuListTable,
				...(embedded ? columnsOnPhysicalStoreDialogSkuListTable : columnsOnSkuListTable),
			];
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			productDetailsLabel,
			product,
			inventoryStatusOnline,
			inventoryStatusStore,
			physicalStore,
			embedded,
		]
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
		totalCount: data.length,
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
			<TablePagination {...paginationComponentProps} />
		</>
	);
};
