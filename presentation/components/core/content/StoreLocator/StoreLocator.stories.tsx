/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { StoreLocator } from '@/components/content/StoreLocator';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Content/Store Locator',
	component: StoreLocator,
} as Meta<typeof StoreLocator>;

const Template: StoryFn<typeof StoreLocator> = (args) => <StoreLocator {...args} />;

export const StoreLocatorStory = Template.bind({});

StoreLocatorStory.args = {};

StoreLocatorStory.storyName = 'Store Locator';
