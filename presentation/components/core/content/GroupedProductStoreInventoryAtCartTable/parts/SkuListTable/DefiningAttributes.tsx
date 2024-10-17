/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ProductType } from '@/data/types/Product';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { get } from 'lodash';
import { FC } from 'react';

export const GPSIACTableSkuListTableDefiningAttributes: FC<CellContext<ProductType, unknown>> = ({
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
