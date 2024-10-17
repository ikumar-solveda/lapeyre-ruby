/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useStoreList } from '@/data/Content/StoreList';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';

export type StoreInventoryDialogStateContextValue = {
	dialogState: boolean;
	onDialog: () => void;
};

export type SelectStoreContextValue = StoreInventoryDialogStateContextValue & {
	setAsMyStore: ReturnType<typeof useStoreList>['setAsMyStore'];
	physicalStore: StoreDetails;
	product?: ProductType;
};

export type StoreInventoryDialogContextValue = SelectStoreContextValue & {
	candidate: StoreDetails;
	pickupItemsExist?: boolean;
};
