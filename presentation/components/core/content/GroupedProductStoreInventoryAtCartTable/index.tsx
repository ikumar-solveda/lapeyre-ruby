/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { GPSIACTableCollapsibleCell } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/CollapsibleCell';
import { GPSIACTableHeaderRow } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/HeaderRow';
import { GPSIACTableProductInfo } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/ProductInfo';
import { GPSIACTableRow } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/Row';
import { PRODUCT_INFO_TABLE_PREFIX } from '@/data/constants/storeLocator';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useProductsOfSkus } from '@/data/Content/ProductsOfSkus';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { filterOrderItemByPickup } from '@/utils/filterOrderItemByPickup';
import { mapToPartNumber } from '@/utils/mapToPartNumber';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { keyBy } from 'lodash';
import { FC, useContext, useMemo } from 'react';

export type SelectStoreContext = {
	candidate: StoreDetails;
};

// filter out items from each product that are not in the cart
const dataMap = (products: ProductType[], partNumbers: string[]) => {
	const asMap = keyBy(partNumbers);
	return products.map((product) => {
		const items = product.items.filter((item) => asMap[item.partNumber]);
		return { ...product, items };
	});
};
const EMPTY_PRODUCTS: ProductType[] = [];

/**
 * Abbreviated from `GroupedProductStoreInventoryAtCartTable` to `GPSIACTable` for convenience.
 */
export const GPSIACTable: FC<{ order: Order | undefined }> = ({ order }) => {
	const { candidate: physicalStore } = useContext(ContentContext) as SelectStoreContext;
	const partNumber = useMemo(
		() => order?.orderItem?.filter(filterOrderItemByPickup).map(mapToPartNumber) ?? [],
		[order]
	);

	const { products: rawProducts = EMPTY_PRODUCTS } = useProductsOfSkus({ partNumber });

	const products = useMemo(() => dataMap(rawProducts, partNumber), [partNumber, rawProducts]);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';

	const columns = useMemo(
		() => [
			{
				header: () => null,
				accessorKey: 'collapsible',
				cell: GPSIACTableCollapsibleCell,
			},
			{
				header: () => null,
				accessorKey: 'productInfo',
				cell: GPSIACTableProductInfo,
			},
		],
		[]
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
		data: products,
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
		totalCount: products.length,
	};

	const ctxValue = useMemo(() => {
		order;
	}, [order]);

	return (
		<ContentProvider value={ctxValue}>
			<Table
				size={view === 'full' ? 'medium' : 'small'}
				padding={view === 'full' ? 'normal' : 'none'}
				id={PRODUCT_INFO_TABLE_PREFIX}
				data-testid={PRODUCT_INFO_TABLE_PREFIX}
			>
				{view === 'full' ? (
					<TableHead
						id={`${PRODUCT_INFO_TABLE_PREFIX}-head`}
						data-testid={`${PRODUCT_INFO_TABLE_PREFIX}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup, i) => (
							<GPSIACTableHeaderRow
								key={`${PRODUCT_INFO_TABLE_PREFIX}-head-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody
					id={`${PRODUCT_INFO_TABLE_PREFIX}-body`}
					data-testid={`${PRODUCT_INFO_TABLE_PREFIX}-body`}
				>
					{getRowModel().rows.map((row) => (
						<GPSIACTableRow
							key={row.original.id}
							row={row}
							order={order}
							physicalStore={physicalStore}
						/>
					))}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</ContentProvider>
	);
};
