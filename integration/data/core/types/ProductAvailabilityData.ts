/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type InventoryItemResponse = {
	physicalStoreName?: string;
	physicalStoreId?: string;

	onlineStoreName?: string;
	onlineStoreId?: string;

	availabilityDateTime?: string;
	availableQuantity?: string;
	unitOfMeasure?: string;
	inventoryStatus?: string;

	productId?: string;
	partNumber: string;
	x_sellerId?: string;
};

export type InventoryResponse = {
	InventoryAvailability?: InventoryItemResponse[];
};

export type ProductAvailabilityData = InventoryItemResponse & {
	status: boolean;
	storeName: string;
	storeId?: string;
	physicalStoreId?: string;
	physicalStoreStatus?: boolean;
};
