/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { BundleTableRowData } from '@/data/types/Product';
import { CircularProgress, Stack } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { BundleTableAvailabilityStatusV2 } from '@/components/content/Bundle/parts/Table/AvailabilityStatusV2';
import { ContentContext } from '@/data/context/content';
import { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import {
	CommerceEnvironmentType as _CommerceEnvironmentType,
	InventoryStatusType as _InventoryStatusType,
	OfflineInventoryType as _OfflineInventoryType,
	OfflineInventoryTypeKeyType as _OfflineInventoryTypeKeyType,
	OnlineInventoryType as _OnlineInventoryType,
	OnlineInventoryTypeKeyType as _OnlineInventoryTypeKeyType,
} from '@/data/types/Inventory';

export type CommerceEnvironmentType = _CommerceEnvironmentType;
export type InventoryStatusType = _InventoryStatusType;
export type OfflineInventoryType = _OfflineInventoryType;
export type OfflineInventoryTypeKeyType = _OfflineInventoryTypeKeyType;
export type OnlineInventoryType = _OnlineInventoryType;
export type OnlineInventoryTypeKeyType = _OnlineInventoryTypeKeyType;
export type ProductDetailType = ReturnType<typeof useLocalization<'productDetail'>>;
export type SelectAnAttributesType = ProductDetailType['SelectAttributes'];

export const BundleTableAvailability: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { isLoading } = useContext(ContentContext) as BundleDetailsTableAuxiliaryContextValue;
	const { Availability } = useLocalization('productDetail');

	return (
		<TableCellResponsiveContent label={Availability.t()}>
			<Stack spacing={1} justifyContent="center">
				{isLoading ? <CircularProgress size={30} /> : <BundleTableAvailabilityStatusV2 row={row} />}
			</Stack>
		</TableCellResponsiveContent>
	);
};
