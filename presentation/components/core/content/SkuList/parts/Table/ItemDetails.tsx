/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';

export const SkuListTableItemDetails: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const productDetailsLabel = useLocalization('productDetail');
	const { partNumber } = row.original;
	return (
		<TableCellResponsiveContent label={productDetailsLabel.SKU.t()}>
			<Typography>{partNumber}</Typography>
		</TableCellResponsiveContent>
	);
};
