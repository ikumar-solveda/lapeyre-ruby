/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	id: '12505',
	name: 'CartPageLayout',
	containerName: 'cart-page',
	isStoreDefault: true,
	slots: [
		{
			id: '2',
			widgets: [
				{
					id: '3020',
					name: 'CartPageProductRecommendation',
					widgetName: 'e-marketing-spot-widget',
					sequence: 0.0,
					properties: { emsName: 'ShoppingCartRight_CatEntries' },
				},
			],
		},
	],
};

export default Layout;
