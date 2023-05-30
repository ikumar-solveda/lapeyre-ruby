/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	id: '12506',
	name: 'CheckoutPageLayout',
	containerName: 'check-out-page',
	isStoreDefault: true,
	slots: [
		{
			id: '2',
			widgets: [
				{
					id: '3022',
					name: 'CheckoutPageContentRecommendation',
					widgetName: 'e-marketing-spot-widget',
					sequence: 0.0,
					properties: {
						emsName: 'Home_Promotion',
					},
				},
			],
		},
	],
};
export default Layout;
