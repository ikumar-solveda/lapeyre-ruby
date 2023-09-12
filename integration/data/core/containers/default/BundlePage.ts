/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	name: 'BundlePageLayout',
	containerName: 'bundle-page',
	isStoreDefault: true,
	slots: [
		{
			id: '1',
			widgets: [
				{
					widgetName: 'breadcrumb-trail-widget',
					sequence: 0,
					name: 'BreadcrumbTrail',
				},
			],
		},
		{
			id: '2',
			widgets: [
				{
					widgetName: 'bundle-widget',
					sequence: 0,
					name: 'BundleWidget',
				},
			],
		},
		{
			id: '3',
			widgets: [
				{
					widgetName: 'merchandising-association-widget',
					sequence: 0,
					name: 'MerchandisingAssociation',
				},
			],
		},
	],
};

export default Layout;
