/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { GPSIACTableSkuListTableAvailability } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/Availability';
import { GPSIACTableSkuListTableCollapsibleCell } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/CollapsibleCell';
import { GPSIACTableSkuListTableDefiningAttributes } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/DefiningAttributes';
import { GPSIACTableSkuListTableHeaderRow } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/HeaderRow';
import { GPSIACTableSkuListTableRow } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/Row';
import { GPSIACTableSkuListTableSku } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/Sku';
import { useStoreInventoryByOrderItems } from '@/data/Content/StoreInventoryByOrderItems';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SKU_LIST_TABLE_ACCESSOR_KEYS } from '@/data/constants/product';
import { ORDER_SKU_LIST_TABLE_PREFIX } from '@/data/constants/storeLocator';
import { ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';
import { GPSIACNestedSkuListTableContextValue } from '@/data/types/SkuListTable';
import { StoreDetails } from '@/data/types/Store';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

const EMPTY_SKUS: ProductType[] = [];
export const GPSIACTableSkuListTable: FC<{
	product: ProductType;
	order?: Order;
	physicalStore?: StoreDetails;
}> = ({ product, order, physicalStore }) => {
	const productDetailsNLS = useLocalization('productDetail');
	const storeNLS = useLocalization('Inventory');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';

	const { availabilities } = useStoreInventoryByOrderItems({ order, product, physicalStore });

	const columns = useMemo(
		() => {
			const { limit, overflow, total } = getSkuListDisplayableColumns(product, true);
			return [
				...(overflow > 0
					? [
							{
								header: EMPTY_STRING,
								accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.attributes,
								cell: GPSIACTableSkuListTableCollapsibleCell,
							},
					  ]
					: []),
				{
					accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.partNumber,
					cell: GPSIACTableSkuListTableSku,
					header: productDetailsNLS.SKU.t(),
				},
				...(total > 0
					? Array.from({ length: limit }, (x, i) => ({
							accessorKey: product?.definingAttributes[i].identifier,
							cell: GPSIACTableSkuListTableDefiningAttributes,
							header: product.definingAttributes[i].name,
					  }))
					: []),
				{
					header: storeNLS.Drawer.Title.t(),
					accessorKey: SKU_LIST_TABLE_ACCESSOR_KEYS.pickup,
					cell: GPSIACTableSkuListTableAvailability,
				},
			];
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[product]
	);

	const { getHeaderGroups, getRowModel } = useReactTable({
		columns,
		data: product.items ?? EMPTY_SKUS,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => true,
	});

	const ctxValue: GPSIACNestedSkuListTableContextValue = useMemo(
		() => ({ availabilities, parentProduct: product }),
		[availabilities, product]
	);

	return (
		<ContentProvider value={ctxValue}>
			<Table
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
				id={ORDER_SKU_LIST_TABLE_PREFIX}
				data-testid={ORDER_SKU_LIST_TABLE_PREFIX}
			>
				{view === 'full' ? (
					<TableHead
						id={`${ORDER_SKU_LIST_TABLE_PREFIX}-head`}
						data-testid={`${ORDER_SKU_LIST_TABLE_PREFIX}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup, i) => (
							<GPSIACTableSkuListTableHeaderRow
								key={`${ORDER_SKU_LIST_TABLE_PREFIX}-head-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody
					id={`${ORDER_SKU_LIST_TABLE_PREFIX}-body`}
					data-testid={`${ORDER_SKU_LIST_TABLE_PREFIX}-body`}
				>
					{getRowModel().rows.map((row) => (
						<GPSIACTableSkuListTableRow row={row} key={row.original.partNumber} />
					))}
				</TableBody>
			</Table>
		</ContentProvider>
	);
};
