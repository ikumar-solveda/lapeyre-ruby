/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useLocalization } from '@/data/Localization';
import { Settings } from '@/data/Settings';
import { StoreDetails } from '@/data/types/Store';

export type InventorySWRKeyProps = {
	settings: Settings;
	partNumber?: string;
	productIds?: string;
	langId?: string;
	physicalStore?: StoreDetails;
};

export type CommerceEnvironmentType = ReturnType<typeof useLocalization<'CommerceEnvironment'>>;
export type OnlineInventoryType = CommerceEnvironmentType['inventoryStatusOnline'];
export type OfflineInventoryType = CommerceEnvironmentType['inventoryStatusStore'];
export type OnlineInventoryTypeKeyType = keyof OnlineInventoryType;
export type OfflineInventoryTypeKeyType = keyof OfflineInventoryType;
export type InventoryStatusType = {
	status?: boolean;
	translationKey?: OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;
};
