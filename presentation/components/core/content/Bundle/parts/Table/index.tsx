/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import {
	BundleTableAvailability,
	InventoryStatusType,
	OfflineInventoryType,
	OnlineInventoryType,
} from '@/components/content/Bundle/parts/Table/Availability';
import { BundleTableCollapsibleCell } from '@/components/content/Bundle/parts/Table/CollapsibleCell';
import { BundleTableHeaderRow } from '@/components/content/Bundle/parts/Table/HeaderRow';
import { BundleTablePrice } from '@/components/content/Bundle/parts/Table/Price';
import { BundleTableProductComponentDetails } from '@/components/content/Bundle/parts/Table/ProductComponentDetails';
import { BundleTableQuantity } from '@/components/content/Bundle/parts/Table/Quantity';
import { BundleTableRow } from '@/components/content/Bundle/parts/Table/Row';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { hasInStock } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { USAGE_OFFER } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { BUNDLE_TABLE_PREFIX } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { BundleTableRowData, Price } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { findAvailability } from '@/utils/findAvailability';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	Row,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

const getStatusText = (
	container: InventoryStatusType | undefined,
	localization: OnlineInventoryType | OfflineInventoryType,
	inventory: ProductAvailabilityData | undefined,
	store = EMPTY_STRING
) => {
	const { status } = container ?? {};
	const text =
		status === undefined
			? EMPTY_STRING
			: localization[container?.translationKey as keyof typeof localization].t({ store } as any) +
			  (hasInStock(inventory)
					? `(${dFix(inventory?.availableQuantity ?? '0', 0)})`
					: EMPTY_STRING);
	return text;
};

type GetRowAvailabilitySortTextProps = ReturnType<typeof findAvailability> & {
	inventoryStatusOnline: OnlineInventoryType;
	inventoryStatusStore: OfflineInventoryType;
	defaultText: string;
	store?: string;
};
const getRowAvailabilitySortText = (props: GetRowAvailabilitySortTextProps) => {
	const {
		offline,
		offlineStatus,
		online,
		onlineStatus,
		inventoryStatusOnline,
		inventoryStatusStore,
		defaultText,
		store,
	} = props;
	const onlineStatusText = getStatusText(onlineStatus, inventoryStatusOnline, online);
	const offlineStatusText = store
		? getStatusText(offlineStatus, inventoryStatusStore, offline, store)
		: undefined;
	const rc = onlineStatus.status === undefined ? defaultText : onlineStatusText + offlineStatusText;
	return rc;
};

const findSku = (row: BundleTableRowData) => {
	const { name, selectedSku, isOneSku, partNumber } = row;
	const _partNumber = selectedSku?.partNumber ?? (isOneSku ? partNumber : EMPTY_STRING);
	return `${name}${_partNumber}`;
};

export const findPrice = (price: Price[]) => {
	const o = price.find(({ usage: u, value: v }) => u === USAGE_OFFER && v !== EMPTY_STRING);
	const offerPrice = o ? dFix(o.value) : 0;
	const currency = o ? o.currency : null;
	return { value: (offerPrice > 0 ? offerPrice : null) as number, currency };
};

export const BundleTable: FC = () => {
	const { data, physicalStoreName } = useContext(ContentContext) as ReturnType<
		typeof useBundleDetailsTable
	>;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const bundleLabels = useLocalization('productDetail');
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');

	const columns = useMemo(
		() => [
			{
				accessorKey: 'collapsible',
				header: EMPTY_STRING,
				cell: BundleTableCollapsibleCell,
			},
			{
				accessorKey: 'productSkuDetails',
				header: bundleLabels.PRODUCTSKU.t(),
				cell: BundleTableProductComponentDetails,
				sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
					const rowAItem = findSku(rowA.original);
					const rowBItem = findSku(rowB.original);
					return String(rowAItem).localeCompare(String(rowBItem));
				},
			},
			{
				accessorKey: 'price',
				header: bundleLabels.Price.t(),
				cell: BundleTablePrice,
				sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
					const rowAData = rowA.original;
					const rowBData = rowB.original;
					const { value: rowAItem } = findPrice(rowAData.selectedSku?.price ?? rowAData.price);
					const { value: rowBItem } = findPrice(rowBData.selectedSku?.price ?? rowBData.price);
					return rowAItem - rowBItem;
				},
			},
			{
				accessorKey: 'availability',
				header: bundleLabels.Availability.t(),
				cell: BundleTableAvailability,
				sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
					const { SelectAttributes } = bundleLabels;
					const defaultText = SelectAttributes.t();
					const store = physicalStoreName;
					const translatable = { inventoryStatusOnline, inventoryStatusStore, defaultText };

					const rowAData = findAvailability(rowA.original, physicalStoreName);
					const rowAItem = getRowAvailabilitySortText({ ...rowAData, ...translatable, store });

					const rowBData = findAvailability(rowB.original, physicalStoreName);
					const rowBItem = getRowAvailabilitySortText({ ...rowBData, ...translatable, store });

					return rowAItem.localeCompare(rowBItem);
				},
			},
			{
				accessorKey: 'quantity',
				header: bundleLabels.QUANTITY.t(),
				cell: BundleTableQuantity,
				sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
					const rowAItem = dFix(rowA.original.quantity, 0);
					const rowBItem = dFix(rowB.original.quantity, 0);
					return rowAItem - rowBItem;
				},
			},
		],
		[bundleLabels, inventoryStatusOnline, inventoryStatusStore, physicalStoreName]
	);

	const { getRowModel, getHeaderGroups } = useReactTable<BundleTableRowData>({
		columns,
		data,
		getRowCanExpand: () => true,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return data.length ? (
		<Table
			size={view === 'full' ? 'medium' : 'small'}
			padding={view === 'full' ? 'normal' : 'none'}
			id={BUNDLE_TABLE_PREFIX}
			data-testid={BUNDLE_TABLE_PREFIX}
		>
			{view === 'full' ? (
				<TableHead
					id={`${BUNDLE_TABLE_PREFIX}-head`}
					data-testid={`${BUNDLE_TABLE_PREFIX}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup, i) => (
						<BundleTableHeaderRow key={`${BUNDLE_TABLE_PREFIX}-head-${i}`} {...{ headerGroup }} />
					))}
				</TableHead>
			) : null}
			<TableBody id={`${BUNDLE_TABLE_PREFIX}-body`} data-testid={`${BUNDLE_TABLE_PREFIX}-body`}>
				{getRowModel().rows.map((row, i) => (
					<BundleTableRow key={`${BUNDLE_TABLE_PREFIX}-row-${i}`} row={row} />
				))}
			</TableBody>
		</Table>
	) : null;
};
