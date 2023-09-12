/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { CompareProductsTableAttributeValueDisplay } from '@/components/content/CompareProducts/parts/Table/AttributeValueDisplay';
import { CompareProductsTableHeaderAddButton } from '@/components/content/CompareProducts/parts/Table/HeaderAddButton';
import { CompareProductsTableHeaderProduct } from '@/components/content/CompareProducts/parts/Table/HeaderProduct';
import { CompareProductsTableHeaderRow } from '@/components/content/CompareProducts/parts/Table/HeaderRow';
import { CompareProductsTableRow } from '@/components/content/CompareProducts/parts/Table/Row';
import { compareProductsTableAttributeNameSX } from '@/components/content/CompareProducts/styles/Table/attributeName';
import { compareProductsTableInnerBorderSX } from '@/components/content/CompareProducts/styles/Table/innerBorder';
import {
	COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME,
	COMPARE_TABLE_ATTRIBUTE_HEADER_NAME,
	COMPARE_TABLE_PRODUCT_HEADER_NAME,
	HEADERS,
} from '@/data/constants/compare';
import { ResponseProductAttribute } from '@/data/types/Product';
import { Typography } from '@mui/material';
import {
	CellContext,
	ColumnDefTemplate,
	HeaderContext,
	Row,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FC } from 'react';

export type DataElement = {
	__attr: string;
	identifier: string;
	[id: string]: string | ResponseProductAttribute;
};

type Props = {
	columns: {
		Header: typeof HEADERS[number];
		accessor: string;
	}[];
	data: DataElement[];
};

const headers: {
	[key in typeof HEADERS[number]]:
		| ColumnDefTemplate<HeaderContext<DataElement, unknown>>
		| undefined;
} = {
	[COMPARE_TABLE_ATTRIBUTE_HEADER_NAME]: undefined,
	[COMPARE_TABLE_PRODUCT_HEADER_NAME]: CompareProductsTableHeaderProduct,
	[COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME]: CompareProductsTableHeaderAddButton,
};

const cells: {
	[key in typeof HEADERS[number]]: ColumnDefTemplate<CellContext<DataElement, unknown>> | undefined;
} = {
	[COMPARE_TABLE_ATTRIBUTE_HEADER_NAME]: ({ getValue }: CellContext<DataElement, unknown>) => (
		<Typography sx={compareProductsTableAttributeNameSX}>{getValue() as string}</Typography>
	),
	[COMPARE_TABLE_PRODUCT_HEADER_NAME]: CompareProductsTableAttributeValueDisplay,
	[COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME]: undefined,
};

export const CompareProductsTable: FC<Props> = ({ columns: rowColumn, data }) => {
	const columnHelper = createColumnHelper<DataElement>();
	// map original format to new table format without touching data hook, aiming minimize customization/upgrading impact.
	const columns = rowColumn.map(({ Header, accessor }) =>
		columnHelper.accessor(accessor, {
			header: headers[Header],
			cell: cells[Header],
		})
	);
	const { getHeaderGroups, getRowModel } = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (originalRow: DataElement, _index: number, _parent?: Row<DataElement>) =>
			originalRow.identifier,
	});
	return (
		<Table
			id="compare-products-table"
			data-testid={`compare-products-table`}
			sx={compareProductsTableInnerBorderSX}
		>
			<TableHead>
				{getHeaderGroups().map((headerGroup) => (
					<CompareProductsTableHeaderRow
						key={`CompareProductsTableHeaderRow-${headerGroup.id}`}
						headerGroup={headerGroup}
					/>
				))}
			</TableHead>
			<TableBody id="compare-products-table-body">
				{getRowModel().rows.map((row) => (
					<CompareProductsTableRow key={`CompareProductsTableRow-${row.id}`} {...{ row }} />
				))}
			</TableBody>
		</Table>
	);
};
