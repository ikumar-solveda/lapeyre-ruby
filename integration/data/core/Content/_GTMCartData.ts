/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useCategory } from '@/data/Content/Category';
import { useProduct } from '@/data/Content/Product';
import { EventsContext } from '@/data/context/events';
import { OrderItem } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';
import { getParentCategoryFromSlashPath } from '@/data/utils/getParentCategoryFromSlashPath';
import { useCallback, useContext } from 'react';

type Props = {
	orderItem: OrderItem;
};

const EMPTY_PROD = {} as ProductType;
export const useGTMCartData = ({ orderItem }: Props) => {
	const { partNumber = '', contractId = '', orderItemId = '' } = orderItem;
	const { addEventData } = useContext(EventsContext);
	const { product = EMPTY_PROD } = useProduct({ id: partNumber, contractId });
	const { parentCatalogGroupID: parentCatPath } = product;
	const { category } = useCategory(getParentCategoryFromSlashPath(parentCatPath), contractId);

	const addGTMEventData = useCallback(async () => {
		// save category and product info about order-item for any GTM cart event-processors -- do this
		//   once otherwise the context-refresh will cause excessive re-rendering
		if (orderItemId && product && category) {
			addEventData('onCartView', { [orderItemId]: { product, category } });
		}
	}, [orderItemId, addEventData, product, category]);

	return { addGTMEventData };
};
