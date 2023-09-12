/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findSkuAvailability } from '@/components/content/SkuList/parts/Table';
import HTMLReactParser from 'html-react-parser';
import { Circle } from '@mui/icons-material';
import { ContentContext } from '@/data/context/content';
import {
	OfflineInventoryTypeKeyType,
	OnlineInventoryTypeKeyType,
} from '@/components/content/Bundle/parts/Table/Availability';
import { SkuListTableData } from '@/data/types/Product';
import { skuListTableStockSX } from '@/components/content/SkuList/styles/tableStock';

type TranslationKey = OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;

export const SkuListTableAvailability: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');
	const { Availability } = useLocalization('productDetail');
	const { store } = useContext(ContentContext) as {
		store: string;
	};
	const { onlineStatus, offlineStatus } = findSkuAvailability(row.original, store);

	return (
		<TableCellResponsiveContent label={Availability.t()} alignItems="center">
			<Stack spacing={1} justifyContent="center">
				{onlineStatus.status !== undefined ? (
					<Stack direction="row" spacing={1} justifyContent="flex-start">
						<Circle fontSize="small" sx={skuListTableStockSX(onlineStatus.status)} />
						<Typography>
							{HTMLReactParser(
								inventoryStatusOnline[onlineStatus.translationKey as TranslationKey].t()
							)}
						</Typography>
					</Stack>
				) : null}
				{store && offlineStatus?.status !== undefined ? (
					<Stack direction="row" spacing={1} justifyContent="flex-start">
						<Circle fontSize="small" sx={skuListTableStockSX(offlineStatus.status)} />
						<Typography>
							{HTMLReactParser(
								inventoryStatusStore[offlineStatus.translationKey as TranslationKey].t({
									store,
								} as any)
							)}
						</Typography>
					</Stack>
				) : null}
			</Stack>
		</TableCellResponsiveContent>
	);
};
