/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';
const Layout: DefaultContainerLayout = {
	name: 'HomePageLayout',
	containerName: 'home-page',
	isStoreDefault: true,
	slots: [
		{
			id: '1',
			widgets: [
				{
					widgetName: 'content-recommendation-widget',
					name: 'HomePageBannerWidget',
					sequence: 0,
					properties: {
						emsName: 'Home Hero',
					},
				},
			],
		},
		{
			id: '2',
			widgets: [
				{
					widgetName: 'content-recommendation-widget',
					name: 'HomePageFreeDelivery',
					sequence: 0,
					properties: {
						emsName: 'Free Delivery',
					},
				},
				{
					widgetName: 'catalog-entry-recommendation-widget',
					name: 'HomePageProductRecommendation',
					sequence: 1,
					properties: {
						emsName: 'Home_ProductRec',
					},
				},
				{
					widgetName: 'content-recommendation-widget',
					name: 'HomePagePromotion',
					sequence: 2,
					properties: {
						emsName: 'Home_Promotion',
					},
				},
				{
					widgetName: 'featured-product-recommendation-widget',
					name: 'HomePageFeaturedProductRecommendation',
					sequence: 3,
					properties: {
						emsName: 'Featured_ProductRec',
					},
				},
				{
					widgetName: 'category-recommendation-widget',
					name: 'HomePageCategoryRecommendation',
					sequence: 4,
					properties: {
						emsName: 'Home_CategoryRec',
					},
				},
			],
		},
	],
};
export default Layout;
