/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { SkuListTableSkuAvailability } from '@/components/content/SkuList/parts/Table/SkuAvailability';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import { CircularProgress, Stack } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const SkuListTableAvailability: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const label = useLocalization('productDetail').Availability.t();
	const { original: _row } = row;
	const isLoading = _row.isInventoryLoading;

	return (
		<TableCellResponsiveContent label={label} alignItems="center">
			<Stack spacing={1} justifyContent="center">
				{isLoading ? <CircularProgress size={30} /> : <SkuListTableSkuAvailability row={_row} />}
			</Stack>
		</TableCellResponsiveContent>
	);
};
