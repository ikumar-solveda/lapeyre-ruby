/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CompareProductsTableAttributeValueDisplay } from '@/components/content/CompareProducts/parts/Table/AttributeValueDisplay';
import { compareProductsTableAttributeNameSX } from '@/components/content/CompareProducts/styles/Table/attributeName';
import { COMPARE_TABLE_PRODUCT_HEADER_NAME } from '@/data/constants/compare';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { CompareCheckObj } from '@/data/types/Compare';
import { ReactTableRow } from '@/data/types/Table';
import { Switch } from '@/utils/switch';
import { TableCell, TableRow, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const CompareProductsTableRow: FC<{ row: ReactTableRow }> = ({ row }) => {
	const { cells, getRowProps } = row;
	const { productsById } = useContext(ContentContext) as {
		productsById: Record<string, CompareCheckObj>;
	};
	return (
		<TableRow {...getRowProps()}>
			{cells.map((cell, i) => (
				<TableCell {...cell.getCellProps()} key={i}>
					{Switch(cell.column.Header)
						.case(COMPARE_TABLE_PRODUCT_HEADER_NAME, () => (
							<CompareProductsTableAttributeValueDisplay
								attr={cell.value}
								product={productsById[cell.column.id].product}
							/>
						))
						.case(EMPTY_STRING, () => (
							<Typography sx={compareProductsTableAttributeNameSX}>{cell.value}</Typography>
						))
						.defaultTo(() => null)}
				</TableCell>
			))}
		</TableRow>
	);
};
