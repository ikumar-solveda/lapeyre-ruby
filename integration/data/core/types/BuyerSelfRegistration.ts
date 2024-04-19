/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export type BuyerSelfRegistrationValueType = {
	logonId: string;
	logonPassword: string;
	logonPasswordVerify: string;
	firstName: string;
	lastName: string;
	email1: string;
	phone1: string;
	address1: string;
	address2: string;
	city: string;
	country: string;
	state: string;
	zipCode: string;
	preferredLanguage: string;
	preferredCurrency: string;
	orgName: string;
	marketingTrackingConsent?: boolean;
};
