/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	name: 'OrderConfirmationPageLayout',
	containerName: 'order-confirmation-page',
	isStoreDefault: true,
	slots: [
		{
			id: '2',
			widgets: [
				{
					widgetName: 'e-marketing-spot-widget',
					name: 'OrderConfirmationPageProductRecommendation',
					sequence: 0.0,
					properties: { emsName: 'Home_ProductRec' },
				},
			],
		},
	],
};

export default Layout;
