/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Sidebar } from '@/components/blocks/SideBar';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/Sidebar',
	component: Sidebar,
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const SidebarStory = Template.bind({});
SidebarStory.args = {
	title: 'Filter By',
	mobileBreakpoint: 'md',
	scrollable: true,
};

SidebarStory.storyName = 'Sidebar';
