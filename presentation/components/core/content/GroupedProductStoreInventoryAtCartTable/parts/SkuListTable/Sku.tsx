/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableSkuListTableSku: FC<CellContext<ProductType, unknown>> = ({ row }) => {
	const productDetailsLabel = useLocalization('productDetail');
	const { partNumber } = row.original;
	return (
		<TableCellResponsiveContent label={productDetailsLabel.SKU.t()}>
			<Typography>{partNumber}</Typography>
		</TableCellResponsiveContent>
	);
};
