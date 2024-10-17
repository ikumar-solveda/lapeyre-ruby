/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	BOPIS_CHECK_OUT_STEP,
	CHECK_OUT_STEP,
	NonSelfPickupType,
	SelfPickupType,
} from '@/data/types/CheckOut';

export const STEPS: Record<
	CHECK_OUT_STEP | BOPIS_CHECK_OUT_STEP,
	CHECK_OUT_STEP | BOPIS_CHECK_OUT_STEP
> = {
	shipping: 'shipping',
	payment: 'payment',
	review: 'review',
	pickup: 'pickup',
	'pickup-store': 'pickup-store',
};

export const DELIVERY_STEPS: CHECK_OUT_STEP[] = [
	STEPS.shipping,
	STEPS.payment,
	STEPS.review,
] as CHECK_OUT_STEP[];

export const BOPIS_STEPS: BOPIS_CHECK_OUT_STEP[] = [
	STEPS['pickup-store'],
	STEPS.pickup,
	STEPS.payment,
	STEPS.review,
] as BOPIS_CHECK_OUT_STEP[];

export const SELF_PICKUP = '1';
export const PICKUP_ON_BEHALF = '2';

export const nonSelfPickupFormInitValues: NonSelfPickupType = {
	pickupPersonFullName: '',
	buyerPersonFullName: '',
	pickupPersonEmail: '',
	type: PICKUP_ON_BEHALF,
};

export const selfPickupFormInitValues: SelfPickupType = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	type: SELF_PICKUP,
};

export const DELIVERY = 'delivery';
export const BOPIS = 'bopis';

export const CHECK_OUT_STEPS: (CHECK_OUT_STEP | BOPIS_CHECK_OUT_STEP)[] = [
	STEPS.shipping,
	STEPS.pickup,
	STEPS.payment,
	STEPS.review,
];
