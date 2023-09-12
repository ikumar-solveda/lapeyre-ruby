/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { BundleTableRowData } from '@/data/types/Product';
import { Button, Stack } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { BundleTableAvailabilityStatus } from '@/components/content/Bundle/parts/Table/AvailabilityStatus';
import { bundleTableSelectSX } from '@/components/content/Bundle/styles/Table/select';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { ContentContext } from '@/data/context/content';
import { findAvailability } from '@/utils/findAvailability';

export type CommerceEnvironmentType = ReturnType<typeof useLocalization<'CommerceEnvironment'>>;
export type OnlineInventoryType = CommerceEnvironmentType['inventoryStatusOnline'];
export type OfflineInventoryType = CommerceEnvironmentType['inventoryStatusStore'];
export type OnlineInventoryTypeKeyType = keyof OnlineInventoryType;
export type OfflineInventoryTypeKeyType = keyof OfflineInventoryType;
export type InventoryStatusType = {
	status?: boolean;
	translationKey?: OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;
};

export type ProductDetailType = ReturnType<typeof useLocalization<'productDetail'>>;
export type SelectAnAttributesType = ProductDetailType['SelectAttributes'];

export const BundleTableAvailability: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { physicalStoreName: store } = useContext(ContentContext) as ReturnType<
		typeof useBundleDetailsTable
	>;
	const { inventoryStatusOnline, inventoryStatusStore } = useLocalization('CommerceEnvironment');
	const { SelectAttributes, Availability } = useLocalization('productDetail');

	const { offlineStatus, onlineStatus, offline, online, partNumber } = findAvailability(
		row.original,
		store
	);

	return (
		<TableCellResponsiveContent label={Availability.t()}>
			<Stack spacing={1} justifyContent="center">
				<BundleTableAvailabilityStatus
					{...{ ...onlineStatus, inventory: online, localization: inventoryStatusOnline }}
				/>
				<BundleTableAvailabilityStatus
					{...{ ...offlineStatus, inventory: offline, localization: inventoryStatusStore, store }}
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
			</Stack>
		</TableCellResponsiveContent>
	);
};
