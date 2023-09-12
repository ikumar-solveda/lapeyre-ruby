/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMCartDataCatalog } from '@/components/blocks/GTMCartData/parts/Catalog';
import { useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { getGTMConfig } from '@/data/events/handlers/gtm';
import { Order } from '@/data/types/Order';
import { FC, useContext } from 'react';

export const GTMCartData: FC = () => {
	const { order } = useContext(ContentContext) as { order: Order };
	const { settings } = useSettings();
	const { ga4, ua } = getGTMConfig(settings);

	return ga4 || ua ? (
		<>
			{order?.orderItem?.map((item) => (
				<GTMCartDataCatalog key={item.orderItemId} orderItem={item} />
			))}
		</>
	) : null;
};
