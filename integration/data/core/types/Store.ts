/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type LatLng = {
	lat: number;
	lng: number;
};

export type StoreAttribute = {
	name: string;
	value: string;
	displayName: string;
	displayValue: string;
};

export type StoreDetails = {
	id: string;
	storeName: string;
	physicalStoreName: string;
	storeFullAddress: string;
	phone: string;
	coordinates: LatLng;
	attributes: StoreAttribute[];
};

export type StoreLocator = {
	storeList: StoreDetails[];
	center: LatLng;
	noSearch: boolean;
};

export type SelectedStoreLocator = {
	selectedStore: StoreDetails;
};
