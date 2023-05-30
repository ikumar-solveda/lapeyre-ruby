/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	CHECK_OUT_STEP,
	BOPIS_CHECK_OUT_STEP,
	NonSelfPickupType,
	SelfPickupType,
} from '@/data/types/CheckOut';

export const DELIVERY_STEPS: CHECK_OUT_STEP[] = ['shipping', 'payment', 'review'];
export const BOPIS_STEPS: BOPIS_CHECK_OUT_STEP[] = ['pickup-store', 'pickup', 'payment', 'review'];

export const SELF_PICKUP = '1';
export const PICKUP_ON_BEHALF = '2';

export const nonSelfPickupFormInitValues: NonSelfPickupType = {
	pickupPersonFullName: '',
	buyerPersonFullName: '',
	pickupPersonEmail: '',
};

export const selfPickupFormInitValues: SelfPickupType = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
};

export const DELIVERY = 'delivery';
export const BOPIS = 'bopis';
