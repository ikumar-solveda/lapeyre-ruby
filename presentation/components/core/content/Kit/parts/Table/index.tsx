/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { KitTableCollapsibleCellOrRow } from '@/components/content/Kit/parts/Table/CollapsibleCellOrRow';
import { KitTableHeaderRow } from '@/components/content/Kit/parts/Table/HeaderRow';
import { KitTableItemDetails } from '@/components/content/Kit/parts/Table/ItemDetails';
import { KitTableQuantity } from '@/components/content/Kit/parts/Table/Quantity';
import { KitTableRow } from '@/components/content/Kit/parts/Table/Row';
import { useLocalization } from '@/data/Localization';
import { KIT_TABLE_ACCESSOR_KEYS, KIT_TABLE_PREFIX } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { ItemDetails, KitTableData, ProductType } from '@/data/types/Product';
import { dFix } from '@/utils/floatingPoint';
import { getAttributesForSubRowsOfKit } from '@/utils/productAttributes';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	ExpandedState,
	Row,
	SortingState,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useMemo, useState } from 'react';

export const KitTable: FC = () => {
	const { product } = useContext(ContentContext) as { product: ProductType };
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [sorting, setSorting] = useState<SortingState>([]);
	const data = useMemo(
		() =>
			product?.components?.map((component) => {
				const { name, partNumber, thumbnail, quantity = 0, seo, attributes } = component;
				return {
					quantity: dFix(quantity, 0),
					itemDetails: { thumbnail, name, partNumber, href: seo.href },
					subRows: [{ attributes: getAttributesForSubRowsOfKit(attributes) }],
				} as KitTableData;
			}) ?? [],
		[product?.components]
	);
	const kitLabels = useLocalization('productDetail');
	const columns = useMemo(
		() => [
			{
				header: ' ',
				accessorKey: KIT_TABLE_ACCESSOR_KEYS.expanderOrAttributes,
				cell: KitTableCollapsibleCellOrRow,
			},
			{
				accessorKey: KIT_TABLE_ACCESSOR_KEYS.itemDetails,
				cell: KitTableItemDetails,
				header: kitLabels.PRODUCTSKU.t(),
				sortingFn: (rowA: Row<KitTableData>, rowB: Row<KitTableData>, columnId: string) => {
					const rowAItem: ItemDetails = rowA.getValue(columnId);
					const rowBItem: ItemDetails = rowB.getValue(columnId);
					return rowAItem.name.localeCompare(rowBItem.name);
				},
			},
			{
				accessorKey: KIT_TABLE_ACCESSOR_KEYS.quantity,
				cell: KitTableQuantity,
				header: kitLabels.QUANTITY.t(),
				sortingFn: (rowA: Row<KitTableData>, rowB: Row<KitTableData>, columnId: string) => {
					const rowAItem: number = rowA.getValue(columnId);
					const rowBItem: number = rowB.getValue(columnId);
					return rowBItem - rowAItem;
				},
			},
		],
		[kitLabels]
	);

	const { getHeaderGroups, getRowModel } = useReactTable({
		columns,
		data,
		state: { sorting, expanded },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onExpandedChange: setExpanded,
		getExpandedRowModel: getExpandedRowModel(),
		getSubRows: (row) => row.subRows,
	});

	return data?.length && data.length > 0 ? (
		<Table
			size={view === 'full' ? 'medium' : 'small'}
			padding={view === 'full' ? 'normal' : 'none'}
			id={KIT_TABLE_PREFIX}
			data-testid={KIT_TABLE_PREFIX}
		>
			{view === 'full' ? (
				<TableHead
					id={`${KIT_TABLE_PREFIX}-head`}
					data-testid={`${KIT_TABLE_PREFIX}-head`}
					responsive
				>
					{getHeaderGroups().map((headerGroup, i) => (
						<KitTableHeaderRow key={`${KIT_TABLE_PREFIX}-head-${i}`} {...{ headerGroup }} />
					))}
				</TableHead>
			) : null}
			<TableBody id={`${KIT_TABLE_PREFIX}-body`} data-testid={`${KIT_TABLE_PREFIX}-body`}>
				{getRowModel().rows.map((row, i) => (
					<KitTableRow row={row} key={i} />
				))}
			</TableBody>
		</Table>
	) : null;
};
