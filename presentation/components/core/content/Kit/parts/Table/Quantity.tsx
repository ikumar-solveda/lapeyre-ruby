/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { KitTableData } from '@/data/types/Product';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const KitTableQuantity: FC<CellContext<KitTableData, number>> = ({ getValue }) => {
	const { QUANTITY } = useLocalization('productDetail');
	return (
		<TableCellResponsiveContent label={QUANTITY.t()}>
			<Typography>{getValue() ?? 0}</Typography>
		</TableCellResponsiveContent>
	);
};
