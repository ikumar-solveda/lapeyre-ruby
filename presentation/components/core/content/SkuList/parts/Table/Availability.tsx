/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Availability } from '@/components/blocks/Availability';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { SkuListTableData } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { getInventoryRecordV2 } from '@/data/utils/getInventoryRecordV2';
import { CircularProgress, Stack } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SkuListTableAvailability: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const label = useLocalization('productDetail').Availability.t();
	const { original: _row } = row;
	const { physicalStore } = useContext(ContentContext) as { physicalStore: StoreDetails };
	const isLoading = _row.isInventoryLoading;
	const availability = useMemo(
		() =>
			[
				getInventoryRecordV2(_row.availability, _row.partNumber),
				getInventoryRecordV2(_row.availability, _row.partNumber, physicalStore),
			].filter(Boolean),
		[_row, physicalStore]
	);

	return (
		<TableCellResponsiveContent label={label} alignItems="center">
			<Stack spacing={1} justifyContent="center">
				{isLoading ? (
					<CircularProgress size={30} />
				) : (
					availability.map((inventory, key) => <Availability key={key} availability={inventory} />)
				)}
			</Stack>
		</TableCellResponsiveContent>
	);
};
