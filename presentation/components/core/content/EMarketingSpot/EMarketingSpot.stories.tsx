/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EMarketingSpot } from '@/components/content/EMarketingSpot';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	title: 'Content/E-Marketing Spots',
	component: EMarketingSpot,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
} as ComponentMeta<typeof EMarketingSpot>;

const Template: ComponentStory<typeof EMarketingSpot> = ({ id, ...args }) => (
	<EMarketingSpot id={id} {...args} />
);

export const EMarketingSpotHomeHeroStory = Template.bind({});
EMarketingSpotHomeHeroStory.storyName = 'Content - Home Hero';
EMarketingSpotHomeHeroStory.args = { properties: { emsName: 'Home Hero' } };

export const EMarketingSpotFreeDeliveryStory = Template.bind({});
EMarketingSpotFreeDeliveryStory.storyName = 'Content - Free Delivery';
EMarketingSpotFreeDeliveryStory.args = { properties: { emsName: 'Free Delivery' } };

export const EMarketingSpotHomePromotionRecStory = Template.bind({});
EMarketingSpotHomePromotionRecStory.storyName = 'Content - Home Promotion';
EMarketingSpotHomePromotionRecStory.args = { properties: { emsName: 'Home_Promotion' } };

export const EMarketingSpotCategoryRecStory = Template.bind({});
EMarketingSpotCategoryRecStory.storyName = 'Category Recommendations';
EMarketingSpotCategoryRecStory.args = { properties: { emsName: 'Home_CategoryRec' } };

export const EMarketingSpotProductRecStory = Template.bind({});
EMarketingSpotProductRecStory.storyName = 'Product Recommendations';
EMarketingSpotProductRecStory.args = { properties: { emsName: 'Home_ProductRec' } };

export const EMarketingSpotHomeGenericESpotStory = Template.bind({});
EMarketingSpotHomeGenericESpotStory.storyName = 'Mixed Recommendations';
EMarketingSpotHomeGenericESpotStory.args = { properties: { emsName: 'HomeGenericESpot' } };

export const EMarketingSpotHomeContentCarouselStory = Template.bind({});
EMarketingSpotHomeContentCarouselStory.storyName = 'Content Carousel';
EMarketingSpotHomeContentCarouselStory.args = { properties: { emsName: 'Home_ContentCarousel' } };

export const EMarketingSpotAICategoryRecStory = Template.bind({});
EMarketingSpotAICategoryRecStory.storyName = 'AI Category Recommendations';
EMarketingSpotAICategoryRecStory.args = { properties: { emsName: 'Home_AI_ProductRec' } };
