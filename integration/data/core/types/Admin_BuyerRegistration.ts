/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export type AdminBuyerRegistrationValueType = {
	logonId: string;
	logonPassword?: string;
	logonPasswordVerify?: string;
	firstName: string;
	lastName: string;
	email1: string;
	phone1: string;
	address1: string;
	address2?: string;
	city: string;
	country: string;
	state: string;
	zipCode: string;
	preferredLanguage: string;
	preferredCurrency: string;
	parentMemberId: string;
	challengeAnswer: string;
	challengeQuestion: string;
	organizationId?: string;
	selectedIncludeMemberGroup?: string;
	selectedExcludeMemberGroup?: string;
	assignedIncludeMemberGroup?: string;
	assignedExcludeMemberGroup?: string;
};
