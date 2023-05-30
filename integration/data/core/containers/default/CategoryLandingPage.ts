/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	name: 'CategoryLandingPageLayout',
	containerName: 'category-landing-page',
	isStoreDefault: true,
	slots: [
		{
			id: '1',
			widgets: [
				{
					widgetName: 'content-recommendation-widget',
					name: 'PageBannerWidget',
					sequence: 0,
					properties: {
						emsName: 'Hero',
						emsType: 'local',
					},
				},
			],
		},
		{
			id: '2',
			widgets: [
				{
					widgetName: 'child-category-grid-widget',
					name: 'CategoryGrid',
					sequence: 0,
				},
			],
		},
	],
};

export default Layout;
