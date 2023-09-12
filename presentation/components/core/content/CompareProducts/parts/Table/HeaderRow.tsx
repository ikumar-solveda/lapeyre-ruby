/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { compareProductsTableHeaderCellSX } from '@/components/content/CompareProducts/styles/Table/headerCell';
import { useCompareProducts } from '@/data/Content/CompareProducts';
import { COMPARE_TABLE_PRODUCT_HEADER_NAME } from '@/data/constants/compare';
import { ContentContext } from '@/data/context/content';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const CompareProductsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<DataElement>;
}> = ({ headerGroup }) => {
	const { prodWidth, attrWidth } = useContext(ContentContext) as Omit<
		ReturnType<typeof useCompareProducts>,
		'columns' | 'data' | 'productById' | 'prodWidths' | 'nProds'
	>;

	return (
		<TableRow id={`compare-products-header-row-${headerGroup.id}`}>
			{headerGroup.headers.map((header) => (
				<TableCell
					colSpan={header.colSpan}
					key={`compare-products-header-row-${headerGroup.id}-cell-${header.id}`}
					id={`compare-products-header-row-${headerGroup.id}-cell-${header.id}`}
					data-testid={`compare-products-header-row-${headerGroup.id}-cell-${header.id}`}
					sx={compareProductsTableHeaderCellSX(
						header.id === COMPARE_TABLE_PRODUCT_HEADER_NAME ? prodWidth : attrWidth,
						header.id === COMPARE_TABLE_PRODUCT_HEADER_NAME ? 'top' : 'middle'
					)}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};
