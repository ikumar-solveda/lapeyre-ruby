/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from '@/components/blocks/SideBar';

export default {
	title: 'Blocks/Sidebar',
	component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const SidebarStory = Template.bind({});
SidebarStory.args = {
	title: 'Filter By',
	mobileBreakpoint: 'md',
	scrollable: true,
};

SidebarStory.storyName = 'Sidebar';
