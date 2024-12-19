/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useLocalization } from '@/data/Localization';
import { Settings } from '@/data/Settings';
import { StoreDetails } from '@/data/types/Store';
import type {
	InventoryavailabilityInventoryavailabilityByorderidType,
	InventoryavailabilityInventoryavailabilityItem,
} from 'integration/generated/transactions/data-contracts';

export type InventorySWRKeyProps = {
	settings: Settings;
	partNumber?: string;
	productIds?: string;
	langId?: string;
	physicalStore?: StoreDetails;
	availableToPromise?: boolean;
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
export type TransactionPerItemAvailability = InventoryavailabilityInventoryavailabilityItem & {
	partNumber: string; // bad spec
};

export type StoreInventoryByOrder = Pick<
	InventoryavailabilityInventoryavailabilityByorderidType,
	'physicalStoreId' | 'overallInventoryStatus'
> & {
	backorder?: number;
	counts?: {
		available: number;
		total: number;
	};
};

export type StoreInventoryByOrderItem = {
	status: string;
	quantity: number;
	originalStatus?: string;
};
