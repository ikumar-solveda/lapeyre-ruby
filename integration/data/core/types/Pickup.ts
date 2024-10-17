/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PICKUP_ON_BEHALF, SELF_PICKUP } from '@/data/constants/checkout';

export type SelfPickupType = {
	lastName: string;
	firstName: string;
	email: string;
	phone: string;
	type: typeof SELF_PICKUP;
};

export type NonSelfPickupType = {
	pickupPersonFullName: string;
	buyerPersonFullName: string;
	pickupPersonEmail: string;
	type: typeof PICKUP_ON_BEHALF;
};
