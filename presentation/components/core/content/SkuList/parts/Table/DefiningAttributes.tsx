/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { CellContext } from '@tanstack/react-table';
import { get } from 'lodash';
import { Typography } from '@mui/material';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { SkuListTableData } from '@/data/types/Product';

export const SkuListTableDefiningAttributes: FC<CellContext<SkuListTableData, unknown>> = ({
	column,
	row,
}) => {
	const { definingAttributes } = row.original;
	const attribute = definingAttributes.find((a) => a.identifier === column.id);
	const value = get(attribute, 'values[0].value', '');
	return (
		<TableCellResponsiveContent label={attribute?.name}>
			<Typography>{value}</Typography>
		</TableCellResponsiveContent>
	);
};
