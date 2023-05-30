/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { CompareProductsTableHeaderAddButton } from '@/components/content/CompareProducts/parts/Table/HeaderAddButton';
import { CompareProductsTableHeaderProduct } from '@/components/content/CompareProducts/parts/Table/HeaderProduct';
import { compareProductsTableHeaderCellSX } from '@/components/content/CompareProducts/styles/Table/headerCell';
import {
	COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME,
	COMPARE_TABLE_PRODUCT_HEADER_NAME,
} from '@/data/constants/compare';
import { ContentContext } from '@/data/context/content';
import { CompareCheckObj } from '@/data/types/Compare';
import { ResponseProductType } from '@/data/types/Product';
import { Switch } from '@/utils/switch';
import { FC, useContext } from 'react';
import { HeaderGroup } from 'react-table';

export const CompareProductsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<Record<string, unknown>>;
}> = ({ headerGroup }) => {
	const { productsById, prodWidths, attrWidth, imageSrc } = useContext(ContentContext) as {
		productsById: Record<string, CompareCheckObj>;
		prodWidths: number;
		attrWidth: number;
		imageSrc: Record<string, ResponseProductType>;
	};

	return (
		<TableRow {...headerGroup.getHeaderGroupProps()}>
			{headerGroup.headers.map((column, i) => (
				<TableCell
					{...column.getHeaderProps()}
					key={i}
					sx={compareProductsTableHeaderCellSX(
						i === 0 ? attrWidth : prodWidths,
						column.Header === COMPARE_TABLE_PRODUCT_HEADER_NAME ? 'top' : 'middle'
					)}
				>
					{Switch(column.Header)
						.case(COMPARE_TABLE_PRODUCT_HEADER_NAME, () => (
							<CompareProductsTableHeaderProduct
								product={productsById[column.id].product}
								imageSrc={imageSrc[column.id]}
							/>
						))
						.case(COMPARE_TABLE_ADD_PRODUCT_HEADER_NAME, () => (
							<CompareProductsTableHeaderAddButton id={column.id} />
						))
						.defaultTo(() => null)}
				</TableCell>
			))}
		</TableRow>
	);
};
