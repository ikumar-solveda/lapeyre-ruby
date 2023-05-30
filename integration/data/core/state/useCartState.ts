/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CART_BASE_STATE } from '@/data/state/base/cart';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { Cart, CartItem } from '@/data/types/Order';
import { useCallback } from 'react';

const cartUpdater = getStateUpdater({
	key: 'cart',
	baseState: CART_BASE_STATE,
});

/**
 * React hook for use by the presentation layer to read cart state
 * data and expose event handlers (actions) related to data changes.
 * @example
 *
 * ```
 * const {
 * 		data: { items },
 * 		actions: { empty, add },
 * 	} = useCartState();
 * <Button onClick={empty} />
 * <Button onClick={add(item)} />
 * <Box>{items.length}</Box>
 * ```
 */
export const useCartState = () => {
	const setState = useSetState();
	const { cart } = useTrackedState() as { cart: Cart };
	const add = useCallback(
		(item: CartItem) => () =>
			cartUpdater({
				setState,
				now: (cart) => ({
					...cart,
					items: [...cart.items, item],
				}),
			}),
		[setState]
	);
	const empty = useCallback(
		() =>
			cartUpdater({
				setState,
				later: async (cart) => ({ ...cart, items: [] }),
			}),
		[setState]
	);
	return { data: cart || CART_BASE_STATE, actions: { add, empty } };
};
