/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getInitState } from '@/data/state/provider';
import { Cart } from '@/data/types/Order';

export const CART_BASE_STATE: Cart = getInitState('cart', {
	items: [],
});
