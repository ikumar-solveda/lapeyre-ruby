/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { BuyerSelfRegistrationValueType } from '@/data/types/BuyerSelfRegistration';

export const initialBuyerSelfRegistrationValue: BuyerSelfRegistrationValueType = {
	logonId: EMPTY_STRING,
	logonPassword: EMPTY_STRING,
	logonPasswordVerify: EMPTY_STRING,
	firstName: EMPTY_STRING,
	lastName: EMPTY_STRING,
	email1: EMPTY_STRING,
	phone1: EMPTY_STRING,
	address1: EMPTY_STRING,
	address2: EMPTY_STRING,
	city: EMPTY_STRING,
	country: EMPTY_STRING,
	state: EMPTY_STRING,
	zipCode: EMPTY_STRING,
	preferredLanguage: EMPTY_STRING,
	preferredCurrency: EMPTY_STRING,
	orgName: EMPTY_STRING,
};
