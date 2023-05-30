/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type ShippingMode = {
	field1: string;
	field2: string;
	shipModeCode: string;
	shipModeDescription: string;
	shipModeId: string;
};

export type ShippingModesResponse = {
	usableShippingMode: ShippingMode[];
};
