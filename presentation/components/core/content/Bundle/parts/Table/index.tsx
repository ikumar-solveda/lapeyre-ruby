/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { BundleTableAvailability } from '@/components/content/Bundle/parts/Table/Availability';
import { BundleTableCollapsibleCell } from '@/components/content/Bundle/parts/Table/CollapsibleCell';
import { BundleTableHeaderRow } from '@/components/content/Bundle/parts/Table/HeaderRow';
import { BundleTablePrice } from '@/components/content/Bundle/parts/Table/Price';
import { BundleTableProductComponentDetails } from '@/components/content/Bundle/parts/Table/ProductComponentDetails';
import { BundleTableQuantity } from '@/components/content/Bundle/parts/Table/Quantity';
import { BundleTableRow } from '@/components/content/Bundle/parts/Table/Row';
import { BundleTableScheduleForLaterIcon } from '@/components/content/Bundle/parts/Table/ScheduleForLaterIcon';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { BUNDLE_TABLE_PREFIX } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import type { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import type { BundleTableRowData } from '@/data/types/Product';
import { compareAvailability } from '@/utils/compareAvailability';
import { findOfferPrice } from '@/utils/findOfferPrice';
import { getBundleRowSku } from '@/utils/getBundleRowSku';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	type Row,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';
export { findOfferPrice as findPrice }; // for backward compatibility

const findSku = (row: BundleTableRowData) => {
	const { name, selectedSku, isOneSku, partNumber } = row;
	const _partNumber = selectedSku?.partNumber ?? (isOneSku ? partNumber : EMPTY_STRING);
	return `${name}${_partNumber}`;
};

export const BundleTable: FC = () => {
	const { data, physicalStore, embedded } = useContext(
		ContentContext
	) as BundleDetailsTableAuxiliaryContextValue;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const bundleLabels = useLocalization('productDetail');
	const inventoryNls = useLocalization('Inventory');
	const { localeName: locale } = useStoreLocale();
	const { data: ff } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = ff.featureEnabled;

	const columns = useMemo(
		() =>
			[
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
					header: EMPTY_STRING,
					accessorKey: 'scheduleForLater',
					cell: BundleTableScheduleForLaterIcon,
				},
				{
					accessorKey: 'price',
					header: bundleLabels.Price.t(),
					cell: BundleTablePrice,
					sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
						const rowAData = rowA.original;
						const rowBData = rowB.original;
						const { value: rowAItem } = findOfferPrice(
							rowAData.selectedSku?.price ?? rowAData.price
						);
						const { value: rowBItem } = findOfferPrice(
							rowBData.selectedSku?.price ?? rowBData.price
						);
						return rowAItem - rowBItem;
					},
				},
				{
					accessorKey: 'availability',
					header: bundleLabels.Availability.t(),
					cell: BundleTableAvailability,
					sortingFn: (rowA: Row<BundleTableRowData>, rowB: Row<BundleTableRowData>) => {
						const a = getBundleRowSku(rowA.original);
						const b = getBundleRowSku(rowB.original);
						return compareAvailability({
							a,
							b,
							locale,
							physicalStore,
							showCount,
							nls: inventoryNls.ByCount,
							pickupOnly: embedded,
							defaultText: bundleLabels.SelectAttributes.t(),
						});
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
			].filter((_, index) => !embedded || (index !== 2 && index !== 4)),
		[bundleLabels, embedded, inventoryNls, locale, physicalStore, showCount]
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
