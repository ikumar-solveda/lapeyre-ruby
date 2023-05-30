/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { StoreLocator } from '@/components/content/StoreLocator';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	title: 'Content/Store Locator',
	component: StoreLocator,
} as ComponentMeta<typeof StoreLocator>;

const Template: ComponentStory<typeof StoreLocator> = (args) => <StoreLocator {...args} />;

export const StoreLocatorStory = Template.bind({});

StoreLocatorStory.args = {};

StoreLocatorStory.storyName = 'Store Locator';
