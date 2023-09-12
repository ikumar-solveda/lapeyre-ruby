/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useGTMCartData } from '@/data/Content/_GTMCartData';
import { OrderItem } from '@/data/types/Order';
import { FC, useEffect } from 'react';

export const GTMCartDataCatalog: FC<{ orderItem: OrderItem }> = ({ orderItem }) => {
	const { addGTMEventData } = useGTMCartData({ orderItem });
	useEffect(() => {
		addGTMEventData();
	}, [addGTMEventData]);
	return null;
};
