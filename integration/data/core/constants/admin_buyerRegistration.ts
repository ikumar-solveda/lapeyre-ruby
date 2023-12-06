/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';

export const initialAdminBuyerRegistrationValue: AdminBuyerRegistrationValueType = {
	challengeQuestion: '-',
	firstName: EMPTY_STRING,
	challengeAnswer: '-',
	state: EMPTY_STRING,
	zipCode: EMPTY_STRING,
	lastName: EMPTY_STRING,
	phone1: EMPTY_STRING,
	country: EMPTY_STRING,
	city: EMPTY_STRING,
	logonId: EMPTY_STRING,
	address2: EMPTY_STRING,
	address1: EMPTY_STRING,
	parentMemberId: EMPTY_STRING,
	email1: EMPTY_STRING,
	preferredLanguage: EMPTY_STRING,
	preferredCurrency: EMPTY_STRING,
};
