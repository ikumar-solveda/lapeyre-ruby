/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	id: '12503',
	name: 'ProductListingPageLayout',
	containerName: 'product-listing-page',
	isStoreDefault: true,
	slots: [
		{
			id: '1',
			widgets: [
				{
					id: '3012',
					name: 'BreadcrumbTrail',
					widgetName: 'breadcrumb-trail-widget',
					sequence: 0.0,
				},
			],
		},
		{
			id: '2',
			widgets: [
				{
					id: '3013',
					name: 'FacetNavigation',
					widgetName: 'facet-navigation-widget',
					sequence: 0.0,
				},
			],
		},
		{
			id: '3',
			widgets: [
				{
					id: 'search',
					name: 'CatalogEntryList',
					widgetName: 'catalog-entry-list-widget',
					sequence: 0.0,
				},
			],
		},
	],
};

export default Layout;
