/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useCart } from '@/data/Content/Cart';
import { usePhysicalStoreDetails } from '@/data/Content/PhysicalStoreDetails';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { FC, useEffect } from 'react';

/**
 * Trigger update selected store based on cart
 */
export const SelectedStoreSynchronizer: FC = () => {
	const {
		storeLocator: { selectedStore },
		actions: { selectStore },
	} = useStoreLocatorState();
	const { id: selectedStoreId } = selectedStore;

	const { physicalStoreIdInCart, isFetchingCart } = useCart();

	const { storeInCart } = usePhysicalStoreDetails({
		id: physicalStoreIdInCart,
	});

	useEffect(() => {
		if (!isFetchingCart && storeInCart && storeInCart.id !== selectedStoreId) {
			selectStore(storeInCart);
		}
	}, [selectStore, storeInCart, selectedStoreId, isFetchingCart]);
	return null;
};
