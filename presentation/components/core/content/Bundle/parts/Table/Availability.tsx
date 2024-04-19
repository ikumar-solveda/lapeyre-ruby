/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { BundleTableRowData } from '@/data/types/Product';
import { Button, CircularProgress, Stack } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { BundleTableAvailabilityStatus } from '@/components/content/Bundle/parts/Table/AvailabilityStatus';
import { bundleTableSelectSX } from '@/components/content/Bundle/styles/Table/select';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { ContentContext } from '@/data/context/content';
import {
	CommerceEnvironmentType as _CommerceEnvironmentType,
	InventoryStatusType as _InventoryStatusType,
	OfflineInventoryType as _OfflineInventoryType,
	OfflineInventoryTypeKeyType as _OfflineInventoryTypeKeyType,
	OnlineInventoryType as _OnlineInventoryType,
	OnlineInventoryTypeKeyType as _OnlineInventoryTypeKeyType,
} from '@/data/types/Inventory';
import { findBundleSkuAvailability } from '@/utils/findBundleSkuAvailability';

export type CommerceEnvironmentType = _CommerceEnvironmentType;
export type InventoryStatusType = _InventoryStatusType;
export type OfflineInventoryType = _OfflineInventoryType;
export type OfflineInventoryTypeKeyType = _OfflineInventoryTypeKeyType;
export type OnlineInventoryType = _OnlineInventoryType;
export type OnlineInventoryTypeKeyType = _OnlineInventoryTypeKeyType;
export type ProductDetailType = ReturnType<typeof useLocalization<'productDetail'>>;
export type SelectAnAttributesType = ProductDetailType['SelectAttributes'];

export const BundleTableAvailability: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { physicalStore, isLoading = false } = useContext(ContentContext) as ReturnType<
		typeof useBundleDetailsTable
	>;
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');
	const { SelectAttributes, Availability } = useLocalization('productDetail');

	const { offlineStatus, onlineStatus, offline, online, partNumber } = findBundleSkuAvailability(
		row.original,
		physicalStore
	);

	return (
		<TableCellResponsiveContent label={Availability.t()}>
			<Stack spacing={1} justifyContent="center">
				{isLoading ? (
					<CircularProgress size={30} />
				) : (
					<>
						<BundleTableAvailabilityStatus
							{...{ ...onlineStatus, inventory: online, localization: inventoryStatusOnline }}
						/>
						<BundleTableAvailabilityStatus
							{...{
								...offlineStatus,
								inventory: offline,
								localization: inventoryStatusStore,
								store: physicalStore?.storeName,
							}}
						/>
						{onlineStatus.status === undefined ? (
							<Button
								data-testid={`select-attributes-${partNumber}-link`}
								id={`select-attributes-${partNumber}-link`}
								onClick={() => row.toggleExpanded()}
								sx={bundleTableSelectSX}
							>
								{SelectAttributes.t()}
							</Button>
						) : null}
					</>
				)}
			</Stack>
		</TableCellResponsiveContent>
	);
};
