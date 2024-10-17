/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { StoreLocatorCommon } from '@/components/content/StoreLocator/StoreLocatorCommon';
import { ID } from '@/data/types/Basic';
import { Order } from '@/data/types/Order';
import { FC } from 'react';

export const StoreLocator: FC<{ id: ID }> = () => <StoreLocatorCommon />;

export const OrderStoreLocator: FC<{ order?: Order }> = ({ order }) => (
	<StoreLocatorCommon order={order} embedded={true} />
);
