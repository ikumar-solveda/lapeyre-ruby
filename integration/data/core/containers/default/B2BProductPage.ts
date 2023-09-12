/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

const Layout: DefaultContainerLayout = {
	name: 'B2BProductPageLayout',
	containerName: 'b2b-product-page',
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
					widgetName: 'product-information-widget',
					sequence: 0,
					name: 'ProductInformation',
				},
			],
		},
		{
			id: '3',
			widgets: [
				{
					widgetName: 'attribute-filter-widget',
					sequence: 0,
					name: 'AttributeFilter',
				},
			],
		},
		{
			id: '4',
			widgets: [
				{
					widgetName: 'sku-list-widget',
					sequence: 0,
					name: 'SKUList',
				},
			],
		},
		{
			id: '5',
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
