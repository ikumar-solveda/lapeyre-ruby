/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SELF_PICKUP } from '@/data/constants/checkout';
import { NonSelfPickupType, SelfPickupType } from '@/data/types/Pickup';

export const isSelfPickup = (
	instruction: NonSelfPickupType | SelfPickupType
): instruction is SelfPickupType => instruction?.type === SELF_PICKUP;
