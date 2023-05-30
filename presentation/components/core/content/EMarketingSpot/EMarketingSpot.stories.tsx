/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EMarketingSpot } from '@/components/content/EMarketingSpot';

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
EMarketingSpotHomeHeroStory.args = { id: 'Home Hero' };

export const EMarketingSpotFreeDeliveryStory = Template.bind({});
EMarketingSpotFreeDeliveryStory.storyName = 'Content - Free Delivery';
EMarketingSpotFreeDeliveryStory.args = { id: 'Free Delivery' };

export const EMarketingSpotHomePromotionRecStory = Template.bind({});
EMarketingSpotHomePromotionRecStory.storyName = 'Content - Home Promotion';
EMarketingSpotHomePromotionRecStory.args = { id: 'Home_Promotion' };

export const EMarketingSpotCategoryRecStory = Template.bind({});
EMarketingSpotCategoryRecStory.storyName = 'Category Recommendations';
EMarketingSpotCategoryRecStory.args = { id: 'Home_CategoryRec' };

export const EMarketingSpotProductRecStory = Template.bind({});
EMarketingSpotProductRecStory.storyName = 'Product Recommendations';
EMarketingSpotProductRecStory.args = { id: 'Home_ProductRec' };

export const EMarketingSpotHomeGenericESpotStory = Template.bind({});
EMarketingSpotHomeGenericESpotStory.storyName = 'Mixed Recommendations';
EMarketingSpotHomeGenericESpotStory.args = { id: 'HomeGenericESpot' };

export const EMarketingSpotHomeContentCarouselStory = Template.bind({});
EMarketingSpotHomeContentCarouselStory.storyName = 'Content Carousel';
EMarketingSpotHomeContentCarouselStory.args = { id: 'Home_ContentCarousel' };
